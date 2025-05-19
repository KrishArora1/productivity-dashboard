"use client"

import * as React from "react"

interface ChartProps {
  data: any[]
  children: React.ReactNode
  className?: string
}

export const Chart = React.forwardRef<SVGSVGElement, ChartProps>(({ data, children, className, ...props }, ref) => {
  return (
    <svg viewBox={`0 0 300 200`} className={className} ref={ref} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { data })
        }
        return child
      })}
    </svg>
  )
})
Chart.displayName = "Chart"

interface ChartContainerProps {
  children: React.ReactNode
  className?: string
}

export const ChartContainer = ({ children, className, ...props }: ChartContainerProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipProps {
  content: React.ReactNode
}

export const ChartTooltip = ({ content }: ChartTooltipProps) => {
  return null
}
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps {
  [key: string]: any
}

export const ChartTooltipContent = ({ active, payload }: ChartTooltipContentProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded-md shadow-md">
        {payload.map((item, index) => (
          <p key={`tooltip-${index}`} className="text-sm">
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    )
  }

  return null
}
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartLegendProps {
  children?: React.ReactNode
  layout?: "horizontal" | "vertical"
  verticalAlign?: "top" | "middle" | "bottom"
  align?: "left" | "center" | "right"
}

export const ChartLegend = ({ children, layout, verticalAlign, align }: ChartLegendProps) => {
  const justifyContent = align === "left" ? "start" : align === "right" ? "end" : "center"
  const alignItems = verticalAlign === "top" ? "start" : verticalAlign === "bottom" ? "end" : "center"

  return (
    <div
      className={`flex ${layout === "vertical" ? "flex-col" : "flex-row"} gap-2`}
      style={{ justifyContent, alignItems }}
    >
      {children}
    </div>
  )
}
ChartLegend.displayName = "ChartLegend"

interface ChartLegendItemProps {
  name: string
  color: string
}

export const ChartLegendItem = ({ name, color }: ChartLegendItemProps) => {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-sm">{name}</span>
    </div>
  )
}
ChartLegendItem.displayName = "ChartLegendItem"

export const ChartGrid = () => {
  return null
}
ChartGrid.displayName = "ChartGrid"

export const ChartXAxis = () => {
  return null
}
ChartXAxis.displayName = "ChartXAxis"

export const ChartYAxis = () => {
  return null
}
ChartYAxis.displayName = "ChartYAxis"

export const ChartArea = () => {
  return null
}
ChartArea.displayName = "ChartArea"

export const ChartLine = () => {
  return null
}
ChartLine.displayName = "ChartLine"

export const ChartBar = () => {
  return null
}
ChartBar.displayName = "ChartBar"

export const ChartPie = () => {
  return null
}
ChartPie.displayName = "ChartPie"
