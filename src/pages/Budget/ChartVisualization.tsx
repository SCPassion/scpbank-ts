import * as React from "react"
import { Legend, Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {} satisfies ChartConfig

export function ChartVisualization<
  T extends { category: string; amount: number; fill: string },
>({ chartData, type }: { chartData: T[]; type: "income" | "expense" }) {
  console.log(type)
  const totalNumber = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [])

  return (
    <Card className="flex flex-col bg-lime-100">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center text-3xl">{`${type[0].toUpperCase()}${type.slice(1)} Chart`}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] rounded-4xl bg-lime-50"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalNumber.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {`Total ${type[0].toUpperCase()}${type.slice(1)}`}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <Legend
              layout="horizontal" // Horizontal layout
              align="center" // Center align
              verticalAlign="bottom" // Place at the bottom
              wrapperStyle={{
                padding: "5px 50px",
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
