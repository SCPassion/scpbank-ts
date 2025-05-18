import { InterestVisualization } from "@/components/InterestVisualization"

export default function InterestBreakDown() {
  return (
    <div className="flex flex-col items-center gap-8 px-35 py-4">
      <h1 className="text-4xl font-bold">Interest Break Down</h1>
      <InterestVisualization />
    </div>
  )
}
