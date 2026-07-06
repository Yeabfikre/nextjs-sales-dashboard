import { fetchSalesData } from "@/lib/api";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { DashboardClient } from "@/components/organisms/DashboardClient";

export default async function Home() {
  // Fetch real data on the server side
  const salesData = await fetchSalesData();

  return (
    <DashboardLayout>
      {salesData.length > 0 ? (
        <DashboardClient initialData={salesData} />
      ) : (
        <div className="flex flex-col items-center justify-center p-12 glass rounded-xl border border-red-500/20 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Failed to load API data</h2>
          <p className="text-muted-foreground max-w-md">
            We couldn't fetch the simulated sales data. Please check your network connection and try again.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
