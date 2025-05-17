import { useUserStore, useVaultStore } from "@/store/store"
import { useEffect } from "react"
import VaultTable from "./VaultTable"
import { fetchVaults } from "@/functions/vaultOperations"

export default function VaultSummary() {
  const user = useUserStore((state) => state.user)
  const { vaults, setVaults } = useVaultStore()

  useEffect(() => {
    user?.email && fetchVaults({ email: user.email, setVaults })

    if (user?.email === undefined) {
      console.log("User email is undefined")
      return
    }
  }, [user])

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
