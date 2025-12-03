Markdown

# HOMEC - Family Command Center

**A privacy-first, rolling 6-month dashboard for family situational awareness.**

HOMEC (Home Operations & Management / Electronic Calendar) is a custom-built web application designed to replace scattered digital calendars with a single, "at-a-glance" dashboard. It prioritizes clarity, privacy, and local control.

## 🧠 The Philosophy: "Clear Mind, Clear Space"

Most calendar apps bury the future in hidden tabs or clutter the present with irrelevant distant dates. HOMEC solves this by adopting a **Rolling Horizon** approach:

1.  **Tactical Clarity (The Now):** We need high detail for the immediate future (Current + Next Month).
2.  **Strategic Awareness (The Horizon):** We need to see "what's coming" (Months 3–6) without the visual noise of empty grids.
3.  **Digital Sovereignty:** No cloud accounts, no tracking, no external servers. Data lives in a local JavaScript file.

---

## 🖥️ The Dashboard Layout

The interface is divided into two distinct functional zones:

### 1. The Active Zone (Months 1 & 2)
* **Format:** Side-by-side interactive calendar grids.
* **Purpose:** Detailed daily management, recurring routines, and immediate logistics.
* **Features:**
    * Full event titles with text wrapping.
    * Color-coded categories (Family, Work, Kids, Travel, etc.).
    * High-priority visual indicators.

### 2. The Horizon Zone (Months 3, 4, 5, & 6)
* **Format:** A streamlined, chronological timeline list.
* **Purpose:** Long-range planning and "calendar shock" prevention.
* **Features:**
    * Filters out daily noise (like laundry or school drop-offs).
    * Highlights only **Milestones**, **Holidays**, and **High Priority** events.
    * Allows you to see a major trip or birthday approaching from months away.

---

## 📂 Project Structure

The project uses a clean, framework-free architecture.

```text
homec/
├── index.html              # The dashboard skeleton
├── data.js                 # The database (Single source of truth)
├── js/
│   └── app.js              # Logic: Renders grids and lists based on array index
├── styles/
│   └── styles.css          # Styling: Dark theme, CSS Grid, Responsive layout
└── README.md               # Documentation
⚙️ The Workflow: "The Monthly Ritual"
Unlike static calendars, HOMEC is a living system. It requires a brief "gardening" session at the start of every month to roll the horizon forward.

The Process (e.g., On January 1st):

Open data.js in your code editor.

Delete the first month object in the months array (the December that just passed).

Add a new month object to the end of the months array (June).

Save the file.

The Result: Instantly, January slides left to become the first grid, February becomes the second grid, and June appears at the bottom of the Horizon list.

📝 Data Structure
All data is stored in data.js as a global window object.

JavaScript

window.calendarData = {
  meta: { generated: "2025-12-03" },
  
  // The Rolling Array
  // Indices [0, 1] render as GRIDS
  // Indices [2, 3, 4, 5] render as LISTS
  months: [
    {
      id: "2025-12",
      name: "December 2025",
      events: [
        { 
          date: "2025-12-25", 
          title: "Christmas", 
          category: "holiday", 
          priority: "high" 
        }
      ]
    },
    // ... January, February, March, April, May ...
  ],

  categories: {
    family: { color: "#4ECDC4", icon: "👨‍👩‍👧‍👦" },
    work:   { color: "#FF6B6B", icon: "💼" },
    kid:    { color: "#FFE66D", icon: "🎨" }
    // ...
  }
};
🎨 Customization & Tech Stack
Tech: Vanilla JavaScript (ES6), HTML5, CSS3. No Node.js, React, or build steps required.

Styling: Uses CSS Variables for easy theming.

To change colors: Edit :root variables in styles/styles.css.

Responsive: automatically stacks grids vertically on mobile devices for easy phone access.

🔒 Privacy & Security
Local Execution: All code runs in the client's browser.

No Persistence: By default, data is read-only from data.js.

Save Feature: The "Save Data" button creates a JSON download of the current state, ensuring you never lose data even if you clear your browser cache.

Built for the prepared mind.
