import { Link } from "react-router"
import Navigations from "./Navigations"
import { supabase } from "@/supabase-client"
import {
  type AuthResponse,
  type User,
  type PostgrestError,
} from "@supabase/supabase-js"

import { useUserStore } from "@/store/store"
import { useEffect } from "react"

export default function Sidebar({ ...rest }) {
  const { user, setUser } = useUserStore()

  console.log("user", user)

  useEffect(() => {
    console.log("listening for auth changes")
    const session = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("event", session?.user)
      if (session?.user) {
        setUser(session.user)
        //createRow(session.user)
      }
    })

    return () => {
      session.data.subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function createRow(user: User) {
    console.log("Checking if user exists in table:", user.email)
    const { data, error } = await supabase
      .from("vaults")
      .select("user_email")
      .eq("user_email", user.email)

    if (error) {
      console.error("Error checking user in table:", error.message)
      return
    }

    if (data && data.length > 0) {
      console.log("User already exists in table:", user.email)
      return
    }

    //Insert user data into the sale table, store the error to a new variable called insertError
    const { error: insertError }: { error: PostgrestError | null } =
      await supabase.from("vaults").insert({
        user_id: user.id,
        created_at: new Date().toISOString(),
        user_email: user.email,
        purpose: "vacation",
        target: 1001.5,
        number_of_weeks: 10,
      })

    if (insertError) {
      console.error("Error inserting user into table:", insertError.message)
      return
    }
    console.log("User inserted into table:", user.email)
  }

  async function signInWithOTP(email: string): Promise<void> {
    try {
      console.log("signing in with email:", email)
      const { error }: AuthResponse = await supabase.auth.signInWithOtp({
        email,
      })

      if (error) {
        throw new Error(`Error signing in: ${error.message}`)
      }

      console.log("Check your email for the login link!")
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing in:", error.message)
      }
    }
  }

  function handleLogin(formData: FormData) {
    const email = formData.get("email") as string
    signInWithOTP(email)
  }

  return (
    <div {...rest}>
      <Link to="/">
        <p className="mb-20 text-center text-4xl font-light">
          <span className="font-black">SCP</span>Bank
        </p>
      </Link>

      <Navigations />

      {user === null ? (
        <form
          className="mt-2 flex flex-col gap-4 rounded-2xl bg-gray-700 px-8 py-5 text-xl font-bold"
          action={handleLogin}
        >
          <p>Sign in!</p>
          <input
            type="email"
            placeholder="Email"
            aria-label="email"
            className="rounded-xl border-2 border-white px-4 py-2 text-sm font-semibold"
            required
            name="email"
          />
          <button className="bg-selectedTab hover:bg-selectedTabHover cursor-pointer rounded-xl py-3 transition-all duration-300 hover:scale-110 hover:bg-green-700">
            Get email link!
          </button>
        </form>
      ) : (
        <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-gray-700 px-8 py-5 text-xl font-bold">
          <p className="text-center text-xl font-bold">Welcome!</p>
          <button
            className="mt-4 cursor-pointer rounded-xl bg-red-700 px-4 py-2 text-xl font-bold text-white transition-all duration-300 hover:scale-110 hover:bg-red-600"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
