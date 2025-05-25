import { supabase } from "@/supabase-client"
import type { User } from "@supabase/supabase-js"

export type CreateCategoryRecordProp = {
  user: User
  type: string
  amount: number
  category: string
  setError: (error: string) => void
}

export async function createCategoryRecord({
  user,
  type,
  amount,
  category,
  setError,
}: CreateCategoryRecordProp) {
  try {
    const { data, error: selectError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .eq("category", category)

    if (data && data.length > 0) {
      throw new Error(`You already have a ${category} category.`)
    }

    if (selectError) {
      throw new Error("Failed to check existing categories. Please try again.")
    }

    const { error } = await supabase.from("transactions").insert({
      user_id: user.id,
      type,
      amount,
      category,
      created_at: new Date().toISOString(),
    })

    if (error) {
      throw new Error(error.message)
    }

    console.log("category created")
    setError("") // Clear any previous error
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      setError(error.message)
    }
  }
}
