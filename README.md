# HOMEC Enhanced - Family Command Center

**Version 3.0 - Strategic Horizon + Tactical Detail**

A privacy-first, rolling 6-month dashboard with integrated hourly scheduling for complete family situational awareness.

---

## 🎯 What's New in Version 3.0

This enhanced version combines the best of both worlds:
- **Strategic Planning** (HOMEC's 6-month rolling horizon)
- **Tactical Execution** (Agenda's hour-by-hour detail)

### Key Enhancements

#### 1. **Visual Design Overhaul**
- **Gorgeous Gradient Background** - Multi-layer radial gradients create depth
- **Glass-morphism Effects** - Frosted glass aesthetic with backdrop-filter
- **Enhanced Typography** - Better font stacks and spacing
- **Improved Shadows** - Deeper, more realistic shadows for depth
- **Tag System** - Color-coded pill badges for event categories
- **Focus Indicators** - High-priority events get special highlighting

#### 2. **Detailed Week View**
- Click "📋 Hourly Detail" button to see hour-by-hour schedule
- Full-screen modal with scrollable table
- Sticky time column and headers
- Multiple events per time block
- Supports "focus" events with special highlighting

#### 3. **Enhanced Data Structure**
- New `detailedWeeks` object for tactical scheduling
- Expanded category system (added: food, home, personal)
- Support for time blocks: Early morning, Morning, Midday, Afternoon, Evening, Late evening, Night
- Individual event timing within blocks

#### 4. **Improved Event Display**
- Category tags now show on weekly agenda items
- Better color coding with border-left indicators
- Focus/high-priority events get distinct styling
- Smoother hover animations

#### 5. **Mobile Responsiveness**
- Better stacking on smaller screens
- Improved touch targets
- Horizontal scroll for tables
- Day-by-day navigation ready (infrastructure in place)

---

## 📂 File Structure

```text
homec-enhanced/
├── index.html          # Enhanced HTML with detailed week modal
├── app.js              # Enhanced logic with hourly view rendering
├── styles.css          # Complete visual overhaul with Agenda aesthetics
├── data.js             # Enhanced data structure with detailedWeeks
└── README.md           # This file
```

---

## 🎨 Visual Improvements from Agenda

### Color System
```css
--bg-primary: #0b0f19              /* Deep blue-black */
--bg-secondary: rgba(255,255,255,0.06)  /* Glass panels */
--text-primary: rgba(255,255,255,0.92)  /* High contrast text */
--accent: #4ECDC4                  /* Teal accent (unchanged) */
```

### Background Layers
1. Radial gradient at top-left (15% brightness)
2. Radial gradient at top-right (8% brightness)
3. Linear gradient base (dark blue progression)

### Tag Categories
- **Family** - Teal background
- **Work** - Red background
- **Kids** - Yellow background
- **Food** - Orange background
- **Home** - Purple background
- **Holiday** - Brown background
- **Travel** - Sky blue background

---

## 🔧 How to Use

### Standard Views (Unchanged)
1. **Weekly Tactical View** - Current week with morning/afternoon/evening blocks
2. **Active Grids** - Two-month calendar grids for detail
3. **Horizon List** - Future 4 months for long-range planning

### New: Detailed Week View
1. Click **"📋 Hourly Detail"** button in the weekly section
2. See hour-by-hour breakdown of the entire week
3. Multiple events per time slot
4. Scroll horizontally if needed (mobile)
5. Click outside or **×** to close

---

## 📝 Data Structure Guide

### Basic Events (Strategic Layer)
```javascript
{
  date: "2025-12-25",
  title: "🎄 Christmas Day",
  category: "holiday",
  priority: "high",
  time: "all-day"
}
```

### Detailed Week Events (Tactical Layer)
```javascript
detailedWeeks: {
  "2025-12-15": {  // Week start date (Sunday)
    timeBlocks: [
      "Early morning",
      "Morning",
      "Midday",
      "Afternoon",
      "Evening",
      "Late evening",
      "Night"
    ],
    days: [
      {
        date: "2025-12-17",
        dayName: "Wed",
        blocks: {
          "Morning": [
            { 
              time: "9:00–12:00", 
              title: "Deep work block", 
              category: "work" 
            }
          ],
          "Evening": [
            { 
              time: "6:00–7:00", 
              title: "Dinner prep", 
              category: "food",
              focus: true  // Optional: highlight this event
            }
          ]
        }
      }
    ]
  }
}
```

---

## 🚀 Adding Detailed Week Data

To add hourly detail for a specific week:

1. **Determine the Week Start Date** (always a Sunday)
   ```javascript
   "2025-12-15"  // Example: Week of Dec 15-21
   ```

2. **Define Time Blocks** (or use defaults)
   ```javascript
   timeBlocks: [
     "Early morning",  // 6-9am
     "Morning",        // 9am-12pm
     "Midday",         // 12-2pm
     "Afternoon",      // 2-5pm
     "Evening",        // 5-8pm
     "Late evening",   // 8-10pm
     "Night"           // 10pm+
   ]
   ```

3. **Add Events for Each Day/Block**
   - Create a `days` array with 7 days (Sun-Sat)
   - Each day has a `blocks` object
   - Each block contains an array of events

---

## 🎯 Best Practices

### When to Use Strategic vs. Tactical
- **Strategic Layer** (Regular Events)
  - Important dates and milestones
  - Travel and holidays
  - Birthdays and celebrations
  - School events
  - Anything you want visible in monthly grids

- **Tactical Layer** (Detailed Weeks)
  - Hour-by-hour schedules
  - Busy weeks (holidays, trips)
  - Time-sensitive coordination
  - Multiple overlapping activities
  - When you need to "see everything"

### Data Management
- Keep strategic events lean and scannable
- Add tactical detail only for special weeks
- Use `focus: true` for the most important items
- Let empty blocks breathe (don't over-schedule)

---

## 🔐 Privacy & Philosophy

**Nothing has changed:**
- Still 100% local execution
- No cloud accounts
- No tracking
- Data lives in `data.js`
- "Save Data" button creates JSON backups

**The Homesteader Ethos:**
- Plain JavaScript (no frameworks)
- Single-file components where possible
- Readable, maintainable code
- No build steps required
- Copy files and go

---

## 📱 Mobile Optimization

- Weekly view stacks vertically on mobile
- Detailed week modal scrolls horizontally
- Sticky headers stay visible when scrolling
- Touch-friendly tap targets
- Responsive grid layouts

---

## 🎨 Customization

### Change Colors
Edit `:root` variables in `styles.css`:
```css
:root {
  --accent: #YOUR_COLOR;  /* Main accent color */
  --bg-primary: #YOUR_BG;  /* Background */
  /* etc. */
}
```

### Add New Categories
In `data.js`:
```javascript
categories: {
  yourCategory: { 
    color: "#HEX_CODE", 
    icon: "🔥", 
    label: "Your Label" 
  }
}
```

### Customize Time Blocks
Change `timeBlocks` array in any `detailedWeeks` entry to match your schedule.

---

## 🔄 Migration from Original HOMEC

Your existing data structure is **100% compatible**. The enhancements are additive:

1. Copy your existing `data.js` events
2. (Optional) Add `detailedWeeks` object for special weeks
3. Copy new files over old ones
4. Done!

**What's preserved:**
- All existing events
- Meal planning data
- Routines (daily & weekly)
- Categories
- The rolling 6-month window

**What's added:**
- Enhanced visual design
- Detailed week capability
- Tag system
- Focus indicators
- Better mobile support

---

## 🛠️ Troubleshooting

### "No detailed hourly data available"
This is normal! Detailed week view is optional. Add a `detailedWeeks` entry in `data.js` for weeks you want to see hour-by-hour.

### Detailed modal cuts off on mobile
Scroll horizontally within the table. The time column stays sticky.

### Categories not showing colors
Make sure the category name in your event matches exactly with the key in `categories` object.

---

## 📈 Future Enhancements (Ideas)

- [ ] Day-by-day mobile navigation pills
- [ ] Print-optimized detailed week view
- [ ] Recipe cards section (like Agenda's gingerbread loaf)
- [ ] Week-over-week comparison view
- [ ] Export detailed week to PDF
- [ ] Recurring event templates

---

## 💡 Philosophy: "Clear Mind, Clear Space"

HOMEC remains true to its core mission:
1. **Tactical Clarity** - High detail for the immediate future
2. **Strategic Awareness** - See what's coming without noise
3. **Digital Sovereignty** - Your data, your control

The detailed week view extends this philosophy:
- Use it when you need precision
- Hide it when you need perspective
- Always stay in control

---

## 📄 License & Credits

Built by Jeff, enhanced with AI assistance.

**Inspiration:**
- HOMEC core: Strategic horizon planning
- Agenda influence: Tactical hour-by-hour execution
- Combined approach: The best of both worlds

**Tech Stack:**
- Vanilla JavaScript (ES6)
- CSS3 with custom properties
- HTML5 semantic markup
- Zero dependencies
- Zero build process

---

## 🎉 Version History

### v3.0 (Enhanced) - December 2025
- Complete visual overhaul with Agenda aesthetics
- Added detailed week view functionality
- Enhanced data structure for tactical scheduling
- Improved category system with tags
- Better mobile responsiveness
- Focus event indicators

### v2.4 - December 2025
- Original HOMEC with weekly view
- Monthly grids
- Horizon list
- Meal planning integration

---

**Built for the prepared mind. Enhanced for the tactical day.**
