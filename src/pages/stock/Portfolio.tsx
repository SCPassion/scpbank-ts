import { useEffect, useState } from "react"
import { supabase } from "@/supabase-client"
import { useUserStore, usePriceDatasStore } from "@/store/store"
import type { FinnhubQuote, PriceData, Portfolio } from "@/lib/types"
import {
  fetchPortfolio,
  fetchPortfolioPrice,
} from "@/functions/investmentOperation"

export default function Portfolio() {
  const user = useUserStore((state) => state.user)
  const { priceDatas, setPriceDatas } = usePriceDatasStore()
  const [portfolio, setPortfolio] = useState<Portfolio[] | null>(null)
  // Fetch the portfolio data from the database
  useEffect(() => {
    user && fetchPortfolio(user, setPortfolio)
  }, [user])

  // This is used to fetch the price information for the investments
  useEffect(() => {
    portfolio && fetchPortfolioPrice(portfolio, setPriceDatas)
  }, [portfolio])

  console.log("Portfolio data:", priceDatas)
  return <h1>Port</h1>
}
