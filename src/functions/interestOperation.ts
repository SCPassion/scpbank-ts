import { type User } from "@supabase/supabase-js"
import { supabase } from "@/supabase-client"

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
