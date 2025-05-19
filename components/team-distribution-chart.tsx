"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TeamMember } from "@/lib/types"
import { generateRoleDistributionData } from "@/lib/data-utils"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface TeamDistributionChartProps {
  teamData: TeamMember[]
}

export default function TeamDistributionChart({ teamData }: TeamDistributionChartProps) {
  const distributionData = generateRoleDistributionData(teamData)

  // Update the color palette to be more professional and consistent
  const COLORS = [
    "hsl(var(--primary) / 0.8)", // Primary color with opacity
    "hsl(24 95% 53% / 0.8)", // Orange with opacity
    "hsl(142 76% 36% / 0.8)", // Green with opacity
    "hsl(262 83% 58% / 0.8)", // Purple with opacity
    "hsl(187 100% 42% / 0.8)", // Blue with opacity
  ]

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
  }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return percent > 0.05 ? (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" className="text-xs font-medium">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null
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
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </span>
          Team Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {distributionData.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="role"
                  paddingAngle={2}
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="opacity-100 hover:opacity-100"
                      style={{ stroke: "var(--background)", strokeWidth: 1 }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} members`, name]}
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
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p>No team data available</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
