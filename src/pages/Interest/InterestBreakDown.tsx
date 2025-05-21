import { InterestVisualization } from "@/components/InterestVisualization"
import { useEffect, useId, useState } from "react"
import { useUserStore, useInterestRecordsStore } from "@/store/store"
import {
  calculateInterestBreakdown,
  fetchAllInterestRecords,
} from "@/functions/interestOperation"
import { type InterestBreakDown } from "@/lib/types"

export default function InterestBreakDown() {
  const id = useId()
  const user = useUserStore((state) => state.user)
  const { interestRecords, setInterestRecords } = useInterestRecordsStore()
  const [chartData, setChartData] = useState<InterestBreakDown[] | null>(null)
  useEffect(() => {
    if (user) {
      fetchAllInterestRecords(user, setInterestRecords)
    }
  }, [user])

  function formAction(formData: FormData) {
    const interestRecordId = formData.get("interestRecord")
    if (interestRecordId !== null) {
      if (Number(interestRecordId) === -1) {
        console.error("No interest record selected")
        return
      }

      const interestRecord = interestRecords.find(
        (record) => record.id === Number(interestRecordId),
      )

      if (interestRecord) {
        calculateInterestBreakdown({
          principal_amount: interestRecord.principal_amount,
          apr: interestRecord.apr,
          time: interestRecord.time,
          contribute_amount: interestRecord.contribute_amount, // monthly contribution
          setChartData,
        })
      } else {
        console.error("Interest record not found")
      }
    }
  }
  return (
    <div className="flex flex-col items-center gap-8 px-20 py-4">
      <form
        className="mt-4 flex flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
        action={formAction}
      >
        <h3 className="text-3xl font-bold text-lime-800">
          Select your prediction plan now!
        </h3>
        <select
          name="interestRecord"
          id={id + "_select"}
          className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
          defaultValue={-1}
          required
        >
          <option value={-1}>-- Select a plan --</option>
          {interestRecords.map((interestRecord) => (
            <option key={interestRecord.id} value={interestRecord.id}>
              {interestRecord.principal_amount} USD principal amount,{" "}
              {interestRecord.apr}% APR, {interestRecord.time} years,{" "}
              {interestRecord.contribute_amount} USD monthly contribution
            </option>
          ))}
        </select>
        <button className="cursor-pointer rounded-full bg-lime-800 px-7 py-4 font-bold text-white opacity-50 shadow-lg transition-all duration-300 hover:opacity-100">
          Predict your investment now!
        </button>
        {chartData && <InterestVisualization chartData={chartData} />}
      </form>
    </div>
  )
}
