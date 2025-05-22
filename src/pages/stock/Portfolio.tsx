import { useEffect, useState } from "react"
import { supabase } from "@/supabase-client"
import { useUserStore } from "@/store/store"

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

  console.log("Portfolio data:", portfolio)
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
