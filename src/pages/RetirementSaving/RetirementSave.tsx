import React from "react"

export default function RetirementSave() {
  const id = React.useId()
  function handleFormAction(formData: FormData) {
    const age = Number(formData.get("age"))
    const monthlyInvest = Number(formData.get("monthlyInvest"))
    const apr = Number(formData.get("apr")) / 100

    if (age < 18 || monthlyInvest <= 0 || apr <= 0) {
      console.error("Invalid input values")
      return
    }

    console.log("Age:", age)
    console.log("Monthly Investment Amount:", monthlyInvest)
    console.log("Expected Annual Interest Rate:", apr)

    // Perform calculations and navigate to the results page
    console.log(calculateSavings(age, monthlyInvest, apr))
  }

  function calculateSavings(
    currentAge: number,
    monthlyContribution: number,
    annualInterestRate: number = 0.05,
  ) {
    const targetAges = [20, 30, 40, 50, 60]
    const monthlyRate = annualInterestRate / 12
    const results = []

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

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 py-8 text-center">
      <h2 className="font-bol text-4xl">See Your Future Savings at a Glance</h2>
      <p>
        Want to know how much your monthly contributions will grow over time?
        <br />
        Enter your age and how much you can save each month. <br />
        We’ll show your projected savings at ages 40, 50, 60, and 65 — assuming
        consistent growth. <br />
        It’s your retirement forecast!
      </p>
      <section>
        <form
          className="hover:border-lime-00 flex w-100 flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleFormAction}
        >
          <label
            htmlFor={`${id}-age`}
            className="text-xl font-bold text-lime-700"
          >
            Your Current Age:
          </label>
          <input
            type="number"
            name="age"
            id={`${id}-age`}
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            required
            min={18}
          />
          <label
            htmlFor={`${id}-monthlyInvest`}
            className="text-xl font-bold text-lime-700"
          >
            Monthly Investment Amount:
          </label>
          <input
            type="number"
            name="monthlyInvest"
            id={`${id}-monthlyInvest`}
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            required
          />
          <label
            htmlFor={`${id}-apr`}
            className="text-xl font-bold text-lime-700"
          >
            Expected Annual Interest Rate (%):
          </label>
          <input
            type="number"
            name="apr"
            id={`${id}-apr`}
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            required
          />
          <button className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700">
            Submit!
          </button>
        </form>
      </section>
    </div>
  )
}
