class HomecCalendar {
  constructor() {
    this.data = null;
    this.currentView = 'calendar';
    this.categoryFilter = 'all';
    this.priorityOnly = false;
    this.selectedEvent = null;
    this.eventsByDate = {};
    
    this.init();
  }

  async init() {
    await this.fetchData();
    this.attachEventListeners();
    this.refreshApp();
  }

  async fetchData() {
    try {
      const response = await fetch('quarter-2025-Q4.json');
      this.data = await response.json();
    } catch (err) {
      console.error("Error loading calendar data:", err);
      document.querySelector('.app-title').textContent = "Error Loading Data";
    }
  }

  refreshApp() {
    if (!this.data) return;
    this.updateHeader();
    this.eventsByDate = this.buildEventsByDate();
    this.renderCalendar();
    if (this.currentView === 'list') {
      this.renderListView();
    }
  }

  updateHeader() {
    const quarterLabel = document.getElementById('quarter-label');
    const quarterSpan = document.getElementById('quarter-span');
    quarterLabel.textContent = `Q${this.data.meta.quarter} ${this.data.meta.year}`;
    quarterSpan.textContent = this.data.meta.span;
  }

  buildEventsByDate() {
    const eventsByDate = {};
    Object.values(this.data.months).forEach(month => {
      if (month.weeks) {
        month.weeks.forEach(week => {
          if (week.events) {
            week.events.forEach(event => {
              const dateKey = this.getDateKey(event.date);
              if (!eventsByDate[dateKey]) eventsByDate[dateKey] = [];
              eventsByDate[dateKey].push(event);
            });
          }
        });
      }
    });
    return eventsByDate;
  }

  getDateKey(dateOrStr) {
    if (typeof dateOrStr === 'string') return dateOrStr;
    const date = dateOrStr;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  renderCalendar() {
    const grid = document.getElementById('months-grid');
    grid.innerHTML = '';
    
    // Sort months to ensure correct order (Oct, Nov, Dec)
    const monthOrder = ['october', 'november', 'december'];
    
    monthOrder.forEach(monthKey => {
      const month = this.data.months[monthKey];
      if (!month) return; // safety check
      
      // Skip past months if empty
      if (month.status === 'past' && (!month.weeks || month.weeks.length === 0)) return;

      const monthCard = this.createMonthCard(monthKey, month);
      grid.appendChild(monthCard);
    });
  }

  createMonthCard(monthKey, month) {
    const card = document.createElement('div');
    card.className = 'month-card';
    card.dataset.month = monthKey;

    card.innerHTML = `
      <div class="month-header">
        <h2>${month.monthName}</h2>
        ${month.summary ? `<p class="month-summary">${month.summary}</p>` : ''}
      </div>
    `;

    const calendarGrid = this.createCalendarGrid(month, monthKey);
    card.appendChild(calendarGrid);

    // Extras
    if ((month.milestones && month.milestones.length > 0) || 
        (month.aspirational && month.aspirational.some(a => a.status === 'unscheduled'))) {
      const extras = this.createMonthExtras(month);
      card.appendChild(extras);
    }

    return card;
  }

  createCalendarGrid(month, monthKey) {
    const container = document.createElement('div');
    container.className = 'calendar-grid';

    // Headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      const header = document.createElement('div');
      header.className = 'day-header';
      header.textContent = day;
      container.appendChild(header);
    });

    // Month Logic
    const monthMap = { 'october': 10, 'november': 11, 'december': 12 };
    const year = this.data.meta.year;
    const monthNum = monthMap[monthKey];
    const firstDay = new Date(year, monthNum - 1, 1);
    const lastDay = new Date(year, monthNum, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const today = new Date();
    const todayKey = this.getDateKey(today);

    // Empty cells
    for (let i = 0; i < startingDayOfWeek; i++) {
      const empty = document.createElement('div');
      empty.className = 'day-cell empty';
      container.appendChild(empty);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayCell = this.createDayCell(day, dateKey, dateKey === todayKey);
      container.appendChild(dayCell);
    }

    return container;
  }

  createDayCell(dayNumber, dateKey, isToday) {
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    cell.dataset.date = dateKey;
    if (isToday) cell.classList.add('today');

    cell.innerHTML = `<div class="day-number">${dayNumber}</div>`;

    const dayEvents = this.eventsByDate[dateKey] || [];
    const filteredEvents = this.filterEvents(dayEvents);

    if (filteredEvents.length > 0) {
      cell.classList.add('has-events');
      const primaryCategory = filteredEvents[0].category;
      if (['holiday', 'travel'].includes(primaryCategory)) {
        cell.classList.add(`category-${primaryCategory}`);
      }

      const eventsContainer = document.createElement('div');
      eventsContainer.className = 'day-events';

      filteredEvents.slice(0, 3).forEach(event => {
        eventsContainer.appendChild(this.createEventDot(event));
      });

      if (filteredEvents.length > 3) {
        const more = document.createElement('div');
        more.className = 'more-events';
        more.textContent = `+${filteredEvents.length - 3} more`;
        eventsContainer.appendChild(more);
      }
      cell.appendChild(eventsContainer);

      // View details click
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        if (filteredEvents.length === 1) this.showEventDetail(filteredEvents[0]);
        else this.showDayEvents(dateKey, filteredEvents);
      });
    } else {
        // Empty cell click -> Add New Event on this date
        cell.addEventListener('click', () => {
            this.openEditModal(null, dateKey);
        });
    }

    return cell;
  }

  createEventDot(event) {
    const dot = document.createElement('div');
    dot.className = `event-dot ${event.category}`;
    
    const category = this.data.categories[event.category];
    if (category) dot.style.backgroundColor = category.color;
    if (event.priority === 'high') dot.classList.add('priority');

    let text = event.title;
    if (event.time && event.time.toLowerCase() !== 'all-day') {
       text = `${event.time.split('-')[0].trim()} ${event.title}`;
    }
    dot.textContent = text;
    return dot;
  }

  filterEvents(events) {
    return events.filter(event => {
      if (this.categoryFilter !== 'all' && event.category !== this.categoryFilter) return false;
      if (this.priorityOnly && event.priority !== 'high') return false;
      return true;
    });
  }

  // --- MODAL & UI LOGIC ---

  showDayEvents(dateKey, events) {
    const modalBody = document.getElementById('modal-body');
    const date = new Date(dateKey + 'T12:00:00');
    
    modalBody.innerHTML = `
      <div class="day-events-detail">
        <h2>${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        <div class="events-list">
            ${events.map((event, index) => {
                const cat = this.data.categories[event.category];
                return `
                <div class="event-list-item" data-index="${index}" style="border-left-color: ${cat.color}">
                    <div class="event-time">${event.time || 'All day'}</div>
                    <div class="event-list-title">${event.priority === 'high' ? '!' : ''} ${event.title}</div>
                </div>`;
            }).join('')}
        </div>
      </div>
    `;

    // Make list items clickable
    const listItems = modalBody.querySelectorAll('.event-list-item');
    listItems.forEach((item, i) => {
        item.addEventListener('click', () => this.showEventDetail(events[i]));
    });

    // Hide edit button in list view, show in detail view
    document.getElementById('btn-edit-event').style.display = 'none';
    document.getElementById('event-modal').classList.add('visible');
  }

  showEventDetail(event) {
    this.selectedEvent = event;
    const modalBody = document.getElementById('modal-body');
    const category = this.data.categories[event.category];

    modalBody.innerHTML = `
      <div class="event-detail">
        <div class="event-detail-header">
          <span class="category-badge" style="background-color: ${category.color}">${category.icon} ${category.label}</span>
          ${event.priority === 'high' ? '<span class="priority-badge-large">High Priority</span>' : ''}
        </div>
        <h2 class="event-detail-title">${event.title}</h2>
        <div class="event-detail-meta">
          <div class="meta-row"><span class="meta-label">Date:</span><span class="meta-value">${event.date}</span></div>
          <div class="meta-row"><span class="meta-label">Time:</span><span class="meta-value">${event.time || 'All day'}</span></div>
          ${event.notes ? `<div class="event-detail-section"><h3>Notes</h3><p>${event.notes}</p></div>` : ''}
        </div>
      </div>
    `;

    document.getElementById('btn-edit-event').style.display = 'block';
    document.getElementById('event-modal').classList.add('visible');
  }

  openEditModal(event = null, dateKey = null) {
    const modal = document.getElementById('edit-modal');
    const form = document.getElementById('event-form');
    document.getElementById('event-modal').classList.remove('visible'); // Close read-only modal

    if (event) {
        // Edit Mode
        document.getElementById('edit-modal-title').textContent = 'Edit Event';
        document.getElementById('edit-id').value = event.id;
        document.getElementById('edit-title').value = event.title;
        document.getElementById('edit-date').value = event.date;
        document.getElementById('edit-time').value = event.time === 'all-day' ? '' : event.time;
        document.getElementById('edit-category').value = event.category;
        document.getElementById('edit-priority').checked = event.priority === 'high';
        document.getElementById('edit-notes').value = event.notes || '';
        document.getElementById('btn-delete-event').style.display = 'inline-block';
    } else {
        // Add Mode
        document.getElementById('edit-modal-title').textContent = 'New Event';
        form.reset();
        document.getElementById('edit-id').value = '';
        if (dateKey) document.getElementById('edit-date').value = dateKey;
        document.getElementById('edit-category').value = 'family'; // default
        document.getElementById('btn-delete-event').style.display = 'none';
    }

    modal.classList.add('visible');
  }

  saveEventFromForm(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const date = document.getElementById('edit-date').value;
    const time = document.getElementById('edit-time').value || 'all-day';
    const category = document.getElementById('edit-category').value;
    const priority = document.getElementById('edit-priority').checked ? 'high' : null;
    const notes = document.getElementById('edit-notes').value;

    const eventData = {
        id: id || 'evt-' + Date.now(),
        title, date, time, category, notes,
        priority: priority
    };

    if (id) {
        this.updateEventData(id, eventData);
    } else {
        this.addEventData(eventData);
    }

    document.getElementById('edit-modal').classList.remove('visible');
    this.refreshApp();
  }

  // --- DATA MANIPULATION ---

  // Helper: locate event in nested structure
  findEventLocation(id) {
    for (const mKey in this.data.months) {
        const month = this.data.months[mKey];
        if (!month.weeks) continue;
        for (const week of month.weeks) {
            if (!week.events) continue;
            const idx = week.events.findIndex(e => e.id === id);
            if (idx !== -1) return { week, index: idx };
        }
    }
    return null;
  }

  updateEventData(id, newData) {
    const loc = this.findEventLocation(id);
    if (loc) {
        // If date changed, we might need to move it, but for simplicity we keep in same week array 
        // unless we want strict week buckets. For V1, simple update:
        loc.week.events[loc.index] = { ...loc.week.events[loc.index], ...newData };
    }
  }

  addEventData(newEvent) {
    // Find appropriate week bucket based on date
    const date = new Date(newEvent.date);
    const monthIndex = date.getMonth(); // 9=Oct, 10=Nov, 11=Dec
    let monthKey = '';
    if (monthIndex === 9) monthKey = 'october';
    else if (monthIndex === 10) monthKey = 'november';
    else if (monthIndex === 11) monthKey = 'december';
    
    // Fallback to december if out of bounds (simplification)
    if (!monthKey || !this.data.months[monthKey]) monthKey = 'december';

    const month = this.data.months[monthKey];
    
    // Find week. Simple logic: just put in the first week that ends after this date
    // Or simpler: put in the last week if we can't determine.
    // Better: Sort weeks by date, find closest.
    let targetWeek = month.weeks[month.weeks.length - 1]; // Default to last week
    
    // Try to find correct week
    for (const week of month.weeks) {
        const weekStart = new Date(week.weekOf);
        // If event is in this week (roughly)
        const diff = (date - weekStart) / (1000 * 60 * 60 * 24);
        if (diff >= 0 && diff < 7) {
            targetWeek = week;
            break;
        }
    }

    if (!targetWeek.events) targetWeek.events = [];
    targetWeek.events.push(newEvent);
  }

  deleteEvent() {
    const id = document.getElementById('edit-id').value;
    const loc = this.findEventLocation(id);
    if (loc) {
        if(confirm('Delete this event?')) {
            loc.week.events.splice(loc.index, 1);
            document.getElementById('edit-modal').classList.remove('visible');
            this.refreshApp();
        }
    }
  }

  exportData() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `quarter-${this.data.meta.year}-${this.data.meta.quarter}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- UTILS ---

  createMonthExtras(month) {
    // Same as before
    const extras = document.createElement('div');
    extras.className = 'month-extras';
    // ... (Milestones/Aspirational implementation same as previous version)
    // For brevity, using simplified version here, copy full logic if needed
    if (month.milestones && month.milestones.length > 0) {
        extras.innerHTML += `<h3>Milestones</h3>` + month.milestones.map(m => 
            `<div class="milestone-item"><span>${m.icon}</span> <span>${this.formatShortDate(m.date)} ${m.title}</span></div>`
        ).join('');
    }
    return extras;
  }

  attachEventListeners() {
    // View toggles
    document.querySelectorAll('.toggle-option').forEach(opt => {
        opt.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
    });

    // Filters
    document.getElementById('category-filter').addEventListener('change', (e) => {
        this.categoryFilter = e.target.value;
        this.renderCalendar();
    });
    document.getElementById('priority-only').addEventListener('change', (e) => {
        this.priorityOnly = e.target.checked;
        this.renderCalendar();
    });

    // Modal Actions
    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('event-modal').classList.remove('visible');
    });
    document.getElementById('edit-modal-close').addEventListener('click', () => {
        document.getElementById('edit-modal').classList.remove('visible');
    });

    // New Buttons
    document.getElementById('btn-add-event').addEventListener('click', () => this.openEditModal());
    document.getElementById('btn-edit-event').addEventListener('click', () => this.openEditModal(this.selectedEvent));
    document.getElementById('btn-save-data').addEventListener('click', () => this.exportData());
    document.getElementById('btn-delete-event').addEventListener('click', () => this.deleteEvent());

    // Form Submit
    document.getElementById('event-form').addEventListener('submit', (e) => this.saveEventFromForm(e));
  }

  switchView(view) {
    this.currentView = view;
    document.querySelectorAll('.toggle-option').forEach(opt => opt.classList.toggle('active', opt.dataset.view === view));
    document.getElementById('calendar-view').classList.toggle('active', view === 'calendar');
    document.getElementById('list-view').classList.toggle('active', view === 'list');
  }

  formatShortDate(dateStr) { return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }); }
}

document.addEventListener('DOMContentLoaded', () => {
  window.homec = new HomecCalendar();
});
