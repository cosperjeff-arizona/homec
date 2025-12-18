class HomecCalendar {
  constructor() {
    this.data = null;
    this.activeEvent = null; // Track which event we are editing
    this.currentWeekStart = null; // Track current week for detailed view
    this.init();
  }

  async init() {
    // Load data from global variable set in data.js
    if (window.calendarData) {
      this.data = window.calendarData;
      this.renderApp();
      this.attachEventListeners();
    } else {
      console.error("Data not found. Make sure data.js is loaded.");
    }
  }

  renderApp() {
    // 0. Render Weekly Agenda (Tactical)
    this.renderWeeklyView();

    // 1. Render Active Grids (Months 0 and 1)
    const activeContainer = document.getElementById('active-months-grid');
    activeContainer.innerHTML = '';
    
    // Safety check: ensure we have at least 2 months
    const activeMonths = this.data.months.slice(0, 2);
    activeMonths.forEach(month => {
      activeContainer.appendChild(this.createMonthCard(month));
    });

    // 2. Render Horizon List (Months 2 through 5)
    const horizonContainer = document.getElementById('horizon-list');
    horizonContainer.innerHTML = '';
    
    const horizonMonths = this.data.months.slice(2, 6);
    horizonMonths.forEach(month => {
      if (month.events.length > 0) {
        horizonContainer.appendChild(this.createHorizonGroup(month));
      }
    });
  }

  // --- COMPONENT: Weekly View ---
  renderWeeklyView() {
    const container = document.getElementById('weekly-agenda');
    if (!container) return;
    container.innerHTML = '';
    
    // 1. Get Start of Week (Sunday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    this.currentWeekStart = startOfWeek; // Store for detailed view

    // Format week param for URL (e.g., "2025-12-7")
    const weekParam = `${startOfWeek.getFullYear()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getDate()}`;

    // Update Label
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const labelEl = document.getElementById('current-week-label');
    if(labelEl) {
        labelEl.textContent = `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    }

    // 2. Loop 7 Days
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      
      const dateKey = currentDay.toISOString().split('T')[0];
      const dayName = currentDay.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = currentDay.getDate();
      const isToday = dateKey === today.toISOString().split('T')[0];

      // Create Column
      const col = document.createElement('div');
      col.className = `day-column ${isToday ? 'is-today' : ''}`;
      col.innerHTML = `
        <div class="day-column-header">
          <div class="day-name">${dayName}</div>
          <div class="day-date-large">${dayNum}</div>
        </div>
        <div class="day-column-body">
          <div class="time-block" id="block-morning-${dateKey}">
            <div class="block-label">Morning</div>
          </div>
          <div class="time-block" id="block-afternoon-${dateKey}">
            <div class="block-label">Afternoon</div>
          </div>
          <div class="time-block" id="block-evening-${dateKey}">
            <div class="block-label">Evening</div>
          </div>
          <div class="meal-block">
             <div class="block-label">🍽 Dinner</div>
             <div class="meal-item" id="meal-${dateKey}">-</div>
          </div>
        </div>
      `;
      
      // Click header to add event
      col.querySelector('.day-column-header').addEventListener('click', () => this.openModal(null, dateKey));

      container.appendChild(col);

      // 3. Inject Events
      this.data.months.forEach(month => {
        const events = month.events.filter(e => e.date === dateKey);
        events.forEach(evt => {
          this.renderAgendaItem(evt, dateKey);
        });
      });

      // 4. Inject Routines
      if (this.data.routines) {
        this.data.routines.daily?.forEach(r => this.renderRoutineItem(r, dateKey));
        this.data.routines.weekly?.[i]?.forEach(r => this.renderRoutineItem(r, dateKey));
      }

      // 5. Inject Meals with Dynamic Links
      if (this.data.meals && this.data.meals[dateKey]) {
        const mealEl = col.querySelector(`#meal-${dateKey}`);
        const dayNameFull = currentDay.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const recipeUrl = `https://mealplanner-ruby.vercel.app/pages/recipe-${dayNameFull}.html?week=${weekParam}`;
        mealEl.innerHTML = `<a href="${recipeUrl}" class="meal-link" target="_blank">${this.data.meals[dateKey].dinner}</a>`;
      }
    }
  }

  renderAgendaItem(evt, dateKey) {
    let blockId = `block-morning-${dateKey}`;
    const t = (evt.time || "").toLowerCase();
    
    if (t.includes('pm') || t.includes('evening') || t.includes('night') || t.includes('17:') || t.includes('18:') || t.includes('19:')) {
      blockId = `block-evening-${dateKey}`;
    } else if (t.includes('12:') || t.includes('13:') || t.includes('14:') || t.includes('afternoon')) {
      blockId = `block-afternoon-${dateKey}`;
    }

    const block = document.getElementById(blockId);
    if (block) {
      const el = document.createElement('div');
      el.className = 'agenda-item';
      
      // Add category tag
      const cat = this.data.categories[evt.category];
      const tag = `<span class="tag ${evt.category}">${cat ? cat.label : evt.category}</span>`;
      el.innerHTML = `${tag} ${evt.title}`;
      
      const catColor = this.data.categories[evt.category]?.color || '#ccc';
      el.style.borderLeftColor = catColor;
      
      if (evt.priority === 'high') {
        el.classList.add('focus');
      }
      
      // Click to edit
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openModal(evt);
      });

      block.appendChild(el);
    }
  }

  renderRoutineItem(routine, dateKey) {
    const blockId = `block-${routine.time}-${dateKey}`;
    const block = document.getElementById(blockId);
    if (block) {
      const el = document.createElement('div');
      el.className = 'agenda-item routine';
      el.textContent = `○ ${routine.title}`;
      block.appendChild(el);
    }
  }

  // --- COMPONENT: Active Month Grid ---
  createMonthCard(month) {
    const card = document.createElement('div');
    card.className = 'month-card';
    card.innerHTML = `<div class="month-header"><h2>${month.name}</h2></div>`;
    
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';
    
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
      const h = document.createElement('div');
      h.className = 'day-header';
      h.textContent = d;
      grid.appendChild(h);
    });

    const [year, monthNum] = month.id.split('-').map(Number);
    const firstDay = new Date(year, monthNum - 1, 1).getDay();
    const daysInMonth = new Date(year, monthNum, 0).getDate();

    for(let i=0; i<firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day-cell empty';
      grid.appendChild(empty);
    }

    for(let d=1; d<=daysInMonth; d++) {
      const dateKey = `${year}-${String(monthNum).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dayEvents = month.events.filter(e => e.date === dateKey);
      
      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.innerHTML = `<div class="day-number">${d}</div>`;
      
      const todayStr = new Date().toISOString().split('T')[0];
      if (dateKey === todayStr) cell.classList.add('today');

      dayEvents.forEach(evt => {
        const dot = document.createElement('div');
        dot.className = `event-dot ${evt.category}`;
        if(evt.priority === 'high') dot.classList.add('priority');
        const catColor = this.data.categories[evt.category]?.color || '#ccc';
        dot.style.backgroundColor = catColor;
        dot.textContent = evt.title;
        
        // CLICK EVENT: Edit existing event
        dot.addEventListener('click', (e) => {
            e.stopPropagation(); 
            this.openModal(evt);
        });

        cell.appendChild(dot);
      });

      // CLICK EVENT: New event on this day
      cell.addEventListener('click', () => this.openModal(null, dateKey));
      
      grid.appendChild(cell);
    }

    card.appendChild(grid);
    return card;
  }

  // --- COMPONENT: Horizon List ---
  createHorizonGroup(month) {
    const group = document.createElement('div');
    group.className = 'horizon-month-group';
    
    group.innerHTML = `<h3 class="horizon-month-title">${month.name}</h3>`;
    
    const list = document.createElement('div');
    list.className = 'horizon-events';
    
    month.events.forEach(evt => {
      const item = document.createElement('div');
      item.className = 'horizon-item';
      const cat = this.data.categories[evt.category];
      
      item.innerHTML = `
        <span class="horizon-date">${new Date(evt.date).getDate()}</span>
        <span class="horizon-icon">${cat ? cat.icon : '•'}</span>
        <span class="horizon-title ${evt.priority === 'high' ? 'priority-text' : ''}">${evt.title}</span>
      `;
      // Allow click on horizon items too
      item.addEventListener('click', () => this.openModal(evt));
      list.appendChild(item);
    });

    group.appendChild(list);
    return group;
  }

  // --- NEW: Detailed Week View ---
  renderDetailedWeek() {
    const modal = document.getElementById('detail-week-modal');
    const content = document.getElementById('detail-week-content');
    
    if (!this.currentWeekStart) return;
    
    // Check if we have detailed data for this week
    const weekKey = this.currentWeekStart.toISOString().split('T')[0];
    const detailedWeek = this.data.detailedWeeks?.[weekKey];
    
    if (!detailedWeek) {
      content.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <p>No detailed hourly data available for this week.</p>
          <p style="margin-top: 12px; font-size: 0.9rem;">This feature shows hour-by-hour schedules when available.</p>
        </div>
      `;
      modal.classList.add('visible');
      return;
    }

    // Build the hourly table
    let html = `
      <div class="table-wrap">
        <table class="hourly-table">
          <thead>
            <tr>
              <th class="timecol">Time Block</th>
    `;
    
    // Add day headers
    detailedWeek.days.forEach(day => {
      const date = new Date(day.date);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      html += `<th class="daycol">${day.dayName} ${dateStr}</th>`;
    });
    
    html += `</tr></thead><tbody>`;
    
    // Add rows for each time block
    detailedWeek.timeBlocks.forEach(block => {
      html += `<tr><th class="timecol">${block}</th>`;
      
      detailedWeek.days.forEach(day => {
        const events = day.blocks[block] || [];
        html += `<td><div class="cell">`;
        
        events.forEach(evt => {
          const cat = this.data.categories[evt.category];
          const focusClass = evt.focus ? ' focus' : '';
          html += `
            <div class="event${focusClass}">
              <span class="event-time">${evt.time}</span>
              <span class="tag ${evt.category}">${cat ? cat.label : evt.category}</span>
              <span class="event-text">${evt.title}</span>
            </div>
          `;
        });
        
        html += `</div></td>`;
      });
      
      html += `</tr>`;
    });
    
    html += `</tbody></table></div>`;
    
    content.innerHTML = html;
    modal.classList.add('visible');
  }

  closeDetailedWeek() {
    document.getElementById('detail-week-modal').classList.remove('visible');
  }

  // --- LOGIC: Modal & Data Management ---
  openModal(event = null, dateStr = null) {
    this.activeEvent = event;
    const modal = document.getElementById('event-modal');
    const titleEl = document.getElementById('modal-title');
    const btnDelete = document.getElementById('btn-delete-event');
    
    // Form Elements
    const fTitle = document.getElementById('event-title');
    const fDate = document.getElementById('event-date');
    const fCat = document.getElementById('event-category');
    const fTime = document.getElementById('event-time');
    const fPrio = document.getElementById('event-priority');

    if (event) {
        // Edit Mode
        titleEl.textContent = "Edit Event";
        btnDelete.style.display = 'block';
        fTitle.value = event.title;
        fDate.value = event.date;
        fCat.value = event.category;
        fTime.value = event.time || '';
        fPrio.checked = event.priority === 'high';
    } else {
        // Create Mode
        titleEl.textContent = "New Event";
        btnDelete.style.display = 'none';
        fTitle.value = '';
        fDate.value = dateStr || new Date().toISOString().split('T')[0];
        fCat.value = 'family';
        fTime.value = '';
        fPrio.checked = false;
    }

    modal.classList.add('visible');
  }

  closeModal() {
    document.getElementById('event-modal').classList.remove('visible');
    this.activeEvent = null;
  }

  saveEvent(e) {
    e.preventDefault();
    const fTitle = document.getElementById('event-title').value;
    const fDate = document.getElementById('event-date').value;
    const fCat = document.getElementById('event-category').value;
    const fTime = document.getElementById('event-time').value;
    const fPrio = document.getElementById('event-priority').checked ? 'high' : 'normal';

    // 1. If editing, remove original event first
    if (this.activeEvent) {
        this.removeEventFromData(this.activeEvent);
    }

    // 2. Create New Object
    const newEvent = {
        date: fDate,
        title: fTitle,
        category: fCat,
        time: fTime,
        priority: fPrio
    };

    // 3. Add to correct month
    this.addEventToData(newEvent);

    // 4. Refresh & Close
    this.renderApp();
    this.closeModal();
  }

  deleteEvent() {
      if (this.activeEvent && confirm("Delete this event?")) {
          this.removeEventFromData(this.activeEvent);
          this.renderApp();
          this.closeModal();
      }
  }

  // Helper: Find month array and remove specific object instance
  removeEventFromData(eventObj) {
      for (let m of this.data.months) {
          const idx = m.events.indexOf(eventObj);
          if (idx !== -1) {
              m.events.splice(idx, 1);
              return;
          }
      }
  }

  // Helper: Find month based on date string and push
  addEventToData(eventObj) {
      const monthId = eventObj.date.substring(0, 7); // "2025-12"
      const targetMonth = this.data.months.find(m => m.id === monthId);
      
      if (targetMonth) {
          targetMonth.events.push(eventObj);
          // Optional: Sort by date
          targetMonth.events.sort((a, b) => a.date.localeCompare(b.date));
      } else {
          alert("Note: This date is outside the current 6-month horizon. It will be saved locally but may not appear until you adjust the horizon.");
      }
  }

  saveToFile() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homec-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }

  attachEventListeners() {
    // Save Button
    document.getElementById('btn-save').addEventListener('click', () => this.saveToFile());
    
    // New Event Button
    const newBtn = document.getElementById('btn-new-event');
    if(newBtn) newBtn.addEventListener('click', () => this.openModal());

    // Detailed Week Button
    const detailBtn = document.getElementById('btn-detail-week');
    if(detailBtn) detailBtn.addEventListener('click', () => this.renderDetailedWeek());

    // Close Detailed Week
    const closeDetailBtn = document.getElementById('btn-close-detail');
    if(closeDetailBtn) closeDetailBtn.addEventListener('click', () => this.closeDetailedWeek());

    // Modal Actions
    document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
    document.getElementById('event-form').addEventListener('submit', (e) => this.saveEvent(e));
    document.getElementById('btn-delete-event').addEventListener('click', () => this.deleteEvent());

    // Close modals on background click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('event-modal');
        const detailModal = document.getElementById('detail-week-modal');
        
        if (e.target === modal) this.closeModal();
        if (e.target === detailModal) this.closeDetailedWeek();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new HomecCalendar();
});
