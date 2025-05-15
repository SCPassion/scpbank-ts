import { useUserStore } from "@/store/store"

export default function Header({ ...rest }) {
  const { user } = useUserStore()
  const emailName = user?.email?.split("@")[0] || ""
  const today = new Date()

  return (
    <div {...rest}>
      <h1 className="cursor-pointer">
        {emailName === "" ? "Please login in first!" : emailName}
      </h1>
      <p className="text-3xl font-normal text-[#9F9F9F]">{`>> ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</p>
    </div>
  )
}
