import type { PostgrestError } from "@supabase/supabase-js"

export type Vault = {
  purpose: string
  target: number
  number_of_weeks: number
  id: number
  saved_amount: number
}

// This type is used to represent the response from Supabase when fetching vaults
export type SupabaseResponse = {
  data: Vault[] | null
  error: PostgrestError | null
}

export type InterestRecord = {
  principal_amount: number
  apr: number
  time: number
  contribute_amount: number
  id: number
}

export type InterestBreakDown = {
  time: number
  total: number
  principal_amount: number
  contribute_amount: number
  apr: number
}

// This type is used to represent the response from Supabase when fetching interest records
export type SupabaseInterestRecordResponse = {
  data: InterestRecord[] | null
  error: Error | null
}

// This type is used for calculating future savings
export type FutureSaving = {
  age: number
  total: number
}
