import type { SupabaseResponse, Vault } from "@/lib/types"
import { supabase } from "@/supabase-client"
import type { User } from "@supabase/supabase-js"

type fetchVaultsProps = {
  email: string
  setVaults: (vaults: Vault[]) => void
}

// This function demonstrates how to fetch rows from the vaults table
export async function fetchVaults({ email, setVaults }: fetchVaultsProps) {
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

// This function demonstrates how to delete a row in the vaults table
export async function deleteVault(user: User | null, vaultId: number) {
  if (!user) {
    console.error("User is not logged in")
    return
  }
  const { error } = await supabase
    .from("vaults")
    .delete()
    .eq("id", vaultId)
    .eq("user_email", user.email)

  if (error) {
    console.error("Error deleting vault:", error.message)
    return
  }

  console.log("Vault deleted successfully")
}
