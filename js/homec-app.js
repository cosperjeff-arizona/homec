// HOMEC - Family Calendar System
// Main application logic

class HomecCalendar {
  constructor(data) {
    this.data = data;
    this.currentView = 'calendar';
    this.categoryFilter = 'all';
    this.priorityOnly = false;
    this.selectedEvent = null;
    
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

  renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    // Render each month
    Object.keys(this.data.months).forEach(monthKey => {
      const month = this.data.months[monthKey];
      
      // Skip past months unless they have events
      if (month.status === 'past' && (!month.weeks || month.weeks.length === 0)) {
        return;
      }

      const monthColumn = this.createMonthColumn(monthKey, month);
      grid.appendChild(monthColumn);
    });
  }

  createMonthColumn(monthKey, month) {
    const column = document.createElement('div');
    column.className = 'month-column';
    column.dataset.month = monthKey;

    // Month header
    const header = document.createElement('div');
    header.className = 'month-header';
    header.innerHTML = `
      <h2>${month.monthName}</h2>
      ${month.summary ? `<p class="month-summary">${month.summary}</p>` : ''}
    `;
    column.appendChild(header);

    // Skip if no weeks
    if (!month.weeks || month.weeks.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.textContent = month.status === 'past' ? 'Month complete' : 'No events scheduled';
      column.appendChild(emptyState);
      return column;
    }

    // Render weeks
    const weeksContainer = document.createElement('div');
    weeksContainer.className = 'weeks-container';

    month.weeks.forEach(week => {
      const weekElement = this.createWeekRow(week);
      weeksContainer.appendChild(weekElement);
    });

    column.appendChild(weeksContainer);

    // Milestones
    if (month.milestones && month.milestones.length > 0) {
      const milestonesSection = document.createElement('div');
      milestonesSection.className = 'milestones-section';
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
      column.appendChild(milestonesSection);
    }

    // Aspirational
    if (month.aspirational && month.aspirational.length > 0) {
      const aspirationalSection = document.createElement('div');
      aspirationalSection.className = 'aspirational-section';
      
      const unscheduled = month.aspirational.filter(a => a.status === 'unscheduled');
      
      if (unscheduled.length > 0) {
        aspirationalSection.innerHTML = `
          <h3>Want to Do</h3>
          ${unscheduled.map(a => `
            <div class="aspirational-item ${a.priority || ''}">
              <span class="asp-title">${a.title}</span>
              <span class="asp-time">${a.timeNeeded}</span>
            </div>
          `).join('')}
        `;
        column.appendChild(aspirationalSection);
      }
    }

    return column;
  }

  createWeekRow(week) {
    const weekRow = document.createElement('div');
    weekRow.className = 'week-row';
    weekRow.dataset.week = week.weekOf;

    // Week header
    const weekHeader = document.createElement('div');
    weekHeader.className = 'week-header';
    weekHeader.innerHTML = `
      <div class="week-info">
        <span class="week-number">Week ${week.weekNumber}</span>
        <span class="week-date">${this.formatDateRange(week.weekOf)}</span>
      </div>
      ${week.theme ? `<div class="week-theme">${week.theme}</div>` : ''}
      ${week.analysis ? `<div class="week-busy-score busy-${week.analysis.busyScore}">${week.analysis.busyScore}</div>` : ''}
    `;
    weekRow.appendChild(weekHeader);

    // Events
    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'events-container';

    const filteredEvents = this.filterEvents(week.events || []);

    if (filteredEvents.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'no-events';
      emptyMsg.textContent = this.categoryFilter !== 'all' || this.priorityOnly 
        ? 'No events match filters' 
        : 'No events this week';
      eventsContainer.appendChild(emptyMsg);
    } else {
      filteredEvents.forEach(event => {
        const eventCard = this.createEventCard(event);
        eventsContainer.appendChild(eventCard);
      });
    }

    weekRow.appendChild(eventsContainer);

    return weekRow;
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
      const eventDate = new Date(e.date);
      return eventDate >= today && eventDate <= twoWeeksFromNow;
    });
    this.renderListSection('list-immediate', immediate);

    // This month
    const thisMonth = allEvents.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.getMonth() === today.getMonth();
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
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  formatShortDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  }

  formatFullDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateRange(startDate) {
    const date = new Date(startDate);
    const endDate = new Date(date.getTime() + (6 * 24 * 60 * 60 * 1000));
    
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }

  getDayName(dateStr) {
    const date = new Date(dateStr);
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
