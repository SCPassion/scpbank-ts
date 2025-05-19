import { InterestVisualization } from "@/components/InterestVisualization"
import { useEffect, useId } from "react"
import { type SupabaseInterestRecordResponse } from "@/lib/types"
import { useUserStore, useInterestRecordsStore } from "@/store/store"
import { supabase } from "@/supabase-client"

export default function InterestBreakDown() {
  const id = useId()
  const user = useUserStore((state) => state.user)
  const { interestRecords, setInterestRecords } = useInterestRecordsStore()
  async function fetchAllInterestRecords() {
    try {
      const { data, error }: SupabaseInterestRecordResponse = await supabase
        .from("interest")
        .select("principal_amount, apr, time, contribute_amount, id")
        .eq("user_email", user?.email)

      if (error) {
        throw new Error(`Error fetching interest records: ${error.message}`)
      }

      if (data) {
        setInterestRecords(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching interest records:", error.message)
      }
    }
  }
  useEffect(() => {
    if (user) {
      fetchAllInterestRecords()
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

      console.log(interestRecord)
    }
  }
  return (
    <div className="flex flex-col items-center gap-8 px-20 py-4">
      <h1 className="text-4xl font-bold">Select your prediction plan!</h1>
      <form
        className="flex flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
        action={formAction}
      >
        <h3 className="text-3xl font-bold text-lime-800">
          Set up your investment calculation now!
        </h3>
        <select
          name="interestRecord"
          id={id + "_select"}
          className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
          defaultValue={-1}
          required
        >
          <option value={-1}>-- Select a vault to delete --</option>
          {interestRecords.map((interestRecord) => (
            <option key={interestRecord.id} value={interestRecord.id}>
              {interestRecord.principal_amount} USD principal amount,{" "}
              {interestRecord.apr}% APR, {interestRecord.time} years,
              {interestRecord.contribute_amount} USD monthly contribution
            </option>
          ))}
        </select>
        <button className="cursor-pointer rounded-full bg-lime-800 px-7 py-4 font-bold text-white opacity-50 shadow-lg transition-all duration-300 hover:opacity-100">
          Predict your investment now!
        </button>
        <InterestVisualization />
      </form>
    </div>
  )
}
