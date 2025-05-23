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

export type SavedSymbol = {
  symbol: string
  description: string
  type: string
  currency: string
}

export type FinnhubSymbolRaw = {
  symbol: string
  description: string
  type: string
  currency: string
  // ...ignore all other fields; they’ll be silently ignored
  [key: string]: unknown
}

export type FinnhubQuote = {
  c: number // Current price
  h: number // High price of the day
  l: number // Low price of the day
  o: number // Open price of the day
  pc: number // Previous close price
  d: number // Change in price
  dp: number // Percentage change in price
}

export type PriceData = {
  symbol: string
  current_price: number
  highest_price: number
  lowest_price: number
  open_price: number
  previous_close: number
  change: number
  percent_change: number
}
