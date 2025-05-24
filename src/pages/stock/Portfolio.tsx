import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { FaArrowTrendUp } from "react-icons/fa6"
import { FaArrowTrendDown } from "react-icons/fa6"
import { supabase } from "@/supabase-client"
import { useUserStore, usePriceDatasStore } from "@/store/store"
import type { Portfolio } from "@/lib/types"
import {
  fetchPortfolio,
  fetchPortfolioPrice,
} from "@/functions/investmentOperation"

type InvestmentDataFormat = {
  id: string
  created_at: string
  user_id: string
  symbol: string
  amount_usd: number
  entry_price: number
}
export default function Portfolio() {
  const user = useUserStore((state) => state.user)
  const { priceDatas, setPriceDatas, removePriceData } = usePriceDatasStore()
  const [portfolio, setPortfolio] = useState<Portfolio[] | null>(null)
  const navigate = useNavigate()
  // Fetch the portfolio data from the database
  useEffect(() => {
    user && fetchPortfolio(user, setPortfolio)
  }, [user])

  // Subscribe the delete events in the database
  useEffect(() => {
    if (!user || !user.email) return
    const subscription = supabase
      .channel("delete-investment")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "investments",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const investmentData = payload.old as InvestmentDataFormat
          removePriceData(investmentData.symbol)
          console.log("Investment deleted:", investmentData)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [user])

  // This is used to fetch the price information for the investments
  useEffect(() => {
    portfolio && fetchPortfolioPrice(portfolio, setPriceDatas)
  }, [portfolio])

  async function handleDeleteInDatabase(symbol: string) {
    try {
      if (user) {
        const { error } = await supabase
          .from("investments")
          .delete()
          .eq("symbol", symbol)
          .eq("user_id", user.id)

        if (error) {
          console.error("Error deleting stock from database:", error)
          throw new Error(error.message)
        }
        console.log("Stock deleted from database")
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting stock from database:", error)
      }
    }
  }
  return priceDatas ? (
    <table className="mx-auto mt-8 w-10/12 text-left text-sm text-gray-800 shadow-md hover:shadow-lg dark:text-gray-400">
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
            Current Gain / Loss %
          </th>
          <th scope="col" className="px-6 py-3">
            24hr Trends
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {priceDatas.length > 0 ? (
          priceDatas.map((item) => (
            <tr
              key={item.symbol}
              className="cursor-pointer border-b bg-white hover:bg-teal-50"
              onClick={() => navigate(`${item.symbol}`, { replace: true })}
            >
              <td className="px-6 py-4 font-medium whitespace-nowrap text-black dark:text-white">
                {item.symbol}
              </td>
              <td className="px-6 py-4">{item.total_investment}</td>
              <td className="px-6 py-4">{item.entry_price}</td>
              <td className="px-6 py-4">{item.current_price}</td>
              <td className="px-6 py-4">
                {item.entry_price - item.current_price > 0 ? (
                  <div className="flex items-center gap-4">
                    <FaArrowTrendDown fill="red" />
                    <span className="text-red-500">
                      {(
                        ((item.entry_price - item.current_price) /
                          item.entry_price) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <FaArrowTrendUp fill="green" />
                    <span className="text-green-500">
                      {((item.current_price - item.entry_price) /
                        item.entry_price) *
                        100}
                      %
                    </span>
                  </div>
                )}
              </td>

              <td className="px-6 py-4">
                {item.percent_change > 0 ? (
                  <div className="flex items-center gap-4">
                    <FaArrowTrendUp fill="green" />
                    <span className="text-green-500">
                      {item.percent_change}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <FaArrowTrendDown fill="red" />
                    <span className="text-red-500">{item.percent_change}%</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="cursor-pointer rounded-full bg-rose-500 px-4 py-2 font-medium text-white duration-300 hover:bg-red-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteInDatabase(item.symbol)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <p>No portfolio</p>
        )}
      </tbody>
    </table>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <p className="text-2xl font-bold text-gray-700">
        Loading your portfolio...
      </p>
    </div>
  )
}
