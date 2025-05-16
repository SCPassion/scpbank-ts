import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type Vault } from "../../lib/types"

type VaultTableProps = {
  vaults: Vault[]
}

export default function VaultTable({ vaults }: VaultTableProps) {
  const totalSavedAmount = vaults.reduce(
    (total, vault) => total + vault.saved_amount,
    0,
  )
  const totalTarget = vaults.reduce((total, vault) => total + vault.target, 0)
  return (
    <Table>
      <TableCaption>A list of your vaults.</TableCaption>
      <TableHeader>
        <TableRow className="text-xl">
          <TableHead className="w-[100px] font-bold">Vault's Purpose</TableHead>
          <TableHead className="text-center font-bold">
            Number of Weeks
          </TableHead>
          <TableHead className="text-center font-bold">Saved amount</TableHead>
          <TableHead className="text-right font-bold">Target</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-lg">
        {vaults.map((vault) => (
          <TableRow key={vault.id}>
            <TableCell className="font-medium">{vault.purpose}</TableCell>
            <TableCell className="text-center">
              {vault.number_of_weeks}
            </TableCell>
            <TableCell className="text-center">{`$${vault.saved_amount}`}</TableCell>
            <TableCell className="text-right">{`$${vault.target}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="text-xl">
          <TableHead colSpan={4} className="w-[100px] text-center font-bold">
            Overall
          </TableHead>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="text-center">
            Total saved
          </TableCell>
          <TableCell
            colSpan={2}
            className="text-center"
          >{`$${totalSavedAmount}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="text-center">
            Vaults' Target in total
          </TableCell>
          <TableCell
            colSpan={2}
            className="text-center"
          >{`$${totalTarget}`}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
