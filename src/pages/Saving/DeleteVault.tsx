import { useId } from "react"
import { useUserStore, useVaultStore } from "@/store/store"
import { supabase } from "@/supabase-client"
import { useNavigate } from "react-router"

export default function DeleteVault() {
  const id = useId()
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const vaults = useVaultStore((state) => state.vaults)

  // This is a function to delete a vault from the database
  async function deleteVault(vaultId: number) {
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
    navigate("..", { replace: true })
  }

  function handleForm(formData: FormData) {
    const vaultId = formData.get("vault")

    if (vaultId === null) {
      if (vaultId === -1) {
        console.error("No vault selected")
        return
      }
    }
    console.log("Vault ID to delete:", vaultId)
    deleteVault(Number(vaultId))
  }
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 py-8">
      <h2 className="font-bol text-4xl">Delete Vault</h2>

      <form
        className="hover:border-lime-00 flex flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
        action={handleForm}
      >
        <label
          htmlFor={id + "_select"}
          className="text-xl font-bold text-lime-700"
        >
          Select a vault to delete:
        </label>
        <select
          name="vault"
          id={id + "_select"}
          className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
          defaultValue={-1}
          required
        >
          <option value={-1}>-- Select a vault to delete --</option>
          {vaults.map((vault) => (
            <option key={vault.id} value={vault.id}>
              {vault.purpose}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="cursor-pointer rounded-2xl bg-rose-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-rose-700"
        >
          Delete
        </button>

        <p className="text-xl font-bold text-red-800">
          Once you delete a vault, you will lose all your progress.
        </p>
      </form>
    </div>
  )
}
