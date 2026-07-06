"use client";

import { Input } from "@/components/atoms/Input";
import { Filter } from "lucide-react";

interface FilterInputProps {
  threshold: number;
  onChange: (value: number) => void;
}

export function FilterInput({ threshold, onChange }: FilterInputProps) {
  return (
    <div className="flex items-center space-x-3 w-full max-w-sm">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
        <Filter size={18} />
      </div>
      <div className="flex-1">
        <label htmlFor="threshold" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
          Min Sales Threshold
        </label>
        <Input 
          id="threshold"
          type="number" 
          value={threshold} 
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="e.g. 5000"
          className="bg-background border-card-border"
        />
      </div>
    </div>
  );
}
