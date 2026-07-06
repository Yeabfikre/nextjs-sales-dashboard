"use client";

import { Button } from "@/components/atoms/Button";
import { BarChart3, LineChart, PieChart } from "lucide-react";

export type ChartType = "bar" | "line" | "pie";

interface ChartTypeSelectorProps {
  selected: ChartType;
  onSelect: (type: ChartType) => void;
}

export function ChartTypeSelector({ selected, onSelect }: ChartTypeSelectorProps) {
  return (
    <div className="flex bg-muted p-1 rounded-sm border border-card-border">
      <Button 
        variant={selected === "bar" ? "default" : "ghost"} 
        onClick={() => onSelect("bar")}
        className="h-8 px-3"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Bar
      </Button>
      <Button 
        variant={selected === "line" ? "default" : "ghost"} 
        onClick={() => onSelect("line")}
        className="h-8 px-3"
      >
        <LineChart className="w-4 h-4 mr-2" />
        Line
      </Button>
      <Button 
        variant={selected === "pie" ? "default" : "ghost"} 
        onClick={() => onSelect("pie")}
        className="h-8 px-3"
      >
        <PieChart className="w-4 h-4 mr-2" />
        Pie
      </Button>
    </div>
  );
}
