import { TrendingUp } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="mb-8 pt-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          <TrendingUp size={20} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Nexus Analytics
        </h1>
      </div>
      <p className="text-muted-foreground text-sm max-w-2xl">
        Simulated corporate sales performance metrics for 2022-2024. Data is aggregated and synthesized dynamically from the public Fake Store API.
      </p>
    </header>
  )
}
