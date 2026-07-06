"use client";

import { useState } from "react";
import { MonthlySalesData } from "@/lib/api";
import { Card } from "@/components/atoms/Card";
import { FilterInput } from "@/components/molecules/FilterInput";
import { ChartTypeSelector, ChartType } from "@/components/molecules/ChartTypeSelector";
import { SalesChart } from "@/components/organisms/SalesChart";
import { Users, ShoppingBag, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
    <div className="space-y-4 md:space-y-6">
      {/* Top Metrics Cards - TailAdmin Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <Card className="flex flex-col justify-between py-6 px-7.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
            <Users size={22} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-foreground">
                3,782
              </h4>
              <span className="text-sm font-medium text-muted-foreground">Customers</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-accent">
              <ArrowUpRight size={16} />
              11.01%
            </span>
          </div>
        </Card>
        
        <Card className="flex flex-col justify-between py-6 px-7.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
            <ShoppingBag size={22} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-foreground">
                5,359
              </h4>
              <span className="text-sm font-medium text-muted-foreground">Orders</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-destructive">
              <ArrowDownRight size={16} />
              9.05%
            </span>
          </div>
        </Card>

        <Card className="flex flex-col justify-between py-6 px-7.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
            <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 22C4.93125 22 0 17.0687 0 11C0 4.93125 4.93125 0 11 0C17.0687 0 22 4.93125 22 11C22 17.0687 17.0687 22 11 22ZM11 1.65C5.86094 1.65 1.65 5.86094 1.65 11C1.65 16.1391 5.86094 20.35 11 20.35C16.1391 20.35 20.35 16.1391 20.35 11C20.35 5.86094 16.1391 1.65 11 1.65Z" fill=""/>
              <path d="M11 11.825C10.5531 11.825 10.175 11.4469 10.175 11V5.5C10.175 5.05312 10.5531 4.675 11 4.675C11.4469 4.675 11.825 5.05312 11.825 5.5V11C11.825 11.4469 11.4469 11.825 11 11.825Z" fill=""/>
              <path d="M14.575 15.4C14.3687 15.4 14.1625 15.3312 14.025 15.1594L10.45 11.5844C10.1406 11.275 10.1406 10.7594 10.45 10.45C10.7594 10.1406 11.275 10.1406 11.5844 10.45L15.1594 14.025C15.4687 14.3344 15.4687 14.85 15.1594 15.1594C15 15.3312 14.7812 15.4 14.575 15.4Z" fill=""/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-foreground">
                ${totalSales2024.toLocaleString()}
              </h4>
              <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-accent">
              <ArrowUpRight size={16} />
              {growth.toFixed(1)}%
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Main Chart Section - spans 2 columns */}
        <Card className="xl:col-span-2 min-h-[450px] flex flex-col p-7.5">
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

        {/* Target Section - spans 1 column */}
        <Card className="xl:col-span-1 p-7.5">
          <div className="mb-4">
            <h4 className="text-xl font-bold text-foreground">
              Monthly Target
            </h4>
            <span className="text-sm font-medium text-muted-foreground">Target you've set for each month</span>
          </div>
          
          {/* Mock Gauge Chart representation */}
          <div className="relative flex items-center justify-center py-8">
            <div className="w-48 h-48 rounded-full border-[14px] border-muted border-t-primary border-l-primary border-r-primary flex items-center justify-center shadow-inner">
              <div className="text-center mt-4">
                <span className="block text-3xl font-bold text-foreground">75.55%</span>
                <span className="block text-sm font-medium text-accent">+10%</span>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            You earn $3287 today, it's higher than last month. Keep up your good work!
          </p>
          
          <div className="flex items-center justify-between border-t border-card-border pt-6">
            <div className="text-center">
              <span className="block text-sm font-medium text-muted-foreground">Target</span>
              <span className="block text-sm font-bold text-foreground mt-1">$20K <span className="text-destructive font-normal text-xs">↓</span></span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-medium text-muted-foreground">Revenue</span>
              <span className="block text-sm font-bold text-foreground mt-1">$20K <span className="text-accent font-normal text-xs">↑</span></span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-medium text-muted-foreground">Today</span>
              <span className="block text-sm font-bold text-foreground mt-1">$20K <span className="text-accent font-normal text-xs">↑</span></span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
