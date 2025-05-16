import { useId } from "react"
import { useUserStore } from "@/store/store"
import { supabase } from "@/supabase-client"
import type { PostgrestError, User } from "@supabase/supabase-js"
import { useNavigate } from "react-router"

export default function CreateVault() {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const id = useId()

  async function createVault(
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
      })

    if (insertError) {
      console.error("Error inserting user into table:", insertError.message)
      return
    }
    console.log("Vault added into table:", user.email)
    navigate("..", { replace: true })
  }

  async function formAction(loginData: FormData) {
    const data = Object.fromEntries(loginData)
    const goalName = data.goalName as string
    const targetAmount = Number(data.targetAmount)
    const durationInWeeks = Number(data.durationInWeeks)
    console.log(
      `Goal Name: ${goalName}, Target Amount: ${targetAmount}, Duration in Weeks: ${durationInWeeks}`,
    )
    user && createVault(user, goalName, targetAmount, durationInWeeks)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 py-8">
      <h2 className="font-bol text-4xl">
        Vaults are personalized savings goals.
      </h2>
      <p>
        Each one helps you track progress toward something specific — like a
        vacation, emergency fund, or new gadget — by adding money over time
        until your target amount is reached.
      </p>

      <form
        action={formAction}
        className="hover:border-lime-00 flex flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
      >
        <h3 className="text-3xl font-bold text-lime-800">
          Create your personal vault now!
        </h3>
        <div className="flex items-center gap-4">
          <label
            htmlFor={`${id}-goalName`}
            className="text-xl font-bold text-lime-700"
          >
            What do you want to save for?
          </label>
          <input
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            type="text"
            placeholder="Vacation"
            name="goalName"
            id={`${id}-goalName`}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor={`${id}-targetAmount`}
            className="text-xl font-bold text-lime-700"
          >
            How much do you want to save in total?
          </label>
          <input
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            type="number"
            placeholder="1000"
            name="targetAmount"
            id={`${id}-targetAmount`}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor={`${id}-durationInWeeks`}
            className="text-xl font-bold text-lime-700"
          >
            How many weeks do you want to save to reach your goal?
          </label>
          <input
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            type="number"
            placeholder="100"
            name="durationInWeeks"
            id={`${id}-durationInWeeks`}
            required
          />
        </div>

        <button className="cursor-pointer rounded-full bg-lime-800 px-7 py-4 font-bold text-white opacity-50 shadow-lg transition-all duration-300 hover:opacity-100">
          Create your vault now!
        </button>
      </form>
    </div>
  )
}
