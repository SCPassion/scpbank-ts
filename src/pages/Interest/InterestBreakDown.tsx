import { InterestVisualization } from "@/components/InterestVisualization"
import { useEffect } from "react"
import { type SupabaseInterestRecordResponse } from "@/lib/types"
import { useUserStore, useInterestRecordsStore } from "@/store/store"
import { supabase } from "@/supabase-client"

export default function InterestBreakDown() {
  const user = useUserStore((state) => state.user)
  const { interestRecords, setInterestRecords } = useInterestRecordsStore()
  console.log("Interest Records:", interestRecords)
  async function fetchAllInterestRecords() {
    try {
      const { data, error }: SupabaseInterestRecordResponse = await supabase
        .from("interest")
        .select("principal_amount, apr, time, contribute_amount")
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

  return (
    <div className="flex flex-col items-center gap-8 px-35 py-4">
      <h1 className="text-4xl font-bold">Interest Break Down</h1>
      <InterestVisualization />
    </div>
  )
}
