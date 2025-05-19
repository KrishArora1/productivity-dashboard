"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, Calendar, AlertCircle } from "lucide-react"
import type { TeamMember, TimeRange, TaskStatus } from "@/lib/types"
import { generateMemberTasks, formatDate } from "@/lib/data-utils"

interface TasksDialogProps {
  member: TeamMember | null
  open: boolean
  onOpenChange: (open: boolean) => void
  timeRange: TimeRange
}

export default function TasksDialog({ member, open, onOpenChange, timeRange }: TasksDialogProps) {
  const [activeTab, setActiveTab] = useState<TaskStatus | "All">("All")

  if (!member) return null

  // Generate tasks for this member based on their metrics
  const tasks = generateMemberTasks(member, timeRange)

  // Filter tasks based on active tab
  const filteredTasks = activeTab === "All" ? tasks : tasks.filter((task) => task.status === activeTab)

  // Calculate task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "Completed").length
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length
  const blockedTasks = tasks.filter((task) => task.status === "Blocked").length

  // Ensure the completion percentage matches the member's data
  const completionPercentage = member.productivityScore

  // Get time range label
  const getTimeRangeLabel = () => {
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

  // Get status badge color
  const getStatusBadgeColor = (status: TaskStatus) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Blocked":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Get priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "Medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "High":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Urgent":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tasks for {member.name}</DialogTitle>
          <DialogDescription>
            Viewing tasks {getTimeRangeLabel()} ({tasks.length} total)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with avatar and task summary */}
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <div className="flex items-center gap-2">
                <Progress value={completionPercentage} className="h-2 flex-1" />
                <span className="text-sm font-medium">{completionPercentage}%</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                >
                  {completedTasks} Completed
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {inProgressTasks} In Progress
                </Badge>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  {pendingTasks} Pending
                </Badge>
                <Badge variant="outline" className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300">
                  {blockedTasks} Blocked
                </Badge>
              </div>
            </div>
          </div>

          {/* Task list with tabs */}
          <Tabs
            defaultValue="All"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TaskStatus | "All")}
          >
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Completed">Completed</TabsTrigger>
              <TabsTrigger value="In Progress">In Progress</TabsTrigger>
              <TabsTrigger value="Pending">Pending</TabsTrigger>
              <TabsTrigger value="Blocked">Blocked</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge variant="outline" className={getStatusBadgeColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">{task.description}</p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap justify-between items-center mt-2 pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPriorityBadgeColor(task.priority)}>
                              {task.priority} Priority
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                {task.timeSpent}/{task.timeEstimate}h
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Due {formatDate(task.dueDate)}</span>
                            </div>
                          </div>
                        </div>

                        {task.status === "Blocked" && (
                          <div className="flex items-start gap-2 mt-2 p-2 bg-rose-50 dark:bg-rose-950/20 rounded-md">
                            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-rose-700 dark:text-rose-300">
                              This task is blocked due to dependencies on other tasks or external factors.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tasks found in this category {getTimeRangeLabel()}.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
