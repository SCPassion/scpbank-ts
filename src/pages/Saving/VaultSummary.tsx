import { useUserStore, useVaultStore } from "@/store/store"
import { supabase } from "@/supabase-client"
import type { PostgrestError } from "@supabase/supabase-js"
import { useEffect } from "react"
import { type Vault } from "@/lib/types"
import VaultTable from "./VaultTable"

type SupabaseResponse = {
  data: Vault[] | null
  error: PostgrestError | null
}

export default function VaultSummary() {
  const user = useUserStore((state) => state.user)
  const { vaults, setVaults } = useVaultStore()

  useEffect(() => {
    user?.email && fetchVaults(user.email)

    if (user?.email === undefined) {
      console.log("User email is undefined")
      return
    }
  }, [user])

  async function fetchVaults(email: string) {
    try {
      const { data, error }: SupabaseResponse = await supabase
        .from("vaults")
        .select("purpose, target, number_of_weeks, id, saved_amount")
        .eq("user_email", email)

      if (error) {
        throw new Error(`Error fetching vaults: ${error.message}`)
      }
      if (data) {
        setVaults(data)
      }
    } catch (error) {
      console.error("Error fetching vaults:", error)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 px-35 py-4">
      <h1 className="text-4xl font-bold">Vault Summary</h1>
      {vaults.length > 0 ? (
        <VaultTable vaults={vaults} />
      ) : (
        <p>No vaults found.</p>
      )}
    </div>
  )
}
