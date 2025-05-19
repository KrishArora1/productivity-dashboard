"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Calendar, MessageSquare, Github, Linkedin } from "lucide-react"
import type { TeamMember } from "@/lib/types"
import { formatDate } from "@/lib/data-utils"

interface ContactDialogProps {
  member: TeamMember | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ContactDialog({ member, open, onOpenChange }: ContactDialogProps) {
  if (!member || !member.contactInfo) return null

  const contactInfo = member.contactInfo

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>Contact details for {member.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with avatar and basic info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <Badge variant="outline" className={getRoleBadgeColor(member.role)}>
                {member.role}
              </Badge>
              <p className="text-sm text-muted-foreground">{contactInfo.department} Department</p>
            </div>
          </div>

          {/* Contact details */}
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-[20px_1fr] items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href={`mailto:${contactInfo.email}`} className="text-sm hover:underline">
                {contactInfo.email}
              </a>
            </div>
            <div className="grid grid-cols-[20px_1fr] items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href={`tel:${contactInfo.phone}`} className="text-sm hover:underline">
                {contactInfo.phone}
              </a>
            </div>
            <div className="grid grid-cols-[20px_1fr] items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm">{contactInfo.location}</span>
            </div>
            <div className="grid grid-cols-[20px_1fr] items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm">Started on {formatDate(contactInfo.startDate)}</span>
            </div>
            <div className="grid grid-cols-[20px_1fr] items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-sm">Slack: {contactInfo.slackHandle}</span>
            </div>
            {contactInfo.githubUsername && (
              <div className="grid grid-cols-[20px_1fr] items-center gap-3">
                <Github className="h-5 w-5 text-primary" />
                <a
                  href={`https://github.com/${contactInfo.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {contactInfo.githubUsername}
                </a>
              </div>
            )}
            {contactInfo.linkedIn && (
              <div className="grid grid-cols-[20px_1fr] items-center gap-3">
                <Linkedin className="h-5 w-5 text-primary" />
                <a
                  href={`https://${contactInfo.linkedIn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {contactInfo.linkedIn}
                </a>
              </div>
            )}
          </div>

          {/* Manager info */}
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium mb-2">Reports To</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{contactInfo.manager.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{contactInfo.manager}</p>
                <p className="text-xs text-muted-foreground">Manager</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
