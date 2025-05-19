"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { TimeRange, Role } from "@/lib/types"

interface HeaderProps {
  timeRange: TimeRange
  onTimeRangeChange: (range: TimeRange) => void
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  roleFilter: Role | "All"
  onRoleFilterChange: (role: Role | "All") => void
}

export default function Header({
  timeRange,
  onTimeRangeChange,
  searchQuery,
  onSearchQueryChange,
  roleFilter,
  onRoleFilterChange,
}: HeaderProps) {
  const timeRanges: TimeRange[] = ["Day", "Week", "Month"]
  const roles: (Role | "All")[] = ["All", "Developer", "Designer", "Product Manager", "QA Engineer", "Marketing"]

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent dark:from-primary dark:to-blue-400">
          Team Productivity Dashboard
        </h1>
        <p className="text-muted-foreground">Monitor your team's performance and productivity</p>
      </div>

      <div className="flex flex-1 flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 md:justify-end">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or role..."
            className="pl-8 border-primary/20 focus-visible:ring-primary/30"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-primary/20">
              Role: {roleFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {roles.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => onRoleFilterChange(role)}
                className={roleFilter === role ? "bg-primary/10 text-primary" : ""}
              >
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-primary/20">
              Time: {timeRange}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRanges.map((range) => (
              <DropdownMenuItem
                key={range}
                onClick={() => onTimeRangeChange(range)}
                className={timeRange === range ? "bg-primary/10 text-primary" : ""}
              >
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
