import { LoaderIcon } from "lucide-react"


function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={`animate-spin w-15 h-15 text-[#d35400] ${className}`}
      {...props}
    />
  )
}

export default function SplashLoader() {
  return (
    <div className="flex items-center gap-4 text-[#d35400] font-visual text-lg">
       جاري التحميل ... <Spinner />
    </div>
  )
}