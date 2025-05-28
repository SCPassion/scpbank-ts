import { Link } from "react-router"
import Navigations from "./Navigations"
import { supabase } from "@/supabase-client"
import { type AuthResponse } from "@supabase/supabase-js"

import { useUserStore } from "@/store/store"
import { useEffect, useState } from "react"

export default function Sidebar({ ...rest }) {
  const { user, setUser } = useUserStore()
  const [sentLink, setSentLink] = useState(false)

  useEffect(() => {
    console.log("listening for auth changes")
    const session = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        console.log("user", session?.user)
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
      setSentLink(true)
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
          className="mt-12 flex flex-col gap-4 rounded-2xl bg-gray-700 px-8 py-5 text-xl font-bold"
          action={handleLogin}
        >
          <p>{sentLink ? "Check your email!" : "Get email link!"}</p>
          <input
            type="email"
            placeholder="Email"
            aria-label="email"
            className="rounded-xl border-2 border-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:bg-gray-600"
            required
            disabled={sentLink}
            name="email"
          />
          {!sentLink && (
            <button className="bg-selectedTab hover:bg-selectedTabHover cursor-pointer rounded-xl py-3 transition-all duration-300 hover:scale-110 hover:bg-green-700">
              Get email link!
            </button>
          )}
        </form>
      ) : (
        <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-gray-700 px-8 py-5 text-xl font-bold">
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
