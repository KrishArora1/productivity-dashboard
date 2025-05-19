"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import type { TeamMember } from "@/lib/types"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

// Extend jsPDF type with autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

interface ExportMenuProps {
  teamData: TeamMember[]
  timeRange: string
}

export function ExportMenu({ teamData, timeRange }: ExportMenuProps) {
  const handleExportCSV = () => {
    // Create CSV content
    const headers = ["Name", "Role", "Productivity", "Tasks Completed", "Total Tasks", "Hours Logged", "Last Active"]
    const csvContent = [
      headers.join(","),
      ...teamData.map((member) => {
        return [
          member.name,
          member.role,
          `${member.productivityScore}%`,
          member.tasksCompleted,
          member.totalTasks,
          member.hoursLogged,
          new Date(member.lastActive).toLocaleString(),
        ].join(",")
      }),
    ].join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `team-productivity-${timeRange.toLowerCase()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: `Data exported as CSV for ${timeRange.toLowerCase()} view`,
    })
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(16)
    doc.text(`Team Productivity Report - ${timeRange}`, 14, 15)
    
    // Add date
    doc.setFontSize(10)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22)

    // Prepare table data
    const tableData = teamData.map((member) => [
      member.name,
      member.role,
      `${member.productivityScore}%`,
      member.tasksCompleted.toString(),
      member.totalTasks.toString(),
      member.hoursLogged.toString(),
      new Date(member.lastActive).toLocaleString(),
    ])

    // Add table
    autoTable(doc, {
      head: [["Name", "Role", "Productivity", "Tasks Completed", "Total Tasks", "Hours Logged", "Last Active"]],
      body: tableData,
      startY: 30,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
    })

    // Save the PDF
    doc.save(`team-productivity-${timeRange.toLowerCase()}.pdf`)

    toast({
      title: "Export successful",
      description: `Data exported as PDF for ${timeRange.toLowerCase()} view`,
    })
  }

  const handleExportExcel = () => {
    // Prepare worksheet data
    const worksheet = XLSX.utils.json_to_sheet(
      teamData.map((member) => ({
        Name: member.name,
        Role: member.role,
        Productivity: `${member.productivityScore}%`,
        "Tasks Completed": member.tasksCompleted,
        "Total Tasks": member.totalTasks,
        "Hours Logged": member.hoursLogged,
        "Last Active": new Date(member.lastActive).toLocaleString(),
      }))
    )

    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Team Productivity")

    // Generate Excel file
    XLSX.writeFile(workbook, `team-productivity-${timeRange.toLowerCase()}.xlsx`)

    toast({
      title: "Export successful",
      description: `Data exported as Excel for ${timeRange.toLowerCase()} view`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV}>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF}>Export as PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcel}>Export as Excel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
