import { useUserStore } from "@/store/store"
import { useId, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router"

export default function useSymbol() {
  const id = useId()
  const [modelOpen, setModelOpen] = useState(false)
  const { user } = useUserStore()

  // Get the symbol from the URL parameters
  const { symbol } = useParams<{ symbol: string }>()
  const navigate = useNavigate()

  // Get the search parameters from the URL
  // These parameters are passed from the Portfolio page when navigating to this detail page
  const [searchParams] = useSearchParams()

  return { id, modelOpen, setModelOpen, user, symbol, navigate, searchParams }
}
