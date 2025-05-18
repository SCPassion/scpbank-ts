import type { SupabaseResponse, Vault } from "@/lib/types"
import { supabase } from "@/supabase-client"
import type { PostgrestError, User } from "@supabase/supabase-js"

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

// This function demonstrates how to add a row in the vaults table
export async function createVault(
  user: User,
  goalName: string,
  targetAmount: number,
  durationInWeeks: number,
) {
  //Insert user data into the sale table, store the error to a new variable called insertError
  const { error: insertError }: { error: PostgrestError | null } =
    await supabase.from("vaults").insert({
      user_id: user.id,
      created_at: new Date().toISOString(),
      user_email: user.email,
      purpose: goalName,
      target: targetAmount,
      number_of_weeks: durationInWeeks,
      saved_amount: 0,
    })

  if (insertError) {
    console.error("Error inserting user into table:", insertError.message)
    return
  }
  console.log("Vault added into table:", user.email)
}

// This function demonstrates how to update a row in the vaults table
export async function addMoneyToVault(
  user: User,
  vaultId: number,
  amount: number,
  vaults: Vault[],
) {
  if (!user) {
    console.error("User is not logged in")
    return
  }

  // Get the current saved amount for the vault
  const currentSavedAmount =
    vaults.find((vault) => vault.id === vaultId)?.saved_amount || 0

  // Update the vault with the new saved amount
  const { error } = await supabase
    .from("vaults")
    .update({
      saved_amount: Number(currentSavedAmount) + Number(amount),
    })
    .eq("id", vaultId)
    .eq("user_email", user.email)

  if (error) {
    console.error("Error adding money to vault:", error.message)
    return
  }
  console.log("Money added to vault successfully")
}
