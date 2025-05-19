"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TeamMember, TimeRange } from "@/lib/types"
import { generateDailyActivityData } from "@/lib/data-utils"
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ActivityChartProps {
  teamData: TeamMember[]
  timeRange: TimeRange
}

export default function ActivityChart({ teamData, timeRange }: ActivityChartProps) {
  const activityData = generateDailyActivityData(teamData, timeRange)

  // Update the activity chart colors to match the new professional color scheme
  // Custom colors - using primary color for consistency
  const taskColor = "hsl(var(--primary) / 0.8)" // Primary color with opacity
  const hoursColor = "#f97316" // Orange
  const gridColor = "var(--border)"
  const darkGridColor = "var(--border)"

  // Get time-specific title
  const getTimeTitle = () => {
    switch (timeRange) {
      case "Day":
        return "Today's Activity (Hourly)"
      case "Week":
        return "This Week's Activity"
      case "Month":
        return "This Month's Activity"
      default:
        return "Activity Overview"
    }
  }

  // Format tooltip values with decimal places when needed
  const formatTooltipValue = (value: number) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(1)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          {getTimeTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={activityData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [formatTooltipValue(value), undefined]}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  padding: "8px 12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  opacity: 1,
                  backdropFilter: "blur(8px)",
                  border: "1px solid hsl(var(--border))",
                }}
                wrapperStyle={{
                  zIndex: 1000,
                  outline: "none",
                }}
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              />
              <Bar
                yAxisId="left"
                dataKey="tasks"
                name="Tasks Completed"
                fill={taskColor}
                radius={[4, 4, 0, 0]}
                barSize={20}
                className="opacity-100"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="hours"
                name="Hours Logged"
                stroke={hoursColor}
                strokeWidth={3}
                dot={{ r: 4, fill: hoursColor, strokeWidth: 1 }}
                activeDot={{ r: 6, fill: hoursColor, stroke: "var(--background)", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
