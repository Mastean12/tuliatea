import { Package, Clock, CheckCircle, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type StatCard = {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

type DashboardStatsProps = {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  savedAddresses: number
}

export function DashboardStats({
  totalOrders,
  pendingOrders,
  completedOrders,
  savedAddresses,
}: DashboardStatsProps) {
  const stats: StatCard[] = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <Package className="h-5 w-5" />,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: <Clock className="h-5 w-5" />,
      color: "text-amber-600 bg-amber-100",
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Saved Addresses",
      value: savedAddresses,
      icon: <MapPin className="h-5 w-5" />,
      color: "text-purple-600 bg-purple-100",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4 flex items-center gap-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              stat.color
            )}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.title}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
