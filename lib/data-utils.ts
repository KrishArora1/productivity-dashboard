import type {
  TeamMember,
  SummaryMetrics,
  FilterOptions,
  TimeRange,
  DailyActivity,
  RoleDistribution,
  Task,
  TaskStatus,
} from "@/lib/types"

// Generate realistic team data with consistent values
export function generateTeamData(count: number): TeamMember[] {
  // Realistic team members with consistent data
  const teamMembers: TeamMember[] = [
    {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Alex&backgroundColor=b6e3f4&radius=50&gender=male",
      role: "Developer",
      productivityScore: 92,
      tasksCompleted: 32,
      totalTasks: 35,
      hoursLogged: 38,
      lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      // Add time-specific data with realistic work patterns
      dayData: { tasksCompleted: 8, totalTasks: 10, hoursLogged: 7.5, productivityScore: 90 },
      weekData: { tasksCompleted: 32, totalTasks: 35, hoursLogged: 38, productivityScore: 92 },
      monthData: { tasksCompleted: 32, totalTasks: 35, hoursLogged: 152, productivityScore: 92 },
      // Add contact information
      contactInfo: {
        email: "alex.johnson@company.com",
        phone: "+1 (555) 123-4567",
        department: "Engineering",
        location: "San Francisco, CA",
        manager: "Michael Chen",
        startDate: "2021-03-15",
        slackHandle: "@alexj",
        githubUsername: "alexjdev",
        linkedIn: "linkedin.com/in/alexjohnson",
      },
    },
    {
      id: "user-2",
      name: "Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Sarah&backgroundColor=ffdfbf&radius=50&gender=female",
      role: "Designer",
      productivityScore: 88,
      tasksCompleted: 24,
      totalTasks: 28,
      hoursLogged: 35,
      lastActive: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      // Add time-specific data
      dayData: { tasksCompleted: 6, totalTasks: 7, hoursLogged: 6.5, productivityScore: 85 },
      weekData: { tasksCompleted: 24, totalTasks: 28, hoursLogged: 35, productivityScore: 88 },
      monthData: { tasksCompleted: 24, totalTasks: 28, hoursLogged: 140, productivityScore: 88 },
      // Add contact information
      contactInfo: {
        email: "sarah.williams@company.com",
        phone: "+1 (555) 234-5678",
        department: "Design",
        location: "New York, NY",
        manager: "Emily Wilson",
        startDate: "2020-07-22",
        slackHandle: "@sarahw",
        linkedIn: "linkedin.com/in/sarahwilliams",
      },
    },
    {
      id: "user-3",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Michael&backgroundColor=c0aede&radius=50&gender=male",
      role: "Product Manager",
      productivityScore: 85,
      tasksCompleted: 20,
      totalTasks: 24,
      hoursLogged: 42,
      lastActive: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      // Add time-specific data
      dayData: { tasksCompleted: 5, totalTasks: 6, hoursLogged: 8, productivityScore: 83 },
      weekData: { tasksCompleted: 20, totalTasks: 24, hoursLogged: 42, productivityScore: 85 },
      monthData: { tasksCompleted: 20, totalTasks: 24, hoursLogged: 168, productivityScore: 85 },
      // Add contact information
      contactInfo: {
        email: "michael.chen@company.com",
        phone: "+1 (555) 345-6789",
        department: "Product",
        location: "Seattle, WA",
        manager: "Robert Smith",
        startDate: "2019-11-05",
        slackHandle: "@michaelc",
        linkedIn: "linkedin.com/in/michaelchen",
      },
    },
    {
      id: "user-4",
      name: "Jessica Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Jessica&backgroundColor=ffd5dc&radius=50&gender=female",
      role: "Developer",
      productivityScore: 78,
      tasksCompleted: 26,
      totalTasks: 32,
      hoursLogged: 32,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      // Add time-specific data
      dayData: { tasksCompleted: 4, totalTasks: 6, hoursLogged: 5.5, productivityScore: 70 },
      weekData: { tasksCompleted: 26, totalTasks: 32, hoursLogged: 32, productivityScore: 78 },
      monthData: { tasksCompleted: 26, totalTasks: 32, hoursLogged: 128, productivityScore: 78 },
      // Add contact information
      contactInfo: {
        email: "jessica.lee@company.com",
        phone: "+1 (555) 456-7890",
        department: "Engineering",
        location: "Austin, TX",
        manager: "Alex Johnson",
        startDate: "2022-01-10",
        slackHandle: "@jessical",
        githubUsername: "jesslee",
        linkedIn: "linkedin.com/in/jessicaleecoder",
      },
    },
    {
      id: "user-5",
      name: "David Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=David&backgroundColor=d1d4f9&radius=50&gender=male",
      role: "QA Engineer",
      productivityScore: 94,
      tasksCompleted: 38,
      totalTasks: 40,
      hoursLogged: 40,
      lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      // Add time-specific data
      dayData: { tasksCompleted: 10, totalTasks: 10, hoursLogged: 7.5, productivityScore: 95 },
      weekData: { tasksCompleted: 38, totalTasks: 40, hoursLogged: 40, productivityScore: 94 },
      monthData: { tasksCompleted: 38, totalTasks: 40, hoursLogged: 160, productivityScore: 94 },
      // Add contact information
      contactInfo: {
        email: "david.rodriguez@company.com",
        phone: "+1 (555) 567-8901",
        department: "Quality Assurance",
        location: "Chicago, IL",
        manager: "Michael Chen",
        startDate: "2020-09-18",
        slackHandle: "@davidr",
        githubUsername: "davidrqa",
        linkedIn: "linkedin.com/in/davidrodriguez",
      },
    },
    {
      id: "user-6",
      name: "Emily Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Emily&backgroundColor=c0e5c8&radius=50&gender=female",
      role: "Designer",
      productivityScore: 72,
      tasksCompleted: 18,
      totalTasks: 25,
      hoursLogged: 32,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      // Add time-specific data
      dayData: { tasksCompleted: 0, totalTasks: 0, hoursLogged: 0, productivityScore: 0 }, // Not active today
      weekData: { tasksCompleted: 18, totalTasks: 25, hoursLogged: 32, productivityScore: 72 },
      monthData: { tasksCompleted: 18, totalTasks: 25, hoursLogged: 128, productivityScore: 72 },
      // Add contact information
      contactInfo: {
        email: "emily.wilson@company.com",
        phone: "+1 (555) 678-9012",
        department: "Design",
        location: "Portland, OR",
        manager: "Robert Smith",
        startDate: "2021-05-03",
        slackHandle: "@emilyw",
        linkedIn: "linkedin.com/in/emilywilson",
      },
    },
    {
      id: "user-7",
      name: "James Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=James&backgroundColor=f9c9b6&radius=50&gender=male",
      role: "Developer",
      productivityScore: 65,
      tasksCompleted: 22,
      totalTasks: 34,
      hoursLogged: 30,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      // Add time-specific data
      dayData: { tasksCompleted: 0, totalTasks: 0, hoursLogged: 0, productivityScore: 0 }, // Not active today
      weekData: { tasksCompleted: 22, totalTasks: 34, hoursLogged: 30, productivityScore: 65 },
      monthData: { tasksCompleted: 22, totalTasks: 34, hoursLogged: 120, productivityScore: 65 },
      // Add contact information
      contactInfo: {
        email: "james.taylor@company.com",
        phone: "+1 (555) 789-0123",
        department: "Engineering",
        location: "Denver, CO",
        manager: "Alex Johnson",
        startDate: "2022-03-28",
        slackHandle: "@jamest",
        githubUsername: "jtaylor",
        linkedIn: "linkedin.com/in/jamestaylor",
      },
    },
    {
      id: "user-8",
      name: "Olivia Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Olivia&backgroundColor=f8e3a3&radius=50&gender=female",
      role: "Marketing",
      productivityScore: 82,
      tasksCompleted: 22,
      totalTasks: 26,
      hoursLogged: 34,
      lastActive: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
      // Add time-specific data
      dayData: { tasksCompleted: 5, totalTasks: 6, hoursLogged: 6, productivityScore: 80 },
      weekData: { tasksCompleted: 22, totalTasks: 26, hoursLogged: 34, productivityScore: 82 },
      monthData: { tasksCompleted: 22, totalTasks: 26, hoursLogged: 136, productivityScore: 82 },
      // Add contact information
      contactInfo: {
        email: "olivia.martinez@company.com",
        phone: "+1 (555) 890-1234",
        department: "Marketing",
        location: "Miami, FL",
        manager: "Robert Smith",
        startDate: "2021-08-16",
        slackHandle: "@oliviam",
        linkedIn: "linkedin.com/in/oliviamartinez",
      },
    },
    {
      id: "user-9",
      name: "Daniel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Daniel&backgroundColor=b6ccf9&radius=50&gender=male",
      role: "Developer",
      productivityScore: 90,
      tasksCompleted: 32,
      totalTasks: 36,
      hoursLogged: 39,
      lastActive: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      // Add time-specific data
      dayData: { tasksCompleted: 7, totalTasks: 8, hoursLogged: 7, productivityScore: 88 },
      weekData: { tasksCompleted: 32, totalTasks: 36, hoursLogged: 39, productivityScore: 90 },
      monthData: { tasksCompleted: 32, totalTasks: 36, hoursLogged: 156, productivityScore: 90 },
      // Add contact information
      contactInfo: {
        email: "daniel.kim@company.com",
        phone: "+1 (555) 901-2345",
        department: "Engineering",
        location: "Boston, MA",
        manager: "Alex Johnson",
        startDate: "2020-11-30",
        slackHandle: "@danielk",
        githubUsername: "dkim",
        linkedIn: "linkedin.com/in/danielkim",
      },
    },
    {
      id: "user-10",
      name: "Sophia Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Sophia&backgroundColor=d1bcf9&radius=50&gender=female",
      role: "QA Engineer",
      productivityScore: 76,
      tasksCompleted: 24,
      totalTasks: 32,
      hoursLogged: 33,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      // Add time-specific data
      dayData: { tasksCompleted: 0, totalTasks: 0, hoursLogged: 0, productivityScore: 0 }, // Not active today
      weekData: { tasksCompleted: 24, totalTasks: 32, hoursLogged: 33, productivityScore: 76 },
      monthData: { tasksCompleted: 24, totalTasks: 32, hoursLogged: 132, productivityScore: 76 },
      // Add contact information
      contactInfo: {
        email: "sophia.patel@company.com",
        phone: "+1 (555) 012-3456",
        department: "Quality Assurance",
        location: "Atlanta, GA",
        manager: "David Rodriguez",
        startDate: "2021-10-11",
        slackHandle: "@sophiap",
        githubUsername: "spatel",
        linkedIn: "linkedin.com/in/sophiapatel",
      },
    },
  ]

  // Return the requested number of team members
  return teamMembers.slice(0, count)
}

// Generate tasks for a specific team member based on their metrics
export function generateMemberTasks(member: TeamMember, timeRange: TimeRange): Task[] {
  const tasks: Task[] = []

  // Determine how many tasks to generate based on the time range
  let tasksToGenerate: number
  let completedTasks: number
  let timeData: any

  if (timeRange === "Day") {
    timeData = member.dayData
  } else if (timeRange === "Week") {
    timeData = member.weekData
  } else {
    timeData = member.monthData
  }

  tasksToGenerate = timeData.totalTasks
  completedTasks = timeData.tasksCompleted

  // If there are no tasks for this time period, return empty array
  if (tasksToGenerate === 0) {
    return []
  }

  // Predefined tasks for each role
  const roleTasks = {
    Developer: [
      {
        title: "Implement user authentication flow",
        description: "Add secure login and registration functionality",
        priority: "High",
        tags: ["Frontend", "Backend", "Security"],
        timeEstimate: 8,
      },
      {
        title: "Fix dashboard loading performance",
        description: "Optimize data fetching and rendering",
        priority: "Medium",
        tags: ["Performance", "Frontend"],
        timeEstimate: 4,
      },
      {
        title: "Add unit tests for API endpoints",
        description: "Improve test coverage for critical endpoints",
        priority: "Medium",
        tags: ["Testing", "Backend"],
        timeEstimate: 6,
      },
    ],
    Designer: [
      {
        title: "Create new dashboard layout",
        description: "Design responsive dashboard interface",
        priority: "High",
        tags: ["UI", "UX", "Design"],
        timeEstimate: 6,
      },
      {
        title: "Update component library",
        description: "Refresh design system components",
        priority: "Medium",
        tags: ["Design", "UI"],
        timeEstimate: 4,
      },
      {
        title: "Design mobile navigation",
        description: "Create mobile-friendly navigation patterns",
        priority: "Medium",
        tags: ["UX", "Mobile"],
        timeEstimate: 5,
      },
    ],
    "Product Manager": [
      {
        title: "Define Q2 roadmap",
        description: "Plan upcoming features and priorities",
        priority: "High",
        tags: ["Product", "Planning"],
        timeEstimate: 8,
      },
      {
        title: "Analyze user feedback",
        description: "Review and categorize user suggestions",
        priority: "Medium",
        tags: ["Product", "Research"],
        timeEstimate: 4,
      },
      {
        title: "Update product documentation",
        description: "Maintain product specifications",
        priority: "Low",
        tags: ["Documentation"],
        timeEstimate: 3,
      },
    ],
    "QA Engineer": [
      {
        title: "Test new authentication flow",
        description: "Verify security and functionality",
        priority: "High",
        tags: ["Testing", "Security", "QA"],
        timeEstimate: 6,
      },
      {
        title: "Regression testing for dashboard",
        description: "Ensure no new bugs introduced",
        priority: "Medium",
        tags: ["Testing", "QA"],
        timeEstimate: 4,
      },
      {
        title: "Create test automation scripts",
        description: "Set up automated testing pipeline",
        priority: "Medium",
        tags: ["Automation", "QA"],
        timeEstimate: 5,
      },
    ],
    Marketing: [
      {
        title: "Create product launch campaign",
        description: "Plan and execute launch strategy",
        priority: "High",
        tags: ["Marketing", "Campaign"],
        timeEstimate: 8,
      },
      {
        title: "Update website content",
        description: "Refresh product pages and blog",
        priority: "Medium",
        tags: ["Content", "Marketing"],
        timeEstimate: 4,
      },
      {
        title: "Social media campaign",
        description: "Plan and schedule social posts",
        priority: "Medium",
        tags: ["Social Media", "Marketing"],
        timeEstimate: 5,
      },
    ],
  }

  // Get tasks for the member's role
  const roleTaskTemplates = roleTasks[member.role] || roleTasks["Developer"]

  // Generate tasks based on the time range
  for (let i = 0; i < tasksToGenerate; i++) {
    const isCompleted = i < completedTasks
    const template = roleTaskTemplates[i % roleTaskTemplates.length]

    // Generate dates based on time range
    const now = new Date()
    let createdDate: Date
    let dueDate: Date
    let completedDate: Date | undefined

    if (timeRange === "Day") {
      createdDate = new Date(now.setHours(9, 0, 0, 0))
      dueDate = new Date(now.setHours(17, 0, 0, 0))
      if (isCompleted) {
        completedDate = new Date(now.setHours(14, 0, 0, 0))
      }
    } else if (timeRange === "Week") {
      createdDate = new Date(now)
      createdDate.setDate(now.getDate() - 3)
      createdDate.setHours(9, 0, 0, 0)

      dueDate = new Date(createdDate)
      dueDate.setDate(createdDate.getDate() + 2)

      if (isCompleted) {
        completedDate = new Date(createdDate)
        completedDate.setDate(createdDate.getDate() + 1)
        completedDate.setHours(14, 0, 0, 0)
      }
    } else {
      createdDate = new Date(now)
      createdDate.setDate(now.getDate() - 15)
      createdDate.setHours(9, 0, 0, 0)

      dueDate = new Date(createdDate)
      dueDate.setDate(createdDate.getDate() + 7)

      if (isCompleted) {
        completedDate = new Date(createdDate)
        completedDate.setDate(createdDate.getDate() + 4)
        completedDate.setHours(14, 0, 0, 0)
      }
    }

    // Calculate time spent based on completion status
    const timeSpent = isCompleted ? template.timeEstimate : Math.floor(template.timeEstimate * 0.6)

    // Create task
    tasks.push({
      id: `task-${member.id}-${i}`,
      title: template.title,
      description: template.description,
      status: isCompleted ? "Completed" : "In Progress",
      priority: template.priority as any,
      dueDate: dueDate.toISOString(),
      assignedTo: member.id,
      createdAt: createdDate.toISOString(),
      completedAt: isCompleted ? completedDate?.toISOString() : undefined,
      tags: template.tags,
      timeEstimate: template.timeEstimate,
      timeSpent,
    })
  }

  return tasks
}

// Filter team data based on search query and role filter
export function filterTeamData(teamData: TeamMember[], options: FilterOptions): TeamMember[] {
  const { searchQuery, roleFilter, timeRange } = options

  // First filter by search and role
  const filteredBySearchAndRole = teamData.filter((member) => {
    // Filter by search query - check both name and role
    const searchLower = searchQuery.toLowerCase().trim()
    const matchesSearch =
      searchLower === "" ||
      member.name.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower)

    // Filter by role
    const matchesRole = roleFilter === "All" || member.role === roleFilter

    return matchesSearch && matchesRole
  })

  // Then update the metrics based on the selected time range
  return filteredBySearchAndRole
    .map((member) => {
      // Create a copy of the member
      const updatedMember = { ...member }

      // Update metrics based on time range
      if (timeRange === "Day") {
        updatedMember.tasksCompleted = member.dayData.tasksCompleted
        updatedMember.totalTasks = member.dayData.totalTasks
        updatedMember.hoursLogged = member.dayData.hoursLogged
        updatedMember.productivityScore = member.dayData.productivityScore
      } else if (timeRange === "Week") {
        updatedMember.tasksCompleted = member.weekData.tasksCompleted
        updatedMember.totalTasks = member.weekData.totalTasks
        updatedMember.hoursLogged = member.weekData.hoursLogged
        updatedMember.productivityScore = member.weekData.productivityScore
      } else {
        // Month - use the default values which are already set for the month
        updatedMember.tasksCompleted = member.monthData.tasksCompleted
        updatedMember.totalTasks = member.monthData.totalTasks
        updatedMember.hoursLogged = member.monthData.hoursLogged
        updatedMember.productivityScore = member.monthData.productivityScore
      }

      // Filter by time range for visibility (if they were active in that period)
      if (timeRange === "Day") {
        // For day view, only show members who were active today (have non-zero metrics)
        updatedMember.isVisibleInTimeRange = member.dayData.hoursLogged > 0
      } else if (timeRange === "Week") {
        // For week view, check if they were active in the last 7 days
        const lastActiveDate = new Date(member.lastActive)
        updatedMember.isVisibleInTimeRange = Date.now() - lastActiveDate.getTime() < 7 * 24 * 60 * 60 * 1000
      } else {
        // For month view, all members are visible
        updatedMember.isVisibleInTimeRange = true
      }

      return updatedMember
    })
    .filter((member) => member.isVisibleInTimeRange)
}

// Calculate summary metrics
export function calculateSummaryMetrics(teamData: TeamMember[]): SummaryMetrics {
  const totalMembers = teamData.length
  const activeMembers = teamData.filter(
    (member) => new Date(member.lastActive).getTime() > Date.now() - 3 * 24 * 60 * 60 * 1000,
  ).length

  const tasksCompleted = teamData.reduce((sum, member) => sum + member.tasksCompleted, 0)
  const totalTasks = teamData.reduce((sum, member) => sum + member.totalTasks, 0)
  const completionRate = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0

  const hoursLogged = teamData.reduce((sum, member) => sum + member.hoursLogged, 0)
  const avgHoursPerMember = totalMembers > 0 ? Math.round((hoursLogged / totalMembers) * 10) / 10 : 0

  const avgProductivity =
    totalMembers > 0
      ? Math.round(teamData.reduce((sum, member) => sum + member.productivityScore, 0) / totalMembers)
      : 0

  // Dynamic productivity trend based on time range
  // For day/week views, show higher volatility, for month view show more stability
  let productivityTrend = 4 // Default 4% increase

  // If we have very few tasks completed, show a negative trend
  if (tasksCompleted < 20) {
    productivityTrend = -2
  } else if (tasksCompleted > 100) {
    productivityTrend = 6 // Higher trend for very productive periods
  }

  return {
    activeMembers,
    activePercentage: totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0,
    tasksCompleted,
    completionRate,
    hoursLogged,
    avgHoursPerMember,
    avgProductivity,
    productivityTrend,
  }
}

// Generate realistic daily activity data for the chart
export function generateDailyActivityData(teamData: TeamMember[], timeRange: TimeRange): DailyActivity[] {
  const result: DailyActivity[] = []
  const today = new Date()

  // Calculate total tasks and hours from the filtered team data
  const totalTasksCompleted = teamData.reduce((sum, member) => sum + member.tasksCompleted, 0)
  const totalHoursLogged = teamData.reduce((sum, member) => sum + member.hoursLogged, 0)

  // For "Day" view - hourly data for a typical workday
  if (timeRange === "Day") {
    // Realistic hourly data pattern for a workday
    const hourlyData = [
      { hour: "00:00", tasks: 0, hours: 0 },
      { hour: "01:00", tasks: 0, hours: 0 },
      { hour: "02:00", tasks: 0, hours: 0 },
      { hour: "03:00", tasks: 0, hours: 0 },
      { hour: "04:00", tasks: 0, hours: 0 },
      { hour: "05:00", tasks: 0, hours: 0 },
      { hour: "06:00", tasks: 0.5, hours: 0.5 },
      { hour: "07:00", tasks: 1, hours: 1 },
      { hour: "08:00", tasks: 3, hours: 3 },
      { hour: "09:00", tasks: 5, hours: 6 },
      { hour: "10:00", tasks: 6, hours: 7 },
      { hour: "11:00", tasks: 5, hours: 6 },
      { hour: "12:00", tasks: 2, hours: 3 },
      { hour: "13:00", tasks: 4, hours: 5 },
      { hour: "14:00", tasks: 6, hours: 7 },
      { hour: "15:00", tasks: 7, hours: 7.5 },
      { hour: "16:00", tasks: 5, hours: 6 },
      { hour: "17:00", tasks: 3, hours: 4 },
      { hour: "18:00", tasks: 1, hours: 2 },
      { hour: "19:00", tasks: 0.5, hours: 1 },
      { hour: "20:00", tasks: 0, hours: 0.5 },
      { hour: "21:00", tasks: 0, hours: 0 },
      { hour: "22:00", tasks: 0, hours: 0 },
      { hour: "23:00", tasks: 0, hours: 0 },
    ]

    // Calculate the sum of base hours in the pattern
    const baseHoursSum = hourlyData.reduce((sum, item) => sum + item.hours, 0)
    
    // Scale the data based on the actual team metrics
    const activeMembers = teamData.filter((m) => m.dayData.hoursLogged > 0).length
    const hourScaleFactor = totalHoursLogged / baseHoursSum

    return hourlyData.map((item) => ({
      date: item.hour,
      tasks: Math.round(item.tasks * (totalTasksCompleted / baseHoursSum) * 10) / 10,
      hours: Math.round(item.hours * hourScaleFactor * 10) / 10,
    }))
  }
  // For "Week" view - daily data for the past week
  else if (timeRange === "Week") {
    // Realistic daily data for a week (lower on weekends)
    const weekData = [
      { day: 6, label: "Mon", tasks: 24, hours: 32 },
      { day: 5, label: "Tue", tasks: 28, hours: 36 },
      { day: 4, label: "Wed", tasks: 26, hours: 34 },
      { day: 3, label: "Thu", tasks: 30, hours: 38 },
      { day: 2, label: "Fri", tasks: 22, hours: 30 },
      { day: 1, label: "Sat", tasks: 6, hours: 8 },
      { day: 0, label: "Sun", tasks: 4, hours: 6 },
    ]

    // Calculate the sum of base hours in the pattern
    const baseHoursSum = weekData.reduce((sum, item) => sum + item.hours, 0)
    
    // Scale the data based on the actual team metrics
    const hourScaleFactor = totalHoursLogged / baseHoursSum

    return weekData.map((item) => {
      const date = new Date()
      date.setDate(today.getDate() - item.day)
      return {
        date: item.label,
        tasks: Math.round(item.tasks * (totalTasksCompleted / baseHoursSum)),
        hours: Math.round(item.hours * hourScaleFactor),
      }
    })
  }
  // For "Month" view - data for the past 30 days
  else {
    // Create a realistic monthly pattern with weekday/weekend cycles
    const monthData = []
    let baseHoursSum = 0

    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(today.getDate() - i)

      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      // Base values with realistic variations
      let tasks, hours

      if (isWeekend) {
        tasks = 5 + Math.floor(Math.random() * 3)
        hours = 6 + Math.floor(Math.random() * 4)
      } else {
        tasks = 20 + Math.floor(Math.random() * 10)
        hours = 30 + Math.floor(Math.random() * 8)
      }

      // Add a slight upward trend over the month
      const trendFactor = 1 + i / 100
      tasks = Math.floor(tasks / trendFactor)
      hours = Math.floor(hours / trendFactor)

      baseHoursSum += hours

      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })

      monthData.push({
        date: dateStr,
        baseTasks: tasks,
        baseHours: hours,
      })
    }

    // Scale based on actual team data
    const hourScaleFactor = totalHoursLogged / baseHoursSum

    return monthData.map((item) => ({
      date: item.date,
      tasks: Math.round(item.baseTasks * (totalTasksCompleted / baseHoursSum)),
      hours: Math.round(item.baseHours * hourScaleFactor),
    }))
  }
}

// Generate role distribution data for the pie chart
export function generateRoleDistributionData(teamData: TeamMember[]): RoleDistribution[] {
  // Count roles from actual team data
  const roleCount: Record<string, number> = {}

  teamData.forEach((member) => {
    if (roleCount[member.role]) {
      roleCount[member.role]++
    } else {
      roleCount[member.role] = 1
    }
  })

  return Object.entries(roleCount).map(([role, count]) => ({
    role,
    value: count,
  }))
}

// Format time ago
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}d ago`
  }

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
