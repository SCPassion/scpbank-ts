"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { type InterestBreakDown } from "@/lib/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  total: {
    label: "total",
    color: "#056400",
  },
} satisfies ChartConfig

export function InterestVisualization({
  chartData,
}: {
  chartData: InterestBreakDown[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment return</CardTitle>
        <CardDescription>
          Showing your investment growth over time. <br />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="#006400"
              fillOpacity={0.4}
              stroke="#005400"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Note: Prediction is not guaranteed. Not for fiancial advice.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
