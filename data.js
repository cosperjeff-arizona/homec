// HOMEC - Rolling 6-Month Data (Enhanced Edition)
// Current Window: December 2025 - June 2026
// Generated: December 17, 2025

const calendarData = {
  meta: {
    generated: "2025-12-17",
    version: "3.0-enhanced"
  },

  // The 6-month window (Index 0-1 = Grids, Index 2-5 = Horizon List)
  months: [
    {
      id: "2025-12",
      name: "December 2025",
      events: [
        // RECURRING
        { date: "2025-12-02", title: "Spin in Office", category: "work", time: "all-day" },
        { date: "2025-12-05", title: "🎅 Visit Santa & Dinner at Biltmore", category: "family", priority: "high", time: "evening" },
        { date: "2025-12-06", title: "Niece's Basketball", category: "family", time: "morning" },
        
        // SPECIAL EVENTS
        { date: "2025-12-07", title: "Start Holiday Shopping", category: "household", priority: "medium" },
        { date: "2025-12-10", title: "Tucson Trip Prep Deadline", category: "travel", priority: "high" },
        { date: "2025-12-11", title: "🚗 Tucson Trip Begins", category: "travel", priority: "high", time: "all-day" },
        { date: "2025-12-13", title: "Tucson - Family Day", category: "travel", time: "all-day" },
        { date: "2025-12-14", title: "🏃‍♀️ Aunt Mel's Half Marathon", category: "family", priority: "high", time: "morning" },
        { date: "2025-12-14", title: "Spin & Spidey Return", category: "travel", time: "afternoon" },
        { date: "2025-12-16", title: "Ghost Spider Returns", category: "travel", time: "afternoon" },
        { date: "2025-12-18", title: "Gift Wrapping Session", category: "household", priority: "high", time: "evening" },
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
        { date: "2026-03-23", title: "🎂 Spidey's 4th Birthday", category: "family", priority: "high" }
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
    },
    {
      id: "2026-06",
      name: "June 2026",
      events: [
        { date: "2026-06-25", title: "🎂 Trace-E's Birthday", category: "family", priority: "high" }
      ]
    }
  ],

  // ENHANCED: Hourly/Detailed Events for Tactical Week View
  detailedWeeks: {
    "2025-12-15": { // Week starting Dec 15, 2025
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
            "Early morning": [
              { time: "7:00", title: "Possible preschool drop-off", category: "family" },
              { time: "7:30–9:00", title: "Commute & settle into office", category: "work" }
            ],
            "Morning": [
              { time: "9:00–12:00", title: "Deep work block", category: "work" }
            ],
            "Midday": [
              { time: "12:00–1:00", title: "Lunch break", category: "personal" }
            ],
            "Afternoon": [
              { time: "1:00–4:00", title: "Meetings & collaboration", category: "work" }
            ],
            "Evening": [
              { time: "5:30–6:30", title: "Dinner prep & family meal", category: "food" },
              { time: "6:30–7:30", title: "Bedtime routine", category: "family" }
            ],
            "Late evening": [
              { time: "7:30–9:00", title: "Bedtime", category: "family" },
              { time: "9:00–9:30", title: "Cleanup", category: "home" }
            ]
          }
        },
        {
          date: "2025-12-18",
          dayName: "Thu",
          blocks: {
            "Early morning": [
              { time: "7:00–7:30", title: "Preschool drop-off", category: "family" },
              { time: "7:30–9:00", title: "Work block", category: "work" }
            ],
            "Morning": [
              { time: "9:00–12:00", title: "Team collaboration", category: "work" }
            ],
            "Midday": [
              { time: "12:00–1:00", title: "Lunch", category: "personal" }
            ],
            "Afternoon": [
              { time: "2:00–3:00", title: "Preschool pickup", category: "family" },
              { time: "3:00–5:00", title: "Afternoon work", category: "work" }
            ],
            "Evening": [
              { time: "5:30–6:30", title: "Gift wrapping session", category: "household", focus: true },
              { time: "6:30–7:30", title: "Bedtime routine", category: "family" }
            ],
            "Late evening": [
              { time: "7:30–9:00", title: "Bedtime", category: "family" },
              { time: "9:00–9:30", title: "Cleanup", category: "home" }
            ]
          }
        }
      ]
    }
  },

  // Meal planning data
  meals: {
    "2025-11-30": { dinner: "🍗 Harvest Chicken Skillet" },
    "2025-12-01": { dinner: "🌭 Sausage & Pepper Sheet Pan" },
    "2025-12-02": { dinner: "🍚 Korean Beef Bowls" },
    "2025-12-03": { dinner: "🏊 Swim Lessons / Dining Out" },
    "2025-12-04": { dinner: "🌮 Classic Ground Beef Tacos" },
    "2025-12-05": { dinner: "🍔 Smashburgers & Oven Fries" },
    "2025-12-06": { dinner: "🥡 Leftovers / Flow" }
  },

  // Daily and weekly routines
  routines: {
    "daily": [
      { title: "Empty Dishwasher", time: "morning" },
      { title: "10m Tidy Up", time: "evening" }
    ],
    "weekly": {
      "0": [ // Sunday
        { title: "Batch Cook Muffins", time: "afternoon" },
        { title: "Prep Veggies (Peppers/Onions)", time: "afternoon" }
      ],
      "1": [ // Monday
        { title: "Preschool Dropoff", time: "morning" },
        { title: "Trace-E Swim Lesson (1pm)", time: "afternoon" },
        { title: "Preschool Pickup", time: "afternoon" },
        { title: "Cook Dinner", time: "evening" }
      ],
      "2": [ // Tuesday
        { title: "Preschool Dropoff", time: "morning" },
        { title: "Preschool Pickup", time: "afternoon" },
        { title: "Trash to Curb", time: "evening" },
        { title: "Cook Dinner", time: "evening" }
      ],
      "3": [ // Wednesday
        { title: "Preschool Dropoff", time: "morning" },
        { title: "Preschool Pickup", time: "afternoon" },
        { title: "Spidey Swim Lesson (5pm)", time: "afternoon" },
        { title: "Cook Dinner", time: "evening" }
      ],
      "4": [ // Thursday
        { title: "Preschool Dropoff", time: "morning" },
        { title: "Preschool Pickup", time: "afternoon" },
        { title: "Cook Dinner", time: "evening" }
      ],
      "5": [ // Friday
        { title: "Preschool Dropoff", time: "morning" },
        { title: "Preschool Pickup", time: "afternoon" },
        { title: "Cook Dinner", time: "evening" }
      ]
    }
  },

  // ENHANCED: Category definitions with icons and colors
  categories: {
    family: { color: "#4ECDC4", icon: "👨‍👩‍👧‍👦", label: "Family" },
    work: { color: "#FF6B6B", icon: "💼", label: "Work" },
    kid: { color: "#FFE66D", icon: "🎨", label: "Kids" },
    household: { color: "#95E1D3", icon: "🏡", label: "Household" },
    holiday: { color: "#DDA15E", icon: "🎊", label: "Holiday" },
    travel: { color: "#87CEEB", icon: "✈️", label: "Travel" },
    food: { color: "#FFB347", icon: "🍽️", label: "Food" },
    home: { color: "#C3B1E1", icon: "🏠", label: "Home" },
    personal: { color: "#A0D2DB", icon: "⭐", label: "Personal" }
  }
};

window.calendarData = calendarData;
