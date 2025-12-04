class HomecCalendar {
  constructor() {
    this.data = null;
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
    container.innerHTML = '';
    
    // 1. Get Start of Week (Sunday)
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

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
      container.appendChild(col);

      // 3. Inject Events
      // We search ALL months because a week can straddle two months
      this.data.months.forEach(month => {
        const events = month.events.filter(e => e.date === dateKey);
        events.forEach(evt => {
          this.renderAgendaItem(evt, dateKey);
        });
      });

      // 4. Inject Routines (Granular Detail)
      if (this.data.routines) {
        // Daily
        this.data.routines.daily?.forEach(r => this.renderRoutineItem(r, dateKey));
        // Weekly specific
        this.data.routines.weekly?.[i]?.forEach(r => this.renderRoutineItem(r, dateKey));
      }

      // 5. Inject Meals
      if (this.data.meals && this.data.meals[dateKey]) {
        const mealEl = col.querySelector(`#meal-${dateKey}`);
        mealEl.textContent = this.data.meals[dateKey].dinner;
      }
    }
  }

  renderAgendaItem(evt, dateKey) {
    // Sort into Morning/Afternoon/Evening based on time string
    let blockId = `block-morning-${dateKey}`; // Default
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
      block.appendChild(el);
    }
  }

  renderRoutineItem(routine, dateKey) {
    // Routines go to morning/evening based on preference
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
    
    // Headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
      const h = document.createElement('div');
      h.className = 'day-header';
      h.textContent = d;
      grid.appendChild(h);
    });

    // Logic to draw days
    const [year, monthNum] = month.id.split('-').map(Number);
    const firstDay = new Date(year, monthNum - 1, 1).getDay();
    const daysInMonth = new Date(year, monthNum, 0).getDate();

    // Empty cells
    for(let i=0; i<firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day-cell empty';
      grid.appendChild(empty);
    }

    // Days
    for(let d=1; d<=daysInMonth; d++) {
      const dateKey = `${year}-${String(monthNum).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dayEvents = month.events.filter(e => e.date === dateKey);
      
      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.innerHTML = `<div class="day-number">${d}</div>`;
      
      // Check if today
      const todayStr = new Date().toISOString().split('T')[0];
      if (dateKey === todayStr) cell.classList.add('today');

      dayEvents.forEach(evt => {
        const dot = document.createElement('div');
        dot.className = `event-dot ${evt.category}`;
        if(evt.priority === 'high') dot.classList.add('priority');
        const catColor = this.data.categories[evt.category]?.color || '#ccc';
        dot.style.backgroundColor = catColor;
        dot.textContent = evt.title;
        cell.appendChild(dot);
      });

      // Simple click to log for now
      cell.addEventListener('click', () => console.log('Clicked', dateKey));
      
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
      list.appendChild(item);
    });

    group.appendChild(list);
    return group;
  }

  // Helper: Save JSON
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
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new HomecCalendar();
});
