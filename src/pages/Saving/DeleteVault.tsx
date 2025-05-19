import { useEffect, useId } from "react"
import { useUserStore, useVaultStore } from "@/store/store"
import { useNavigate } from "react-router"
import { deleteVault, fetchVaults } from "@/functions/vaultOperations"

export default function DeleteVault() {
  const id = useId()
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const { vaults, setVaults } = useVaultStore()

  useEffect(() => {
    user?.email && fetchVaults({ email: user.email, setVaults })

    if (user?.email === undefined) {
      console.log("User email is undefined")
      return
    }
  }, [user])

  function handleForm(formData: FormData) {
    const vaultId = formData.get("vault")

    if (vaultId === null) {
      if (vaultId === -1) {
        console.error("No vault selected")
        return
      }
    }
    console.log("Vault ID to delete:", vaultId)
    deleteVault(user, Number(vaultId))
    navigate("..", { replace: true })
  }
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 py-8">
      <h2 className="font-bol text-4xl">Delete Vault</h2>
      <p>
        Target can be set incorrectly, and you don't have to blame yourself for
        that. You can delete a vault if you want to start over or if you no
        longer need it. Deleting a vault will remove all your progress and
        information related to that vault.
      </p>

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
