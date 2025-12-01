// HOMEC - Family Calendar System
// Traditional monthly calendar view

class HomecCalendar {
  constructor(data) {
    this.data = data;
    this.currentView = 'calendar';
    this.categoryFilter = 'all';
    this.priorityOnly = false;
    this.selectedEvent = null;
    
    // Process events for easier day-based lookup
    this.eventsByDate = this.buildEventsByDate();
    
    this.init();
  }

  init() {
    this.updateHeader();
    this.renderCalendar();
    this.attachEventListeners();
    this.checkConflicts();
  }

  updateHeader() {
    const quarterLabel = document.getElementById('quarter-label');
    const quarterSpan = document.getElementById('quarter-span');
    
    quarterLabel.textContent = `Q${this.data.meta.quarter} ${this.data.meta.year}`;
    quarterSpan.textContent = this.data.meta.span;
  }

  // Build a lookup table of events by date for easy calendar rendering
  buildEventsByDate() {
    const eventsByDate = {};
    
    Object.values(this.data.months).forEach(month => {
      if (month.weeks) {
        month.weeks.forEach(week => {
          if (week.events) {
            week.events.forEach(event => {
              const dateKey = this.getDateKey(event.date);
              if (!eventsByDate[dateKey]) {
                eventsByDate[dateKey] = [];
              }
              eventsByDate[dateKey].push(event);
            });
          }
        });
      }
    });
    
    return eventsByDate;
  }

  getDateKey(dateOrStr) {
    // FIXED: Return strings directly to avoid timezone shifting
    if (typeof dateOrStr === 'string') {
      return dateOrStr;
    }
    
    // Handle Date objects (like 'today')
    const date = dateOrStr;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  renderCalendar() {
    const grid = document.getElementById('months-grid');
    grid.innerHTML = '';

    // Render each month as a traditional calendar
    Object.keys(this.data.months).forEach(monthKey => {
      const month = this.data.months[monthKey];
      
      // Skip past months with no events
      if (month.status === 'past' && (!month.weeks || month.weeks.length === 0)) {
        return;
      }

      const monthCard = this.createMonthCard(monthKey, month);
      grid.appendChild(monthCard);
    });
  }

  createMonthCard(monthKey, month) {
    const card = document.createElement('div');
    card.className = 'month-card';
    card.dataset.month = monthKey;

    // Month header
    const header = document.createElement('div');
    header.className = 'month-header';
    header.innerHTML = `
      <h2>${month.monthName}</h2>
      ${month.summary ? `<p class="month-summary">${month.summary}</p>` : ''}
    `;
    card.appendChild(header);

    // Calendar grid
    const calendarGrid = this.createCalendarGrid(month, monthKey);
    card.appendChild(calendarGrid);

    // Milestones and Aspirational sections
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

    // Day of week headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      const header = document.createElement('div');
      header.className = 'day-header';
      header.textContent = day;
      container.appendChild(header);
    });

    // Map month name to number
    const monthMap = {
      'october': 10,
      'november': 11,
      'december': 12,
      'january': 1,
      'february': 2,
      'march': 3
    };
    
    const year = this.data.meta.year;
    const monthNum = monthMap[monthKey];
    
    // Get first day and number of days in month
    const firstDay = new Date(year, monthNum - 1, 1);
    const lastDay = new Date(year, monthNum, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const today = new Date();
    const todayKey = this.getDateKey(today);

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'day-cell empty';
      container.appendChild(emptyCell);
    }

    // Add cells for each day in the month
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

    if (isToday) {
      cell.classList.add('today');
    }

    // Day number
    const dayNum = document.createElement('div');
    dayNum.className = 'day-number';
    dayNum.textContent = dayNumber;
    cell.appendChild(dayNum);

    // Get events for this day
    const dayEvents = this.eventsByDate[dateKey] || [];
    const filteredEvents = this.filterEvents(dayEvents);

    if (filteredEvents.length > 0) {
      cell.classList.add('has-events');
      
      // Determine primary category for day styling
      const primaryCategory = filteredEvents[0].category;
      if (primaryCategory === 'holiday' || primaryCategory === 'travel') {
        cell.classList.add(`category-${primaryCategory}`);
      }

      // Events container
      const eventsContainer = document.createElement('div');
      eventsContainer.className = 'day-events';

      // Show first 2-3 events as mini indicators
      const maxVisible = 3;
      filteredEvents.slice(0, maxVisible).forEach(event => {
        const eventDot = this.createEventDot(event);
        eventsContainer.appendChild(eventDot);
      });

      // Show "more" indicator if needed
      if (filteredEvents.length > maxVisible) {
        const more = document.createElement('div');
        more.className = 'more-events';
        more.textContent = `+${filteredEvents.length - maxVisible} more`;
        eventsContainer.appendChild(more);
      }

      cell.appendChild(eventsContainer);

      // Click handler to show day's events
      cell.addEventListener('click', () => {
        if (filteredEvents.length === 1) {
          this.showEventDetail(filteredEvents[0]);
        } else {
          this.showDayEvents(dateKey, filteredEvents);
        }
      });
    }

    return cell;
  }

  createEventDot(event) {
    const dot = document.createElement('div');
    dot.className = 'event-dot';
    
    const category = this.data.categories[event.category];
    if (category) {
      dot.style.backgroundColor = category.color;
      dot.style.borderLeftColor = category.color;
    }

    if (event.priority === 'high') {
      dot.classList.add('priority');
    }

    // Show title or time + title
    const text = event.time ? `${event.time.split('-')[0].trim()} ${event.title}` : event.title;
    dot.textContent = text;

    return dot;
  }

  filterEvents(events) {
    return events.filter(event => {
      // Category filter
      if (this.categoryFilter !== 'all' && event.category !== this.categoryFilter) {
        return false;
      }

      // Priority filter
      if (this.priorityOnly && event.priority !== 'high') {
        return false;
      }

      return true;
    });
  }

  showDayEvents(dateKey, events) {
    const modal = document.getElementById('event-modal');
    const modalBody = document.getElementById('modal-body');

    const date = new Date(dateKey + 'T12:00:00'); // Safe parsing for display
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    modalBody.innerHTML = `
      <div class="day-events-detail">
        <h2>${dateStr}</h2>
        <div class="events-list">
          ${events.map(event => this.createEventListItem(event)).join('')}
        </div>
      </div>
    `;

    modal.classList.add('visible');

    // Add click handlers to event items
    events.forEach((event, index) => {
      const eventItem = modalBody.querySelectorAll('.event-list-item')[index];
      eventItem.addEventListener('click', () => {
        this.showEventDetail(event);
      });
    });
  }

  createEventListItem(event) {
    const category = this.data.categories[event.category];
    return `
      <div class="event-list-item" style="border-left-color: ${category.color}">
        <div class="event-time">${event.time || 'All day'}</div>
        <div class="event-list-title">
          ${event.priority === 'high' ? '!' : ''} ${event.title}
        </div>
      </div>
    `;
  }

  showEventDetail(event) {
    this.selectedEvent = event;
    const modal = document.getElementById('event-modal');
    const modalBody = document.getElementById('modal-body');

    const category = this.data.categories[event.category];

    modalBody.innerHTML = `
      <div class="event-detail">
        <div class="event-detail-header">
          <span class="category-badge" style="background-color: ${category.color}">
            ${category.icon} ${category.label}
          </span>
          ${event.priority === 'high' ? '<span class="priority-badge-large">High Priority</span>' : ''}
          ${event.recurring ? '<span class="recurring-badge">↻ Recurring</span>' : ''}
        </div>
        
        <h2 class="event-detail-title">${event.title}</h2>
        
        <div class="event-detail-meta">
          <div class="meta-row">
            <span class="meta-label">Date:</span>
            <span class="meta-value">${this.formatFullDate(event.date)}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Time:</span>
            <span class="meta-value">${event.time || 'All day'}</span>
          </div>
          ${event.duration ? `
            <div class="meta-row">
              <span class="meta-label">Duration:</span>
              <span class="meta-value">${event.duration}</span>
            </div>
          ` : ''}
          ${event.location ? `
            <div class="meta-row">
              <span class="meta-label">Location:</span>
              <span class="meta-value">${event.location}</span>
            </div>
          ` : ''}
        </div>

        ${event.notes ? `
          <div class="event-detail-section">
            <h3>Notes</h3>
            <p>${event.notes}</p>
          </div>
        ` : ''}

        ${event.prepTasks && event.prepTasks.length > 0 ? `
          <div class="event-detail-section">
            <h3>Prep Tasks</h3>
            <ul class="prep-task-list">
              ${event.prepTasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${event.conflict && event.conflictNote ? `
          <div class="event-detail-section conflict-section">
            <h3>⚠️ Conflict</h3>
            <p>${event.conflictNote}</p>
          </div>
        ` : ''}
      </div>
    `;

    modal.classList.add('visible');
  }

  closeModal() {
    const modal = document.getElementById('event-modal');
    modal.classList.remove('visible');
    this.selectedEvent = null;
  }

  createMonthExtras(month) {
    const extras = document.createElement('div');
    extras.className = 'month-extras';

    // Milestones
    if (month.milestones && month.milestones.length > 0) {
      const milestonesSection = document.createElement('div');
      milestonesSection.className = 'extras-section';
      milestonesSection.innerHTML = `
        <h3>Milestones</h3>
        ${month.milestones.map(m => `
          <div class="milestone-item">
            <span class="milestone-icon">${m.icon || '⭐'}</span>
            <span class="milestone-date">${this.formatDate(m.date)}</span>
            <span class="milestone-title">${m.title}</span>
          </div>
        `).join('')}
      `;
      extras.appendChild(milestonesSection);
    }

    // Aspirational
    const unscheduled = month.aspirational ? month.aspirational.filter(a => a.status === 'unscheduled') : [];
    if (unscheduled.length > 0) {
      const aspirationalSection = document.createElement('div');
      aspirationalSection.className = 'extras-section';
      aspirationalSection.innerHTML = `
        <h3>Want to Do</h3>
        ${unscheduled.map(a => `
          <div class="aspirational-item ${a.priority || ''}">
            <span class="asp-title">${a.title}</span>
            <span class="asp-time">${a.timeNeeded}</span>
          </div>
        `).join('')}
      `;
      extras.appendChild(aspirationalSection);
    }

    return extras;
  }

  renderListView() {
    const today = new Date();
    const twoWeeksFromNow = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));

    // Collect all events
    const allEvents = [];
    Object.values(this.data.months).forEach(month => {
      if (month.weeks) {
        month.weeks.forEach(week => {
          if (week.events) {
            week.events.forEach(event => {
              allEvents.push(event);
            });
          }
        });
      }
    });

    // Immediate (next 2 weeks)
    const immediate = allEvents.filter(e => {
      const eventDate = new Date(e.date + 'T12:00:00');
      return eventDate >= today && eventDate <= twoWeeksFromNow;
    });
    this.renderListSection('list-immediate', immediate);

    // This month
    const thisMonth = allEvents.filter(e => {
      const eventDate = new Date(e.date + 'T12:00:00');
      return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
    });
    this.renderListSection('list-month', thisMonth);

    // Aspirational
    const aspirational = [];
    Object.values(this.data.months).forEach(month => {
      if (month.aspirational) {
        month.aspirational.forEach(asp => {
          if (asp.status === 'unscheduled') {
            aspirational.push({
              ...asp,
              type: 'aspirational',
              category: asp.category
            });
          }
        });
      }
    });
    this.renderListSection('list-aspirational', aspirational);

    // Prep tasks
    const prepTasks = [];
    if (this.data.prep) {
      ['immediate', 'thisMonth', 'thisQuarter'].forEach(timeframe => {
        if (this.data.prep[timeframe]) {
          this.data.prep[timeframe].forEach(prep => {
            prepTasks.push(prep);
          });
        }
      });
    }
    this.renderPrepList('list-prep', prepTasks);
  }

  renderListSection(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = '<p class="empty-list">No items</p>';
      return;
    }

    items.forEach(item => {
      const card = this.createEventCard(item);
      container.appendChild(card);
    });
  }

  createEventCard(event) {
    const card = document.createElement('div');
    card.className = `event-card ${event.category} ${event.priority || ''} ${event.conflict ? 'conflict' : ''}`;
    
    const category = this.data.categories[event.category];
    if (category) {
      card.style.borderLeftColor = category.color;
    }

    const recurring = event.recurring ? '<span class="recurring-badge">↻</span>' : '';
    const priority = event.priority === 'high' ? '<span class="priority-badge">!</span>' : '';
    const prepCount = event.prepTasks ? `<span class="prep-badge">📋 ${event.prepTasks.length}</span>` : '';
    const conflictIcon = event.conflict ? '<span class="conflict-icon">⚠️</span>' : '';

    card.innerHTML = `
      <div class="event-header">
        <span class="event-day">${this.getDayName(event.date)}</span>
        <span class="event-date">${this.formatShortDate(event.date)}</span>
      </div>
      <div class="event-title-row">
        ${recurring}
        ${priority}
        <span class="event-title">${event.title}</span>
        ${conflictIcon}
      </div>
      <div class="event-meta">
        <span class="event-time">${event.time || 'All day'}</span>
        ${prepCount}
      </div>
      ${event.notes ? `<div class="event-notes-preview">${event.notes}</div>` : ''}
    `;

    card.addEventListener('click', () => this.showEventDetail(event));

    return card;
  }

  renderPrepList(containerId, tasks) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (tasks.length === 0) {
      container.innerHTML = '<p class="empty-list">No prep tasks</p>';
      return;
    }

    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = `prep-item ${task.priority || ''}`;
      taskItem.innerHTML = `
        <div class="prep-deadline">${this.formatShortDate(task.deadline)}</div>
        <div class="prep-task">${task.task}</div>
        <div class="prep-category">${task.category}</div>
      `;
      container.appendChild(taskItem);
    });
  }

  checkConflicts() {
    if (this.data.conflicts && this.data.conflicts.length > 0) {
      const unresolved = this.data.conflicts.filter(c => !c.resolved);
      
      if (unresolved.length > 0) {
        const banner = document.getElementById('conflict-banner');
        const text = document.getElementById('conflict-text');
        
        text.textContent = `${unresolved.length} scheduling conflict${unresolved.length > 1 ? 's' : ''} detected`;
        banner.classList.remove('hidden');
      }
    }
  }

  attachEventListeners() {
    // View toggle
    const toggleOptions = document.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        const view = e.target.dataset.view;
        this.switchView(view);
      });
    });

    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', (e) => {
      this.categoryFilter = e.target.value;
      this.renderCalendar();
    });

    // Priority filter
    const priorityFilter = document.getElementById('priority-only');
    priorityFilter.addEventListener('change', (e) => {
      this.priorityOnly = e.target.checked;
      this.renderCalendar();
    });

    // Modal close
    const modalClose = document.getElementById('modal-close');
    modalClose.addEventListener('click', () => this.closeModal());

    const modal = document.getElementById('event-modal');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Conflict banner dismiss
    const conflictDismiss = document.getElementById('conflict-dismiss');
    conflictDismiss.addEventListener('click', () => {
      document.getElementById('conflict-banner').classList.add('hidden');
    });
  }

  switchView(view) {
    this.currentView = view;

    // Update toggle buttons
    document.querySelectorAll('.toggle-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.view === view);
    });

    // Update views
    document.getElementById('calendar-view').classList.toggle('active', view === 'calendar');
    document.getElementById('list-view').classList.toggle('active', view === 'list');

    if (view === 'list') {
      this.renderListView();
    }
  }

  // Utility functions
  formatDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  formatShortDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  }

  formatFullDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getDayName(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof quarterData !== 'undefined') {
    window.homec = new HomecCalendar(quarterData);
  } else {
    console.error('Quarter data not loaded');
  }
});
