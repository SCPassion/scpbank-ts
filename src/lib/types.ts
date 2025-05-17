import type { PostgrestError } from "@supabase/supabase-js"

export type Vault = {
  purpose: string
  target: number
  number_of_weeks: number
  id: number
  saved_amount: number
}

export type SupabaseResponse = {
  data: Vault[] | null
  error: PostgrestError | null
}
