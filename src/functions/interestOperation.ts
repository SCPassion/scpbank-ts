import { type User } from "@supabase/supabase-js"
import { supabase } from "@/supabase-client"
import type {
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
