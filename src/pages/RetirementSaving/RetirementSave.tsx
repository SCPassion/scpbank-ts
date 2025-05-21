import React from "react"
import { type FutureSaving } from "@/lib/types"
import { calculateSavings } from "@/functions/retirementOperation"

export default function RetirementSave() {
  const [futureSavings, setFutureSavings] = React.useState<
    FutureSaving[] | null
  >(null)

  const id = React.useId()
  function handleFormAction(formData: FormData) {
    const age = Number(formData.get("age"))
    const monthlyInvest = Number(formData.get("monthlyInvest"))
    const apr = Number(formData.get("apr")) / 100

    if (age < 18 || monthlyInvest <= 0 || apr <= 0) {
      console.error("Invalid input values")
      return
    }

    // Perform calculations and navigate to the results page
    setFutureSavings(calculateSavings(age, monthlyInvest, apr))
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 py-8 text-center">
      <h2 className="font-bol text-4xl">See Your Future Savings at a Glance</h2>
      <p>
        Want to know how much your monthly contributions will grow over time?
        <br />
        Enter your age and how much you can save each month. <br />
        We’ll show your projected savings at different ages— assuming consistent
        growth. <br />
        It’s your retirement forecast!
      </p>
      <section className="flex justify-center gap-8">
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
        {futureSavings && (
          <div className="mt-8 space-y-8">
            <h3 className="text-2xl font-bold text-lime-700">
              Your Future Savings are Projected at:
            </h3>
            <ul className="list-inside list-disc space-y-4">
              {futureSavings.map((saving) => (
                <li key={saving.age} className="text-xl">
                  At{" "}
                  <span className="text-2xl font-semibold">
                    age {saving.age}
                  </span>
                  , you will have:{" "}
                  <span className="text-2xl font-semibold">
                    ${saving.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
