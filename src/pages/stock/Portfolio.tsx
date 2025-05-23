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

  console.log("Portfolio data:", portfolio)
  console.log("price data:", priceDatas)
  return (
    <table className="mx-auto mt-8 w-10/12 text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Symbol
          </th>
          <th scope="col" className="px-6 py-3">
            Amount USD
          </th>
          <th scope="col" className="px-6 py-3">
            Entry Price
          </th>
          <th scope="col" className="px-6 py-3">
            Current Price
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  )
}
