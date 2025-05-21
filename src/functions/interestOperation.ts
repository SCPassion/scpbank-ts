import { type User } from "@supabase/supabase-js"
import { supabase } from "@/supabase-client"
import type {
  InterestBreakDown,
  InterestRecord,
  SupabaseInterestRecordResponse,
} from "@/lib/types"

export async function createSavingRecord(
  user: User | null,
  principalAmount: number,
  annualInterestRate: number,
  time: number,
  contributionAmount: number,
) {
  try {
    if (user) {
      const { error } = await supabase.from("interest").insert({
        principal_amount: principalAmount,
        apr: annualInterestRate,
        time,
        contribute_amount: contributionAmount,
        user_email: user.email,
        user_id: user.id,
        created_at: new Date().toISOString(),
      })

      if (error) {
        throw new Error(error.message)
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error inserting saving record:", error.message)
    }
  }
}

export async function fetchAllInterestRecords(
  user: User,
  setInterestRecords: (records: InterestRecord[]) => void,
) {
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

export function calculateInterestBreakdown({
  principal_amount,
  apr,
  time,
  contribute_amount, // monthly contribution,
  setChartData, // function to set chart data
}: Omit<InterestBreakDown, "total"> & {
  setChartData: (data: InterestBreakDown[]) => void
}) {
  const r = apr / 100
  const n = 12
  const result: InterestBreakDown[] = []

  for (let year = 1; year <= time; year++) {
    const compoundFactor = Math.pow(1 + r / n, n * year)
    const futureValue = principal_amount * compoundFactor

    const contributionFutureValue =
      contribute_amount > 0
        ? contribute_amount * ((compoundFactor - 1) / (r / n))
        : 0

    const total = futureValue + contributionFutureValue

    result.push({
      time: year,
      total: parseFloat(total.toFixed(2)),
      principal_amount: parseFloat(futureValue.toFixed(2)),
      contribute_amount: parseFloat(contributionFutureValue.toFixed(2)),
      apr: parseFloat(
        (total - (principal_amount + contribute_amount * n * year)).toFixed(2),
      ),
    })
  }

  console.log("Yearly Breakdown:", result)
  setChartData(result)
}
