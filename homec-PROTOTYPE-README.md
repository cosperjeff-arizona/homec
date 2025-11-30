# HOMEC Prototype

**Family Calendar System - Proof of Concept**

This is a working prototype for Q4 2025, focusing on December events.

## Files Included

```
homec-prototype/
├── index.html              # Main calendar view
├── quarter-2025-Q4.js     # Q4 2025 data (detailed December)
├── js/
│   └── homec.js           # Core calendar logic
└── styles/
    └── homec.css          # Mise en Place adapted theme
```

## Quick Start

1. **Extract all files** maintaining the folder structure
2. **Open `index.html`** in your browser
   - Or run a local server: `python -m http.server 8000`
3. **Explore the calendar**:
   - Calendar view shows December week-by-week
   - Click any event for full details
   - Switch to List view for different perspective
   - Filter by category or priority

## What Works

✅ **Calendar Grid View**
- December weeks displayed
- Events color-coded by category
- Busy score indicators
- Week themes and summaries

✅ **Event Details**
- Click any event to see full details
- Prep tasks listed
- Conflict warnings shown

✅ **List View**
- Immediate (next 2 weeks)
- This month events
- Aspirational (unscheduled) items
- All prep tasks

✅ **Filtering**
- Filter by category
- Show high priority only
- Conflict detection banner

✅ **Mobile Responsive**
- Desktop-first design
- Works on mobile/tablet

## Test the Prototype

Try these interactions:

1. **View December 12-16 week** (Tucson trip)
   - See split travel arrangements
   - Check prep tasks deadline Dec 10
   - Notice conflict flag on niece's basketball

2. **Click "Pre-Christmas Date Night"** (Dec 20)
   - High priority event
   - Prep tasks include babysitter
   - Protected time note

3. **Switch to List View**
   - See immediate prep tasks
   - Check aspirational items (unscheduled)

4. **Filter by Category**
   - Select "Holiday" to see just Christmas events
   - Toggle "High Priority Only"

5. **Check Conflict Banner**
   - Shows unresolved conflicts at top

## What's Next?

**If this prototype proves useful:**

Phase 1 Complete ✅
- Working calendar view
- Event detail system
- Basic filtering

Phase 2: AI Prompt System
- Master prompt for quarterly planning
- Structured generation workflow
- Validation checklist

Phase 3: Enhanced Views
- Week detail zoom
- Month navigation
- Print optimization

## Notes

This uses your real family context:
- Spidey (3 years old) in preschool
- Trace-E (5 months) at home
- Your actual December plans
- Phoenix, AZ location

The data structure is designed to be:
- Human readable (you can edit the .js file)
- AI-generatable (structured for prompts)
- Extensible (easy to add fields)

## Feedback Questions

1. Does the calendar view give you the visibility you wanted?
2. Is the event detail modal helpful?
3. Does the week-by-week layout work?
4. Would you use list view or stick to calendar?
5. Is filtering by category/priority useful?
6. Does this reduce the friction of family planning?

---

**Next Step**: If this feels right, we build the AI prompt system to generate quarter files like this automatically.
