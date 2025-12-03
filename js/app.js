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
      
      dayEvents.forEach(evt => {
        const dot = document.createElement('div');
        dot.className = `event-dot ${evt.category}`;
        if(evt.priority === 'high') dot.classList.add('priority');
        const catColor = this.data.categories[evt.category]?.color || '#ccc';
        dot.style.backgroundColor = catColor;
        dot.textContent = evt.title;
        cell.appendChild(dot);
      });

      // Simple click to log for now (Edit modal would go here)
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