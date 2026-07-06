import { ReactNode } from "react"

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      {children}
    </div>
  )
}
