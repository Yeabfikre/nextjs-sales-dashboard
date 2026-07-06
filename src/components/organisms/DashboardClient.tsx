"use client";

import { useState } from "react";
import { MonthlySalesData } from "@/lib/api";
import { Card } from "@/components/atoms/Card";
import { FilterInput } from "@/components/molecules/FilterInput";
import { ChartTypeSelector, ChartType } from "@/components/molecules/ChartTypeSelector";
import { SalesChart } from "@/components/organisms/SalesChart";
import { Activity, DollarSign, Target } from "lucide-react";

interface DashboardClientProps {
  initialData: MonthlySalesData[];
}

export function DashboardClient({ initialData }: DashboardClientProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState<number>(0);

  // Calculate summary metrics
  const totalSales2024 = initialData.reduce((sum, item) => sum + item.year2024, 0);
  const totalSales2023 = initialData.reduce((sum, item) => sum + item.year2023, 0);
  const growth = ((totalSales2024 - totalSales2023) / totalSales2023) * 100;

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue (2024)</h3>
            <DollarSign className="text-primary w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            ${totalSales2024.toLocaleString()}
          </div>
          <p className="text-sm text-emerald-400 font-medium">
            +{growth.toFixed(1)}% from last year
          </p>
        </Card>
        
        <Card className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Monthly Average</h3>
            <Activity className="text-accent w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            ${Math.floor(totalSales2024 / 12).toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            Per month in 2024
          </p>
        </Card>

        <Card className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Sales Goal</h3>
            <Target className="text-pink-500 w-5 h-5 opacity-80" />
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            92.4%
          </div>
          <div className="w-full bg-black/40 rounded-full h-2 mt-2 border border-card-border">
            <div className="bg-gradient-to-r from-primary to-pink-500 h-2 rounded-full" style={{ width: "92.4%" }}></div>
          </div>
        </Card>
      </div>

      {/* Main Chart Section */}
      <Card className="min-h-[500px] flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <FilterInput threshold={threshold} onChange={setThreshold} />
          <ChartTypeSelector selected={chartType} onSelect={setChartType} />
        </div>
        
        <div className="flex-1 w-full relative min-h-[350px]">
          <SalesChart data={initialData} type={chartType} threshold={threshold} />
        </div>
      </Card>
    </div>
  );
}
