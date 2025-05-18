import { useId } from "react"
import { useUserStore, useVaultStore } from "@/store/store"
import { supabase } from "@/supabase-client"
import { useNavigate } from "react-router"
import { addMoneyToVault } from "@/functions/vaultOperations"

export default function AddMoney() {
  const id = useId()
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const vaults = useVaultStore((state) => state.vaults)

  // This function demonstrates how to update a row in the vaults table
  // async function addMoneyToVault(vaultId: number, amount: number) {
  //   if (!user) {
  //     console.error("User is not logged in")
  //     return
  //   }

  //   // Get the current saved amount for the vault
  //   const currentSavedAmount =
  //     vaults.find((vault) => vault.id === vaultId)?.saved_amount || 0

  //   // Update the vault with the new saved amount
  //   const { error } = await supabase
  //     .from("vaults")
  //     .update({
  //       saved_amount: currentSavedAmount + amount,
  //     })
  //     .eq("id", vaultId)
  //     .eq("user_email", user.email)

  //   if (error) {
  //     console.error("Error adding money to vault:", error.message)
  //     return
  //   }
  //   console.log("Money added to vault successfully")
  // }

  function handleForm(formData: FormData) {
    const vaultId = formData.get("vault")
    const amount = formData.get("amount")
    if (vaultId !== null) {
      if (Number(vaultId) === -1) {
        console.error("No vault selected")
        return
      }
    }

    if (amount !== null) {
      if (Number(amount) === 0) {
        console.log("Amount is unchanged")
        return
      }
    }
    console.log("Vault ID to add money:", vaultId)
    console.log("Amount to add:", amount)
    if (user) {
      addMoneyToVault(user, Number(vaultId), Number(amount), vaults)
      navigate("..", { replace: true })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 py-8">
      <h2 className="font-bol text-4xl">
        Pick up your vault and add money now!
      </h2>
      <p>
        You can add money to your vault at any time. This is a great way to
        increase your savings and reach your goals faster.
      </p>

      <form
        className="hover:border-lime-00 flex flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
        action={handleForm}
      >
        <label
          htmlFor={id + "_select"}
          className="text-xl font-bold text-lime-700"
        >
          Select a vault to add money:
        </label>
        <select
          name="vault"
          id={id + "_select"}
          className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
          defaultValue={-1}
          required
        >
          <option value={-1}>-- Select a vault --</option>
          {vaults.map((vault) => (
            <option key={vault.id} value={vault.id}>
              {vault.purpose}
            </option>
          ))}
        </select>

        <label
          htmlFor={id + "_amount"}
          className="text-xl font-bold text-lime-700"
        >
          How much money do you want to add?
        </label>
        <input
          className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
          type="number"
          placeholder="0"
          name="amount"
          id={id + "_amount"}
          required
        />
        <button
          type="submit"
          className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
        >
          Add money now
        </button>
      </form>
    </div>
  )
}
