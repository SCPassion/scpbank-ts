import { useEffect, useState } from "react"
import { supabase } from "@/supabase-client"
import { useUserStore } from "@/store/store"
import type { FinnhubQuote, PriceData } from "@/lib/types"

type Portfolio = {
  id: number
  symbol: string
  amount_usd: number
  entry_price: number
  user_id: string
  created_at: string
}
export default function Portfolio() {
  const user = useUserStore((state) => state.user)
  const [portfolio, setPortfolio] = useState<Portfolio[] | null>()
  // Fetch the portfolio data from the database
  useEffect(() => {
    fetchPortfolio()
  }, [user])

  // This is used to fetch the price information for the investments
  useEffect(() => {
    fetchPortfolioPrice()
  }, [portfolio])

  async function fetchPortfolioPrice() {
    if (!portfolio) return
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
    }))
    console.log("Price data:", priceData)
  }

  async function fetchPortfolio() {
    if (!user) return
    const { data, error } = await supabase
      .from("investments")
      .select("*")
      .eq("user_id", user.id)

    if (error) {
      console.error("Error fetching portfolio data:", error)
      return
    }
    setPortfolio(data)
  }
  return <h1>Port</h1>
}
