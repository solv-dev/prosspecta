import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="w-full h-full items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  )
}
