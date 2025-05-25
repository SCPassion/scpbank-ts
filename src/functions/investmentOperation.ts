import type {
  FinnhubQuote,
  FinnhubSymbolRaw,
  Portfolio,
  PriceData,
  SavedSymbol,
} from "@/lib/types"
import { supabase } from "@/supabase-client"
import type { User } from "@supabase/supabase-js"

export async function addStockToDatabase(
  user: User,
  symbol: string,
  amount: number,
  entryPrice: number,
  setError: (error: string) => void,
) {
  try {
    if (user) {
      // Check if the user already has an investment with the same symbol
      const { data } = await supabase
        .from("investments")
        .select("*")
        .eq("user_id", user.id)
        .eq("symbol", symbol)

      console.log("Checking for existing investment:", data)
      if (data && data.length > 0) {
        throw new Error(
          `You already have an investment in ${symbol}. Please update your existing investment instead.`,
        )
      }

      const { error: insertError } = await supabase.from("investments").insert({
        symbol,
        amount_usd: amount,
        entry_price: entryPrice,
        user_id: user.id,
        created_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("Error inserting stock into database:", insertError)
        throw new Error(insertError.message)
      }
      console.log("stock recorded")
      setError("")
    }
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    }
  }
}

type FetchStockSymbolsProps = {
  setStockSymbols: (stockSymbols: SavedSymbol[]) => void
}
export async function fetchStockSymbols({
  setStockSymbols,
}: FetchStockSymbolsProps) {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
  )

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data: FinnhubSymbolRaw[] = await response.json()

  const filtered: SavedSymbol[] = data.map((item: any) => ({
    symbol: item.symbol,
    description: item.description,
    type: item.type,
    currency: item.currency,
  }))

  setStockSymbols(filtered)
}

export async function fetchPortfolio(
  user: User,
  setPortfolio: (portfolio: Portfolio[]) => void,
) {
  if (!user) return
  const { data, error } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching portfolio data:", error)
    return
  }
  if (!data) {
    console.log("No portfolio data found")
    return
  }
  setPortfolio(data)
}

export async function fetchPortfolioPrice(
  portfolio: Portfolio[],
  setPriceDatas: (priceData: PriceData[]) => void,
) {
  const promisesArray: Promise<Response>[] = portfolio.map((item) =>
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
    ),
  )
  const responses: Response[] = await Promise.all(promisesArray)
  const data: FinnhubQuote[] = await Promise.all(
    responses.map((res) => res.json()),
  )
  const priceData: PriceData[] = data.map((item, index) => ({
    symbol: portfolio[index].symbol,
    current_price: item.c,
    highest_price: item.h,
    lowest_price: item.l,
    open_price: item.o,
    previous_close: item.pc,
    change: item.d,
    percent_change: item.dp,
    entry_price: portfolio[index].entry_price,
    total_investment: portfolio[index].amount_usd,
  }))
  setPriceDatas(priceData)
}

export async function UpdateInvestment(
  user: User | null,
  symbol: string,
  entryPrice: number,
  totalInvestment: number,
) {
  if (!user) return

  const { error } = await supabase
    .from("investments")
    .update({
      entry_price: entryPrice,
      amount_usd: totalInvestment,
    })
    .eq("symbol", symbol)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error updating investment:", error)
    throw new Error(error.message)
  }

  console.log("Investment updated successfully")
}
