"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import SummaryCards from "@/components/summary-cards"
import ActivityChart from "@/components/activity-chart"
import TeamDistributionChart from "@/components/team-distribution-chart"
import TeamTable from "@/components/team-table"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExportMenu } from "@/components/export-menu"
import { generateTeamData, filterTeamData, calculateSummaryMetrics } from "@/lib/data-utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TimeRange, Role } from "@/lib/types"

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("Week")
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<Role | "All">("All")
  const [activeTab, setActiveTab] = useState("overview")
  const [refreshKey, setRefreshKey] = useState(0)

  // Generate mock data
  const allTeamData = generateTeamData(10)

  // Filter data based on search query and role filter
  const filteredTeamData = filterTeamData(allTeamData, {
    searchQuery,
    roleFilter,
    timeRange,
  })

  // Calculate summary metrics
  const summaryMetrics = calculateSummaryMetrics(filteredTeamData)

  // Force refresh when time range changes
  useEffect(() => {
    setRefreshKey((prev) => prev + 1)
  }, [timeRange])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
        <Header
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />

        <div className="flex items-center gap-2">
          <ExportMenu teamData={filteredTeamData} timeRange={timeRange} />
          <ThemeToggle />
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-primary/10 text-primary">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="team"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <SummaryCards metrics={summaryMetrics} timeRange={timeRange} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ActivityChart key={`activity-${refreshKey}`} teamData={filteredTeamData} timeRange={timeRange} />
            <TeamDistributionChart key={`distribution-${refreshKey}`} teamData={filteredTeamData} />
          </div>
        </TabsContent>

        <TabsContent value="team">
          <SummaryCards metrics={summaryMetrics} timeRange={timeRange} />
          <div className="mt-6">
            <TeamTable key={`table-${refreshKey}`} teamData={filteredTeamData} timeRange={timeRange} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
