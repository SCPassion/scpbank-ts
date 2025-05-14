export default function Header({ ...rest }) {
  const today = new Date()

  return (
    <div {...rest}>
      <h1 className="cursor-pointer">"Login in!"</h1>
      <p className="text-3xl font-normal text-[#9F9F9F]">{`>> ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</p>
    </div>
  )
}
