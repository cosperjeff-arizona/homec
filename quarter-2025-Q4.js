// HOMEC - Family Calendar System
// Quarter 4, 2025 (October - December)
// Generated: November 30, 2025
// Focus: December detailed planning with holiday coordination

const quarterData = {
  meta: {
    quarter: "Q4",
    year: 2025,
    span: "October - December 2025",
    generated: "2025-11-30",
    family: {
      adults: 2,
      kids: [
        { name: "Spidey", birthdate: "2022-03-23", age: 3, school: "Preschool (5 days/week)" },
        { name: "Trace-E", birthdate: "2025-06-25", age: 0, care: "Home until February 2026" }
      ],
      members: {
        spin: { birthdate: "1987-01-05" },
        ghostSpider: { birthdate: "1988-05-03" }
      }
    },
    location: "Phoenix, AZ"
  },

  // Major events that anchor the quarter
  anchors: [
    {
      id: "christmas-main",
      title: "Christmas at Ghost Spider's Parents",
      date: "2025-12-25",
      category: "holiday",
      type: "family-gathering",
      allDay: true,
      notes: "Main Christmas celebration",
      prepDeadline: "2025-12-20",
      prepTasks: ["Wrap gifts", "Prepare dish to bring", "Pack diaper bag for both kids"]
    },
    {
      id: "boxing-day",
      title: "Day with Spin's Parents & Brother",
      date: "2025-12-26",
      category: "family",
      type: "family-gathering",
      allDay: true,
      notes: "Post-Christmas family time"
    },
    {
      id: "tucson-trip",
      title: "Tucson Weekend Trip",
      start: "2025-12-12",
      end: "2025-12-16",
      category: "travel",
      type: "family-trip",
      details: {
        friday: "Spin & Spidey leave Phoenix",
        saturday: "Full day in Tucson (all family)",
        sunday: "Spin & Spidey return to Phoenix",
        monday: "Ghost Spider & Trace-E stay in Tucson",
        tuesday: "Ghost Spider & Trace-E return to Phoenix"
      },
      prepDeadline: "2025-12-10",
      prepTasks: [
        "Pack bags for Spidey (3 days)",
        "Pack bags for Trace-E (4 days)", 
        "Prepare formula/bottles for Trace-E",
        "Load car with travel gear",
        "Arrange work coverage for Spin (Mon-Tue)"
      ],
      notes: "Split return schedule - plan accordingly"
    },
    {
      id: "date-night-christmas",
      title: "Pre-Christmas Date Night",
      date: "2025-12-20",
      category: "family",
      type: "aspirational",
      time: "evening",
      status: "planned",
      prepTasks: ["Arrange babysitter", "Make restaurant reservation"],
      notes: "Important to get this scheduled before holiday chaos"
    },
    {
      id: "nye",
      title: "New Year's Eve",
      date: "2025-12-31",
      category: "holiday",
      type: "tbd",
      status: "uncertain",
      notes: "Plans TBD - placeholder to ensure we decide"
    }
  ],

  // Recurring weekly/monthly patterns
  recurring: {
    weekly: [
      {
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        time: "7:30 AM - 4:00 PM",
        title: "Spidey at Preschool",
        category: "kid",
        type: "childcare"
      },
      {
        day: "tuesday",
        time: "all-day",
        title: "Spin in Office",
        category: "work",
        type: "work-commitment"
      },
      {
        day: "saturday",
        time: "evening",
        title: "Meal Planning Session",
        category: "household",
        type: "routine",
        duration: "1-2 hours"
      },
      {
        day: "saturday",
        time: "morning",
        title: "Niece's Basketball",
        category: "family",
        type: "kid-activity",
        notes: "If attending"
      },
      {
        days: ["wednesday", "saturday"],
        time: "flexible",
        title: "Laundry Day",
        category: "household",
        type: "routine"
      }
    ]
  },

  // Month-by-month events
  months: {
    october: {
      monthName: "October 2025",
      status: "past",
      summary: "Month complete - Q4 started",
      weeks: []
    },

    november: {
      monthName: "November 2025",
      status: "mostly-complete",
      summary: "Thanksgiving completed, focusing on December planning",
      weeks: [
        {
          weekOf: "2025-11-24",
          weekNumber: 48,
          summary: "Thanksgiving week",
          events: [
            {
              id: "thanksgiving",
              date: "2025-11-27",
              title: "Thanksgiving",
              category: "holiday",
              status: "complete"
            }
          ]
        }
      ]
    },

    december: {
      monthName: "December 2025",
      
      weeks: [
        {
          weekOf: "2025-12-01",
          weekNumber: 49,
          theme: "Holiday prep begins",
          
          events: [
            {
              id: "dec-01",
              date: "2025-12-01",
              dayOfWeek: "monday",
              time: "7:30 AM - 4:00 PM",
              title: "Spidey at Preschool",
              category: "kid",
              type: "recurring",
              recurring: true
            },
            {
              id: "dec-02",
              date: "2025-12-02",
              dayOfWeek: "tuesday",
              time: "all-day",
              title: "Spin in Office",
              category: "work",
              type: "recurring",
              recurring: true
            },
            {
              id: "dec-03",
              date: "2025-12-03",
              dayOfWeek: "wednesday",
              time: "flexible",
              title: "Laundry Day",
              category: "household",
              type: "recurring",
              recurring: true
            },
            {
              id: "dec-06",
              date: "2025-12-06",
              dayOfWeek: "saturday",
              time: "morning",
              title: "Niece's Basketball",
              category: "family",
              type: "recurring",
              recurring: true
            },
            {
              id: "dec-06-meal",
              date: "2025-12-06",
              dayOfWeek: "saturday",
              time: "evening",
              title: "Meal Planning Session",
              category: "household",
              type: "recurring",
              recurring: true
            },
            {
              id: "dec-06-laundry",
              date: "2025-12-06",
              dayOfWeek: "saturday",
              time: "flexible",
              title: "Laundry Day",
              category: "household",
              type: "recurring",
              recurring: true
            },
            {
              id: "gift-shopping-start",
              date: "2025-12-07",
              dayOfWeek: "sunday",
              time: "afternoon",
              title: "Start Holiday Shopping",
              category: "household",
              type: "aspirational",
              priority: "medium",
              prepTasks: ["Make gift list", "Set budget", "Research ideas"],
              notes: "Get ahead of the rush"
            }
          ],
          
          analysis: {
            totalEvents: 12,
            eveningCommitments: 1,
            weekendEvents: 3,
            prepTaskCount: 3,
            busyScore: "medium"
          }
        },

        {
          weekOf: "2025-12-08",
          weekNumber: 50,
          theme: "Pre-Tucson prep week",
          
          events: [
            {
              id: "dec-09",
              date: "2025-12-09",
              dayOfWeek: "tuesday",
              time: "all-day",
              title: "Spin in Office",
              category: "work",
              type: "recurring",
              recurring: true
            },
            {
              id: "dec-10",
              date: "2025-12-10",
              dayOfWeek: "wednesday",
              time: "flexible",
              title: "Laundry Day",
              category: "household",
              type: "recurring",
              recurring: true
            },
            {
              id: "tucson-prep-deadline",
              date: "2025-12-10",
              dayOfWeek: "wednesday",
              time: "evening",
              title: "Tucson Trip Prep Deadline",
              category: "travel",
              type: "deadline",
              priority: "high",
              prepTasks: [
                "Pack Spidey's bag (clothes, toys, meds)",
                "Pack Trace-E's bag (diapers, formula, clothes)",
                "Load car with travel gear",
                "Confirm work coverage Mon-Tue"
              ],
              notes: "All packing should be done tonight - leaving Friday morning"
            },
            {
              id: "dec-13",
              date: "2025-12-13",
              dayOfWeek: "saturday",
              time: "morning",
              title: "Niece's Basketball",
              category: "family",
              type: "recurring",
              recurring: true,
              conflict: true,
              conflictNote: "IN TUCSON - will miss this week"
            },
            {
              id: "dec-13-meal",
              date: "2025-12-13",
              dayOfWeek: "saturday",
              time: "evening",
              title: "Meal Planning Session",
              category: "household",
              type: "recurring",
              recurring: true,
              notes: "May need to do early or skip - in Tucson"
            }
          ],
          
          analysis: {
            totalEvents: 10,
            eveningCommitments: 2,
            weekendEvents: 2,
            prepTaskCount: 8,
            busyScore: "high",
            conflicts: [
              {
                issue: "Tucson trip spans weekend - affects Saturday routines",
                severity: "medium"
              }
            ]
          }
        },

        {
          weekOf: "2025-12-15",
          weekNumber: 51,
          theme: "Return from Tucson, Christmas prep ramps up",
          
          events: [
            {
              id: "tucson-return-spin",
              date: "2025-12-14",
              dayOfWeek: "sunday",
              time: "afternoon",
              title: "Spin & Spidey Return from Tucson",
              category: "travel",
              type: "milestone",
              notes: "Ghost Spider & Trace-E staying through Tuesday"
            },
            {
              id: "dec-15",
              date: "2025-12-15",
              dayOfWeek: "monday",
              time: "7:30 AM - 4:00 PM",
              title: "Spidey at Preschool",
              category: "kid",
              type: "recurring",
              recurring: true
            },
            {
              id: "dec-16-office",
              date: "2025-12-16",
              dayOfWeek: "tuesday",
              time: "all-day",
              title: "Spin in Office",
              category: "work",
              type: "recurring",
              recurring: true,
              notes: "Solo parenting Spidey (Ghost Spider returns afternoon)"
            },
            {
              id: "tucson-return-gs",
              date: "2025-12-16",
              dayOfWeek: "tuesday",
              time: "afternoon",
              title: "Ghost Spider & Trace-E Return from Tucson",
              category: "travel",
              type: "milestone",
              notes: "Family reunited!"
            },
            {
              id: "dec-17",
              date: "2025-12-17",
              dayOfWeek: "wednesday",
              time: "flexible",
              title: "Laundry Day",
              category: "household",
              type: "recurring",
              recurring: true,
              notes: "Catch up from trip laundry"
            },
            {
              id: "gift-wrap-session",
              date: "2025-12-18",
              dayOfWeek: "thursday",
              time: "evening",
              title: "Gift Wrapping Session",
              category: "household",
              type: "deadline",
              priority: "high",
              prepTasks: ["Gather all gifts", "Get wrapping supplies", "Hide from kids"],
              notes: "Must be done before date night Friday"
            },
            {
              id: "dec-19-preschool-last",
              date: "2025-12-19",
              dayOfWeek: "friday",
              time: "7:30 AM - 4:00 PM",
              title: "Spidey at Preschool - LAST DAY",
              category: "kid",
              type: "milestone",
              notes: "Winter break starts after today - school closed through Jan 5"
            },
            {
              id: "date-night",
              date: "2025-12-20",
              dayOfWeek: "saturday",
              time: "evening",
              title: "Pre-Christmas Date Night ❤️",
              category: "family",
              type: "aspirational",
              priority: "high",
              prepTasks: [
                "Confirm babysitter by Dec 15",
                "Make restaurant reservation",
                "Prep instructions for sitter"
              ],
              notes: "PROTECTED TIME - don't schedule over this"
            },
            {
              id: "dec-20-meal",
              date: "2025-12-20",
              dayOfWeek: "saturday",
              time: "afternoon",
              title: "Meal Planning Session",
              category: "household",
              type: "recurring",
              recurring: true,
              notes: "Do earlier than usual - date night in evening"
            },
            {
              id: "dec-20-laundry",
              date: "2025-12-20",
              dayOfWeek: "saturday",
              time: "morning",
              title: "Laundry Day",
              category: "household",
              type: "recurring",
              recurring: true
            },
            {
              id: "christmas-prep-final",
              date: "2025-12-21",
              dayOfWeek: "sunday",
              time: "all-day",
              title: "Final Christmas Prep Day",
              category: "household",
              type: "deadline",
              priority: "high",
              prepTasks: [
                "Cook/prep dish for Christmas",
                "Pack bags for Ghost Spider's parents",
                "Charge all devices/cameras",
                "Gas up car"
              ],
              notes: "Last day to get organized before Christmas week"
            }
          ],
          
          analysis: {
            totalEvents: 16,
            eveningCommitments: 3,
            weekendEvents: 5,
            prepTaskCount: 12,
            busyScore: "high",
            conflicts: []
          }
        },

        {
          weekOf: "2025-12-22",
          weekNumber: 52,
          theme: "CHRISTMAS WEEK 🎄",
          
          events: [
            {
              id: "dec-22",
              date: "2025-12-22",
              dayOfWeek: "monday",
              time: "all-day",
              title: "Spidey Home - Winter Break",
              category: "kid",
              type: "info",
              notes: "Preschool closed Dec 19 - Jan 5"
            },
            {
              id: "dec-23",
              date: "2025-12-23",
              dayOfWeek: "tuesday",
              time: "all-day",
              title: "Spin Working from Home",
              category: "work",
              type: "modified-recurring",
              notes: "WFH instead of office - Spidey home from school"
            },
            {
              id: "dec-24",
              date: "2025-12-24",
              dayOfWeek: "wednesday",
              time: "evening",
              title: "Christmas Eve",
              category: "holiday",
              type: "family-time",
              notes: "Low-key evening at home, early bedtime for kids"
            },
            {
              id: "christmas",
              date: "2025-12-25",
              dayOfWeek: "thursday",
              time: "all-day",
              title: "🎄 Christmas at Ghost Spider's Parents",
              category: "holiday",
              type: "family-gathering",
              priority: "high",
              allDay: true,
              notes: "Main Christmas celebration"
            },
            {
              id: "boxing-day-family",
              date: "2025-12-26",
              dayOfWeek: "friday",
              time: "all-day",
              title: "Day with Spin's Parents & Brother",
              category: "family",
              type: "family-gathering",
              allDay: true,
              notes: "Post-Christmas family time"
            },
            {
              id: "dec-27",
              date: "2025-12-27",
              dayOfWeek: "saturday",
              time: "all-day",
              title: "Recovery Day",
              category: "family",
              type: "downtime",
              notes: "Rest after holiday chaos, low-key day at home"
            },
            {
              id: "dec-27-meal",
              date: "2025-12-27",
              dayOfWeek: "saturday",
              time: "evening",
              title: "Meal Planning Session",
              category: "household",
              type: "recurring",
              recurring: true,
              notes: "Plan for NYE week"
            },
            {
              id: "dec-28",
              date: "2025-12-28",
              dayOfWeek: "sunday",
              time: "flexible",
              title: "Decompress & Organize",
              category: "household",
              type: "aspirational",
              prepTasks: ["Put away new toys/gifts", "Start thank-you notes", "Reset house"],
              notes: "Transition back to normal routines"
            }
          ],
          
          analysis: {
            totalEvents: 8,
            eveningCommitments: 1,
            weekendEvents: 2,
            prepTaskCount: 3,
            busyScore: "extreme",
            conflicts: [],
            warning: "HOLIDAY WEEK - lots of family time, minimal normal routine"
          }
        },

        {
          weekOf: "2025-12-29",
          weekNumber: 1,
          theme: "New Year's Week",
          
          events: [
            {
              id: "dec-29",
              date: "2025-12-29",
              dayOfWeek: "monday",
              time: "all-day",
              title: "Spidey Home - Winter Break",
              category: "kid",
              type: "info",
              notes: "Preschool closed through Jan 5 - resumes Jan 6"
            },
            {
              id: "dec-30",
              date: "2025-12-30",
              dayOfWeek: "tuesday",
              time: "all-day",
              title: "Spin Working from Home",
              category: "work",
              type: "modified-recurring",
              notes: "WFH - Spidey still home"
            },
            {
              id: "nye",
              date: "2025-12-31",
              dayOfWeek: "wednesday",
              time: "evening",
              title: "🎉 New Year's Eve",
              category: "holiday",
              type: "tbd",
              status: "uncertain",
              priority: "medium",
              notes: "Plans TBD - decide by mid-December",
              prepTasks: ["Decide: going out vs staying home?", "If going out: arrange sitter", "If staying home: plan special family activity"]
            }
          ],
          
          analysis: {
            totalEvents: 3,
            eveningCommitments: 1,
            weekendEvents: 0,
            prepTaskCount: 3,
            busyScore: "medium",
            conflicts: [],
            lookingAhead: "Q1 2026 starts - Spidey back to school Jan 5, Trace-E starts daycare in February"
          }
        }
      ],

      // December-level milestones
      milestones: [
        {
          date: "2025-12-12",
          title: "Tucson Trip Begins",
          category: "travel",
          icon: "🚗"
        },
        {
          date: "2025-12-19",
          title: "Winter Break Starts",
          category: "kid",
          icon: "🎄"
        },
        {
          date: "2025-12-25",
          title: "Christmas Day",
          category: "holiday",
          icon: "🎁"
        }
      ],

      // Aspirational items for December
      aspirational: [
        {
          id: "asp-001",
          title: "Pre-Christmas Date Night",
          category: "family",
          timeNeeded: "3-4 hours",
          targetDate: "2025-12-20",
          status: "scheduled",
          priority: "high"
        },
        {
          id: "asp-002",
          title: "Take Spidey to see Christmas Lights",
          category: "family",
          timeNeeded: "1-2 hours",
          idealWeek: "early December",
          status: "unscheduled",
          weatherDependent: false,
          notes: "Zoo Lights or neighborhood drive"
        },
        {
          id: "asp-003",
          title: "Bake Christmas Cookies with Spidey",
          category: "family",
          timeNeeded: "2 hours",
          idealWeek: "mid-December",
          status: "unscheduled",
          notes: "Simple sugar cookies he can help decorate"
        },
        {
          id: "asp-004",
          title: "Year-End Photo Organization",
          category: "household",
          timeNeeded: "3-4 hours",
          idealWeek: "late December",
          status: "unscheduled",
          priority: "low",
          notes: "While on break, organize 2025 photos"
        }
      ]
    }
  },

  // Detected conflicts across the quarter
  conflicts: [
    {
      id: "conflict-001",
      dates: ["2025-12-13"],
      issue: "Niece's basketball conflicts with Tucson trip",
      affectedEvents: ["dec-13", "tucson-trip"],
      severity: "low",
      resolution: "Will miss this week's game - not critical",
      resolved: true
    },
    {
      id: "conflict-002",
      dates: ["2025-12-16"],
      issue: "Ghost Spider returns same day Spin is in office",
      affectedEvents: ["dec-16-office", "tucson-return-gs"],
      severity: "medium",
      suggestions: [
        "Spin works from home on Tuesday",
        "Ghost Spider times return for after 4pm",
        "Arrange backup childcare for Trace-E if needed"
      ],
      resolved: false
    }
  ],

  // Prep aggregation (all prep tasks in order)
  prep: {
    immediate: [
      {
        deadline: "2025-12-10",
        task: "Pack for Tucson trip (both kids)",
        category: "travel",
        priority: "high"
      },
      {
        deadline: "2025-12-15",
        task: "Confirm date night babysitter",
        category: "family",
        priority: "high"
      }
    ],
    thisMonth: [
      {
        deadline: "2025-12-18",
        task: "Wrap all Christmas gifts",
        category: "household",
        priority: "high"
      },
      {
        deadline: "2025-12-20",
        task: "Make date night restaurant reservation",
        category: "family",
        priority: "medium"
      },
      {
        deadline: "2025-12-21",
        task: "Prepare dish for Christmas",
        category: "household",
        priority: "high"
      },
      {
        deadline: "2025-12-15",
        task: "Decide on NYE plans",
        category: "holiday",
        priority: "medium"
      }
    ]
  },

  // Categories and their styling
  categories: {
    family: {
      color: "#4ECDC4",
      icon: "👨‍👩‍👧‍👦",
      label: "Family"
    },
    work: {
      color: "#FF6B6B",
      icon: "💼",
      label: "Work"
    },
    kid: {
      color: "#FFE66D",
      icon: "🎨",
      label: "Kids"
    },
    household: {
      color: "#95E1D3",
      icon: "🏡",
      label: "Household"
    },
    holiday: {
      color: "#DDA15E",
      icon: "🎊",
      label: "Holiday"
    },
    travel: {
      color: "#87CEEB",
      icon: "✈️",
      label: "Travel"
    },
    health: {
      color: "#FFA07A",
      icon: "🏥",
      label: "Health"
    }
  }
};

window.quarterData = quarterData;
