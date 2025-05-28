export default function BaseDashboard() {
  return (
    <div className="flex h-128 w-full flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-lime-800">SCP Bank</h1>
        <p className="mt-4 text-lg text-gray-700">
          Manage your finances with ease and precision.
        </p>
      </header>

      <p className="text-md text-gray-600">
        Track your investments, plan your budget, and save for retirement all in
        one place.
      </p>
      <p className="text-md text-gray-600">
        Navigate through various features using the sidebar to explore detailed
        insights.
      </p>
    </div>
  )
}
