export default function Loading() {
  return (
    <div className="flex h-svh items-center justify-center overflow-hidden">
      <div className="relative rounded-lg p-5 shadow-lg">
        <div className="absolute left-0 top-0 flex h-svh w-svw items-center justify-center">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-white"></div>
        </div>
      </div>
    </div>
  )
}
