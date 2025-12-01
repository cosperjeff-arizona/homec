# HOMEC - Family Calendar System

**Traditional Monthly Calendar View**

A clean, mobile-friendly family calendar with traditional monthly grid layout.

## Files

```
homec/
├── index.html              # Main app structure
├── app.js                  # Calendar rendering logic
├── styles.css              # Dark theme styling
└── quarter-2025-Q4.js      # Q4 2025 data
```

## What Changed

**✨ New Design:**
- **Traditional monthly calendars** - 7-column grid layout (Sun-Sat)
- **2x1 card layout** - Two months in first row, one in second row
- **Cleaner file names** - No "homec-" prefix on every file
- **Better mobile UX** - Compact, responsive, familiar calendar view
- **Day-based events** - Events appear in their day cells, not in week cards

**What Stayed:**
- Same data structure (quarter-2025-Q4.js unchanged)
- Event detail modal
- List view
- Category filtering
- Conflict detection

## Quick Start

1. **Open in browser**: Open `index.html` directly
2. **Or use local server**: `python -m http.server 8000`
3. **Explore**:
   - Click any day with events to see details
   - Days with multiple events show a list first
   - Days with single events open directly
   - Switch to List view for timeline perspective
   - Filter by category or high priority

## Key Improvements

### Before (Week Cards)
- Long vertical list of weeks
- Scroll-heavy on mobile
- Less intuitive time visualization
- Hard to see month at a glance

### After (Monthly Calendars)
- Traditional calendar grid everyone knows
- See full month at once
- Better spatial awareness of time
- Mobile-friendly compact layout
- Less scrolling, more overview

## Features

✅ **Calendar View**
- Traditional monthly grid
- Day cells show event indicators
- Color-coded by category
- Today highlighted
- Holiday/travel days have subtle backgrounds

✅ **Event Interaction**
- Click day with single event → Opens event detail
- Click day with multiple events → Shows day's event list
- Click event from list → Opens event detail
- All events show category, time, priority

✅ **List View**
- Immediate (next 2 weeks)
- This month
- Aspirational (unscheduled)
- All prep tasks

✅ **Filtering**
- Filter by category
- Show high priority only
- Real-time calendar updates

✅ **Mobile Responsive**
- Scales from phone to desktop
- Single-column on mobile
- Readable event indicators
- Touch-friendly

## Data Structure

The `quarter-2025-Q4.js` file structure **did not change**. The app now:
1. Loads the same weekly data
2. Reorganizes it by date for calendar rendering
3. Displays in traditional monthly format

This means:
- Existing quarter files work as-is
- AI prompt system can stay the same
- Data validation remains unchanged

## Design Philosophy

Following your homesteader coding ethos:
- **Simple** - Traditional calendar layout everyone understands
- **Maintainable** - Plain JavaScript, no frameworks
- **Self-reliant** - All code visible and editable
- **Practical** - Solves the real problem (seeing your month at a glance)

## Next Steps

**If this feels right:**

✅ Phase 1 Complete - Working traditional calendar view

🔄 Phase 2: AI Prompt System
- Master prompt for quarterly planning
- Generate quarter data files
- Validation checklist

🔮 Phase 3: Enhancements
- Print optimization
- Month navigation (if you want multi-quarter)
- Quick edit mode
- Mobile app (PWA)

## Test It

**December scenarios:**
1. Look at **Dec 12-16** (Tucson trip) - See split travel across multiple days
2. Click **Dec 20** (Date night) - High priority with prep tasks
3. Check **Dec 25** (Christmas) - Holiday highlighting
4. Filter to "Holiday" category - See just Christmas events
5. Switch to List view - See immediate prep tasks

**Mobile test:**
- Open on phone
- Calendar scales to single column
- Day cells remain readable
- Events tap-friendly
- Modal fills screen nicely

## Feedback Questions

1. **Overview**: Can you see your whole month better now?
2. **Navigation**: Is it easier to find specific dates?
3. **Mobile**: Does it work well on your phone?
4. **Events**: Is the day → event detail flow intuitive?
5. **Comparison**: Prefer this over the week card layout?
6. **Missing**: Anything you want back from the old design?

---

**This redesign prioritizes:**
- Familiar mental model (traditional calendar)
- Mobile-first usability
- Clean, uncluttered interface
- Quick event access

Let me know what you think!
