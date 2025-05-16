import { useUserStore } from "@/store/store"
import { supabase } from "@/supabase-client"
import type { PostgrestError, User } from "@supabase/supabase-js"
import { useEffect } from "react"
import { type Vault } from "@/lib/types"

type SupabaseResponse = {
  data: Vault[] | null
  error: PostgrestError | null
}

export default function VaultSummary() {
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    user?.email && fetchVaults(user.email)
  }, [user])

  async function fetchVaults(email: string) {
    try {
      const { data, error }: SupabaseResponse = await supabase
        .from("vaults")
        .select("purpose, target, number_of_weeks")
        .eq("user_email", email)

      if (error) {
        throw new Error(`Error fetching vaults: ${error.message}`)
      }
      if (data) {
        console.log("Vaults data:", data)
      }
    } catch (error) {
      console.error("Error fetching vaults:", error)
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Vault Summary</h1>
      <p className="mt-4 text-lg">This is the vault summary page.</p>
    </div>
  )
}
