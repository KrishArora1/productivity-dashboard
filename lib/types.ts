export type TimeRange = "Day" | "Week" | "Month"

export type Role = "Developer" | "Designer" | "Product Manager" | "QA Engineer" | "Marketing"

export type TaskStatus = "Completed" | "In Progress" | "Pending" | "Blocked"

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent"

export interface TimeRangeData {
  tasksCompleted: number
  totalTasks: number
  hoursLogged: number
  productivityScore: number
}

export interface TeamMember {
  id: string
  name: string
  avatar: string
  role: Role
  productivityScore: number
  tasksCompleted: number
  totalTasks: number
  hoursLogged: number
  lastActive: string
  // Add time-specific data
  dayData: TimeRangeData
  weekData: TimeRangeData
  monthData: TimeRangeData
  isVisibleInTimeRange?: boolean
  // Add contact information
  contactInfo?: ContactInfo
}

export interface ContactInfo {
  email: string
  phone: string
  department: string
  location: string
  manager: string
  startDate: string
  slackHandle: string
  githubUsername?: string
  linkedIn?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  assignedTo: string
  createdAt: string
  completedAt?: string
  tags: string[]
  timeEstimate: number
  timeSpent: number
}

export interface SummaryMetrics {
  activeMembers: number
  activePercentage: number
  tasksCompleted: number
  completionRate: number
  hoursLogged: number
  avgHoursPerMember: number
  avgProductivity: number
  productivityTrend: number
}

export interface FilterOptions {
  searchQuery: string
  roleFilter: Role | "All"
  timeRange: TimeRange
}

export interface DailyActivity {
  date: string
  tasks: number
  hours: number
}

export interface RoleDistribution {
  role: string
  value: number
}
