import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, Clock, TrendingUp } from "lucide-react"
import type { SummaryMetrics } from "@/lib/types"
import type { TimeRange } from "@/lib/types"

interface SummaryCardsProps {
  metrics: SummaryMetrics
  timeRange: TimeRange
}

export default function SummaryCards({ metrics, timeRange }: SummaryCardsProps) {
  // Get time-specific label
  const getTimeLabel = () => {
    switch (timeRange) {
      case "Day":
        return "today"
      case "Week":
        return "this week"
      case "Month":
        return "this month"
      default:
        return ""
    }
  }

  // Format hours with decimal places when needed
  const formatHours = (hours: number) => {
    return Number.isInteger(hours) ? hours.toString() : hours.toFixed(1)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-2 border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-tight">Active Members</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight text-primary">{metrics.activeMembers}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {metrics.activePercentage}% of total team {getTimeLabel()}
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-green-200/70 dark:border-green-900/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-200 dark:hover:border-green-900/70">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-tight">Tasks Completed</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight text-green-600 dark:text-green-400">
            {metrics.tasksCompleted}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {metrics.completionRate}% completion rate {getTimeLabel()}
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-200/70 dark:border-orange-900/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-orange-200 dark:hover:border-orange-900/70">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-tight">Hours Logged</CardTitle>
          <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight text-orange-600 dark:text-orange-400">
            {formatHours(metrics.hoursLogged)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatHours(metrics.avgHoursPerMember)} avg. hours per member {getTimeLabel()}
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200/70 dark:border-blue-900/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-900/70">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium tracking-tight">Avg. Productivity</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight text-blue-600 dark:text-blue-400">
            {metrics.avgProductivity}%
          </div>
          <div className="flex items-center text-xs mt-1">
            <span
              className={`flex items-center ${
                metrics.productivityTrend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {metrics.productivityTrend > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
              {Math.abs(metrics.productivityTrend)}% {getTimeLabel()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
