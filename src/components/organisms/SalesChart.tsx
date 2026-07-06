"use client";

import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { MonthlySalesData } from "@/lib/api";
import { ChartType } from "@/components/molecules/ChartTypeSelector";

interface SalesChartProps {
  data: MonthlySalesData[];
  type: ChartType;
  threshold: number;
}

const COLORS = {
  year2022: "var(--chart-4)", // Emerald
  year2023: "var(--chart-2)", // Blue
  year2024: "var(--chart-1)", // Violet
};

export function SalesChart({ data, type, threshold }: SalesChartProps) {
  // Apply threshold filter (only show months where total sales exceed threshold)
  const filteredData = data.filter(
    (item) => (item.year2022 + item.year2023 + item.year2024) / 3 >= threshold
  );

  if (filteredData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center flex-col text-muted-foreground">
        <div className="text-4xl mb-4 opacity-50">📊</div>
        <p>No data meets the current threshold.</p>
        <p className="text-sm opacity-70">Try lowering the minimum sales value.</p>
      </div>
    );
  }

  const renderTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg border border-card-border shadow-2xl backdrop-blur-xl">
          <p className="font-semibold text-foreground mb-2">{label || payload[0]?.name}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center text-sm mb-1">
              <div 
                className="w-3 h-3 rounded-full mr-2 shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: entry.color, color: entry.color }}
              />
              <span className="text-muted-foreground mr-4">{entry.name}:</span>
              <span className="font-mono font-medium text-foreground">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Restructure data for Pie Chart (aggregated by year)
  const pieData = [
    { name: '2022 Sales', value: filteredData.reduce((acc, item) => acc + item.year2022, 0), color: COLORS.year2022 },
    { name: '2023 Sales', value: filteredData.reduce((acc, item) => acc + item.year2023, 0), color: COLORS.year2023 },
    { name: '2024 Sales', value: filteredData.reduce((acc, item) => acc + item.year2024, 0), color: COLORS.year2024 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === "bar" ? (
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip content={renderTooltip} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="year2022" name="2022" fill={COLORS.year2022} radius={[4, 4, 0, 0]} />
          <Bar dataKey="year2023" name="2023" fill={COLORS.year2023} radius={[4, 4, 0, 0]} />
          <Bar dataKey="year2024" name="2024" fill={COLORS.year2024} radius={[4, 4, 0, 0]} />
        </BarChart>
      ) : type === "line" ? (
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip content={renderTooltip} />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="year2022" name="2022" stroke={COLORS.year2022} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="year2023" name="2023" stroke={COLORS.year2023} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="year2024" name="2024" stroke={COLORS.year2024} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
        </LineChart>
      ) : (
        <PieChart>
          <Tooltip content={renderTooltip} />
          <Legend iconType="circle" />
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}
