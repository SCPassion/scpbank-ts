import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
        <CardTitle>{chartData.length}-year Investment return</CardTitle>
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
              right: 12,
              bottom: 20, // add space for x label
              top: 20, // add space for y label
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(time) => `${time}`}
              label={{
                value: "Year(s) later",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis
              type="number"
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Amount ($)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle" },
              }}
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
