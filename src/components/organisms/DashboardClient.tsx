"use client";

import { useState } from "react";
import { MonthlySalesData } from "@/lib/api";
import { Card } from "@/components/atoms/Card";
import { FilterInput } from "@/components/molecules/FilterInput";
import { ChartTypeSelector, ChartType } from "@/components/molecules/ChartTypeSelector";
import { SalesChart } from "@/components/organisms/SalesChart";
import { BarChart3, TrendingUp } from "lucide-react";

interface DashboardClientProps {
  initialData: MonthlySalesData[];
}

export function DashboardClient({ initialData }: DashboardClientProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState<number>(0);

  // Calculate summary metrics based on the real API data
  const totalSales2024 = initialData.reduce((sum, item) => sum + item.year2024, 0);
  const totalSales2023 = initialData.reduce((sum, item) => sum + item.year2023, 0);
  const totalSales2022 = initialData.reduce((sum, item) => sum + item.year2022, 0);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top Metrics Cards - Real Data Only */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="flex flex-col justify-between py-6 px-7.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
            <BarChart3 size={22} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-foreground">
                ${totalSales2024.toLocaleString()}
              </h4>
              <span className="text-sm font-medium text-muted-foreground">Total Revenue (2024)</span>
            </div>
          </div>
        </Card>
        
        <Card className="flex flex-col justify-between py-6 px-7.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
            <BarChart3 size={22} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-foreground">
                ${totalSales2023.toLocaleString()}
              </h4>
              <span className="text-sm font-medium text-muted-foreground">Total Revenue (2023)</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between py-6 px-7.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
            <BarChart3 size={22} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-foreground">
                ${totalSales2022.toLocaleString()}
              </h4>
              <span className="text-sm font-medium text-muted-foreground">Total Revenue (2022)</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {/* Main Chart Section */}
        <Card className="min-h-[450px] flex flex-col p-7.5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h4 className="text-xl font-bold text-foreground">
                Revenue Analytics
              </h4>
              <span className="text-sm font-medium text-muted-foreground">Sales performance (2022-2024)</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <FilterInput threshold={threshold} onChange={setThreshold} />
              <ChartTypeSelector selected={chartType} onSelect={setChartType} />
            </div>
          </div>
          
          <div className="flex-1 w-full relative min-h-[350px]">
            <SalesChart data={initialData} type={chartType} threshold={threshold} />
          </div>
        </Card>
      </div>
    </div>
  );
}
