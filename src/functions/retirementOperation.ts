import type { FutureSaving } from "@/lib/types"

export function calculateSavings(
  currentAge: number,
  monthlyContribution: number,
  annualInterestRate: number = 0.05,
) {
  const maxAge = 65
  const step = (maxAge - currentAge) / 4
  const targetAges = Array.from({ length: 4 }, (_, i) =>
    Math.round(currentAge + (i + 1) * step),
  )
  const monthlyRate = annualInterestRate / 12
  const results: FutureSaving[] = []

  for (let targetAge of targetAges) {
    const yearsToTarget = targetAge - currentAge

    if (yearsToTarget <= 0) {
      results.push({ age: targetAge, total: 0 })
      continue
    }

    const months = yearsToTarget * 12
    const futureValue =
      monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

    results.push({
      age: targetAge,
      total: Math.round(futureValue),
    })
  }

  return results
}
