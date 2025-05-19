"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Eye, MessageSquare, FileEdit, User, User2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ContactDialog from "@/components/contact-dialog"
import TasksDialog from "@/components/tasks-dialog"
import type { TeamMember, TimeRange } from "@/lib/types"
import { formatTimeAgo } from "@/lib/data-utils"

interface TeamTableProps {
  teamData: TeamMember[]
  timeRange: TimeRange
}

type SortField = "name" | "productivity" | "tasksCompleted" | "hoursLogged" | "lastActive"
type SortDirection = "asc" | "desc"

export default function TeamTable({ teamData, timeRange }: TeamTableProps) {
  const [sortField, setSortField] = useState<SortField>("productivity")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showTasks, setShowTasks] = useState(false)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedData = [...teamData].sort((a, b) => {
    let valueA, valueB

    switch (sortField) {
      case "name":
        valueA = a.name
        valueB = b.name
        break
      case "productivity":
        valueA = a.productivityScore
        valueB = b.productivityScore
        break
      case "tasksCompleted":
        valueA = a.tasksCompleted / a.totalTasks
        valueB = b.tasksCompleted / b.totalTasks
        break
      case "hoursLogged":
        valueA = a.hoursLogged
        valueB = b.hoursLogged
        break
      case "lastActive":
        valueA = new Date(a.lastActive).getTime()
        valueB = new Date(b.lastActive).getTime()
        break
      default:
        valueA = a.productivityScore
        valueB = b.productivityScore
    }

    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : -1
    } else {
      return valueA < valueB ? 1 : -1
    }
  })

  const getProductivityColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500 dark:bg-emerald-600"
    if (score >= 60) return "bg-amber-500 dark:bg-amber-600"
    return "bg-rose-500 dark:bg-rose-600"
  }

  const getProductivityTextColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 60) return "text-amber-600 dark:text-amber-400"
    return "text-rose-600 dark:text-rose-400"
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Developer":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
      case "Designer":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Product Manager":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      case "QA Engineer":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Marketing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const viewProfile = (member: TeamMember) => {
    setSelectedMember(member)
    setShowProfile(true)
  }

  const viewContact = (member: TeamMember) => {
    setSelectedMember(member)
    setShowContact(true)
  }

  const viewTasks = (member: TeamMember) => {
    setSelectedMember(member)
    setShowTasks(true)
  }

  // Get time-specific label
  const getTimeLabel = () => {
    switch (timeRange) {
      case "Day":
        return "Today"
      case "Week":
        return "This Week"
      case "Month":
        return "This Month"
      default:
        return ""
    }
  }

  // Format hours with decimal places when needed
  const formatHours = (hours: number) => {
    return Number.isInteger(hours) ? hours.toString() : hours.toFixed(1)
  }

  // Add this function to determine gender from name
  const getGenderFromName = (name: string): 'male' | 'female' => {
    const femaleNames = ['Sarah', 'Jessica', 'Olivia', 'Emily', 'Sophia', 'Emma', 'Ava', 'Isabella', 'Mia', 'Charlotte']
    const firstName = name.split(' ')[0]
    return femaleNames.includes(firstName) ? 'female' : 'male'
  }

  return (
    <>
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            Team Members - {getTimeLabel()}
          </CardTitle>
          <CardDescription>Manage your team members and their productivity</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center gap-1">
                      Team Member
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("productivity")}
                      className="flex items-center gap-1"
                    >
                      Productivity
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("tasksCompleted")}
                      className="flex items-center gap-1"
                    >
                      Tasks
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("hoursLogged")}
                      className="flex items-center gap-1"
                    >
                      Hours
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("lastActive")}
                      className="flex items-center gap-1"
                    >
                      Last Active
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.length > 0 ? (
                  sortedData.map((member) => (
                    <TableRow
                      key={member.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => viewProfile(member)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-2">
                            <span>{member.name}</span>
                            {getGenderFromName(member.name) === 'female' ? (
                              <User2 className="h-4 w-4 text-pink-500" />
                            ) : (
                              <User className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRoleBadgeColor(member.role)}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getProductivityColor(member.productivityScore)}`}
                              style={{ width: `${member.productivityScore}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getProductivityTextColor(member.productivityScore)}`}>
                            {member.productivityScore}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{member.tasksCompleted}</span>
                          <span className="text-muted-foreground">/{member.totalTasks}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{formatHours(member.hoursLogged)}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center ${
                            new Date(member.lastActive).getTime() > Date.now() - 24 * 60 * 60 * 1000
                              ? "text-emerald-600 dark:text-emerald-400"
                              : ""
                          }`}
                        >
                          {formatTimeAgo(member.lastActive)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                viewProfile(member)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                viewTasks(member)
                              }}
                            >
                              <FileEdit className="mr-2 h-4 w-4" />
                              <span>View Tasks</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                viewContact(member)
                              }}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Contact Info</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
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
                          className="mb-2"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                        <p>No team members found for {timeRange.toLowerCase()} view</p>
                        <p className="text-sm">Try adjusting your search, filter criteria, or time range</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Member Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Team Member Profile</DialogTitle>
            <DialogDescription>
              Detailed information about the team member for {timeRange.toLowerCase()} view.
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.name} />
                  <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <Badge variant="outline" className={getRoleBadgeColor(selectedMember.role)}>
                    {selectedMember.role}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Productivity Score ({timeRange})</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getProductivityColor(selectedMember.productivityScore)}`}
                        style={{ width: `${selectedMember.productivityScore}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-medium ${getProductivityTextColor(selectedMember.productivityScore)}`}
                    >
                      {selectedMember.productivityScore}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Tasks Completed ({timeRange})</h4>
                    <p className="text-lg font-semibold">
                      {selectedMember.tasksCompleted}/{selectedMember.totalTasks}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Hours Logged ({timeRange})</h4>
                    <p className="text-lg font-semibold">{formatHours(selectedMember.hoursLogged)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Last Active</h4>
                  <p className="text-sm">
                    {new Date(selectedMember.lastActive).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowProfile(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowProfile(false)
                    viewContact(selectedMember)
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <ContactDialog member={selectedMember} open={showContact} onOpenChange={setShowContact} />

      {/* Tasks Dialog */}
      <TasksDialog member={selectedMember} open={showTasks} onOpenChange={setShowTasks} timeRange={timeRange} />
    </>
  )
}
