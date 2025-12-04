class HomecCalendar {
  constructor() {
    this.data = null;
    this.activeEvent = null; // Track which event we are editing
    this.init();
  }

  async init() {
    if (window.calendarData) {
      this.data = window.calendarData;
      this.renderApp();
      this.attachEventListeners();
    } else {
      console.error("Data not found. Make sure data.js is loaded.");
    }
  }

  renderApp() {
    this.renderWeeklyView();

    const activeContainer = document.getElementById('active-months-grid');
    activeContainer.innerHTML = '';
    
    // Render first 2 months
    const activeMonths = this.data.months.slice(0, 2);
    activeMonths.forEach(month => {
      activeContainer.appendChild(this.createMonthCard(month));
    });

    const horizonContainer = document.getElementById('horizon-list');
    horizonContainer.innerHTML = '';
    
    // Render next 4 months
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
    container.innerHTML = '';
    
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const weekParam = `${startOfWeek.getFullYear()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getDate()}`;
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const labelEl = document.getElementById('current-week-label');
    if(labelEl) labelEl.textContent = `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      
      const dateKey = currentDay.toISOString().split('T')[0];
      const dayName = currentDay.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = currentDay.getDate();
      const isToday = dateKey === today.toISOString().split('T')[0];

      const col = document.createElement('div');
      col.className = `day-column ${isToday ? 'is-today' : ''}`;
      col.innerHTML = `
        <div class="day-column-header">
          <div class="day-name">${dayName}</div>
          <div class="day-date-large">${dayNum}</div>
        </div>
        <div class="day-column-body">
          <div class="time-block" id="block-morning-${dateKey}"><div class="block-label">Morning</div></div>
          <div class="time-block" id="block-afternoon-${dateKey}"><div class="block-label">Afternoon</div></div>
          <div class="time-block" id="block-evening-${dateKey}"><div class="block-label">Evening</div></div>
          <div class="meal-block"><div class="block-label">🍽 Dinner</div><div class="meal-item" id="meal-${dateKey}">-</div></div>
        </div>
      `;
      
      // Allow clicking the day column header to add an event
      col.querySelector('.day-column-header').addEventListener('click', () => this.openModal(null, dateKey));
      
      container.appendChild(col);

      this.data.months.forEach(month => {
        const events = month.events.filter(e => e.date === dateKey);
        events.forEach(evt => this.renderAgendaItem(evt, dateKey));
      });

      if (this.data.routines) {
        this.data.routines.daily?.forEach(r => this.renderRoutineItem(r, dateKey));
        this.data.routines.weekly?.[i]?.forEach(r => this.renderRoutineItem(r, dateKey));
      }

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
      el.textContent = evt.title;
      const catColor = this.data.categories[evt.category]?.color || '#ccc';
      el.style.borderLeftColor = catColor;
      
      // Make weekly items clickable
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
            e.stopPropagation(); // Prevent opening "New Event" on cell click
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
      // We iterate all months to find the one containing this exact object reference
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
      // eventObj.date format is YYYY-MM-DD
      const monthId = eventObj.date.substring(0, 7); // "2025-12"
      
      const targetMonth = this.data.months.find(m => m.id === monthId);
      if (targetMonth) {
          targetMonth.events.push(eventObj);
          // Optional: Sort by date/time
          targetMonth.events.sort((a, b) => a.date.localeCompare(b.date));
      } else {
          alert("Note: This date is outside the current 6-month horizon. It will be saved but may not be visible.");
          // In a real app we might create the month or have a "backlog"
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
    document.getElementById('btn-save').addEventListener('click', () => this.saveToFile());
    
    // New Event Button
    document.getElementById('btn-new-event').addEventListener('click', () => this.openModal());

    // Modal Actions
    document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
    document.getElementById('event-form').addEventListener('submit', (e) => this.saveEvent(e));
    document.getElementById('btn-delete-event').addEventListener('click', () => this.deleteEvent());

    // Close on background click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('event-modal');
        if (e.target === modal) this.closeModal();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new HomecCalendar();
});
