import type { Budget } from "@/lib/types"
import { supabase } from "@/supabase-client"
import type { PostgrestError, User } from "@supabase/supabase-js"

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

export async function removeCategoryRecord(
  user: User,
  budgetId: number,
  setError: (error: string) => void,
) {
  try {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", budgetId)
      .eq("user_id", user.id)

    if (error) {
      throw new Error(error.message)
    }

    console.log(`Delete budget with id ${budgetId}`)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      setError(error.message)
    }
  }
}

type EditCategoryRecordProps = {
  user: User
  amount: number
  type: "expense" | "income"
  category: string
  setError: (error: string) => void
}
export async function editCategoryRecord({
  user,
  type,
  amount,
  category,
  setError,
}: EditCategoryRecordProps) {
  try {
    const { error } = await supabase
      .from("transactions")
      .update({
        amount,
        category,
      })
      .eq("user_id", user.id)
      .eq("category", category)

    if (error) {
      console.log(`${error.message}`)
      throw new Error(error.message)
    }

    console.log("Category record updated successfully")
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      setError(error.message)
    }
  }
}

type FetchTransactionsResponse = {
  data: Budget[] | null
  error: PostgrestError | null
}
// Fetch everything from the supabase transactions table
export async function fetchTransactions(
  user: User,
  setError: (error: string) => void,
  setBudgets: (budgets: Budget[]) => void,
) {
  // Fetch user data from Supabase
  const { data, error }: FetchTransactionsResponse = await supabase
    .from("transactions")
    .select("id, type, amount, category")
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching user data:", error.message)
    setError("Failed to fetch user data. Please try again.")
    return
  }

  if (data) {
    setBudgets(data)
  }
}
