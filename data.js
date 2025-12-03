// HOMEC - Rolling 6-Month Data
// Current Window: December 2025 - May 2026
// Generated: December 3, 2025

const calendarData = {
  meta: {
    generated: "2025-12-03",
    version: "2.0-rolling"
  },

  // The 6-month window (Index 0-1 = Grids, Index 2-5 = Horizon List)
  months: [
    {
      id: "2025-12",
      name: "December 2025",
      events: [
        // RECURRING
        { date: "2025-12-01", title: "Spidey at Preschool", category: "kid", time: "7:30 AM" },
        { date: "2025-12-02", title: "Spin in Office", category: "work", time: "all-day" },
        { date: "2025-12-06", title: "Niece's Basketball", category: "family", time: "morning" },
        
        // SPECIAL EVENTS
        { date: "2025-12-07", title: "Start Holiday Shopping", category: "household", priority: "medium" },
        { date: "2025-12-10", title: "Tucson Trip Prep Deadline", category: "travel", priority: "high" },
        { date: "2025-12-12", title: "🚗 Tucson Trip Begins", category: "travel", priority: "high", time: "all-day" },
        { date: "2025-12-13", title: "Tucson - Family Day", category: "travel", time: "all-day" },
        { date: "2025-12-14", title: "Spin & Spidey Return", category: "travel", time: "afternoon" },
        { date: "2025-12-16", title: "Ghost Spider Returns", category: "travel", time: "afternoon" },
        { date: "2025-12-18", title: "Gift Wrapping Session", category: "household", priority: "high", time: "evening" },
        { date: "2025-12-19", title: "Last Day of Preschool", category: "kid", type: "milestone" },
        { date: "2025-12-20", title: "❤️ Date Night", category: "family", priority: "high", time: "evening" },
        { date: "2025-12-25", title: "🎄 Christmas Day", category: "holiday", priority: "high", time: "all-day" },
        { date: "2025-12-31", title: "🎉 New Year's Eve", category: "holiday", time: "evening" }
      ]
    },
    {
      id: "2026-01",
      name: "January 2026",
      events: [
        { date: "2026-01-01", title: "New Year's Day", category: "holiday", time: "all-day" },
        { date: "2026-01-05", title: "Spidey Back to School", category: "kid", priority: "high" },
        { date: "2026-01-05", title: "🎂 Spin's Birthday", category: "family", priority: "high" },
        { date: "2026-01-19", title: "MLK Day (No School)", category: "kid", time: "all-day" },
        { date: "2026-01-24", title: "Monthly Meal Planning", category: "household", time: "morning" }
      ]
    },
    {
      id: "2026-02",
      name: "February 2026",
      events: [
        { date: "2026-02-01", title: "Trace-E Starts Daycare", category: "kid", priority: "high" },
        { date: "2026-02-14", title: "Valentine's Day", category: "family" },
        { date: "2026-02-16", title: "Presidents Day (No School)", category: "kid" }
      ]
    },
    {
      id: "2026-03",
      name: "March 2026",
      events: [
        { date: "2026-03-23", title: "🎂 Spidey's 4th Birthday", category: "family", priority: "high" },
        { date: "2026-03-30", title: "Spring Break Begins", category: "kid" }
      ]
    },
    {
      id: "2026-04",
      name: "April 2026",
      events: [
        { date: "2026-04-15", title: "Tax Deadline", category: "household", priority: "high" }
      ]
    },
    {
      id: "2026-05",
      name: "May 2026",
      events: [
        { date: "2026-05-03", title: "🎂 Ghost Spider's Birthday", category: "family", priority: "high" },
        { date: "2026-05-25", title: "Memorial Day", category: "holiday" }
      ]
    }
  ],

  categories: {
    family: { color: "#4ECDC4", icon: "👨‍👩‍👧‍👦", label: "Family" },
    work: { color: "#FF6B6B", icon: "💼", label: "Work" },
    kid: { color: "#FFE66D", icon: "🎨", label: "Kids" },
    household: { color: "#95E1D3", icon: "🏡", label: "Household" },
    holiday: { color: "#DDA15E", icon: "🎊", label: "Holiday" },
    travel: { color: "#87CEEB", icon: "✈️", label: "Travel" }
  }
};

window.calendarData = calendarData;