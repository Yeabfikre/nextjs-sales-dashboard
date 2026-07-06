"use client";

import Link from "next/link";
import { LayoutDashboard, ShoppingCart, BarChart2, PieChart, Settings, Boxes, Component } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-72 bg-card text-card-foreground flex flex-col h-screen fixed left-0 top-0 border-r border-card-border overflow-y-auto">
      {/* Logo Area */}
      <div className="flex items-center gap-2 px-6 py-8">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white">
          <BarChart2 size={20} />
        </div>
        <span className="text-2xl font-bold">TailAdmin</span>
      </div>

      {/* Menu Area */}
      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">Menu</p>
        <ul className="space-y-1">
          <li>
            <Link href="#" className="flex items-center justify-between px-4 py-2.5 rounded-sm bg-primary/10 text-primary font-medium">
              <div className="flex items-center gap-3">
                <LayoutDashboard size={20} />
                Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center justify-between px-4 py-2.5 rounded-sm text-foreground hover:bg-muted font-medium transition-colors">
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} />
                Ecommerce
              </div>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center justify-between px-4 py-2.5 rounded-sm text-foreground hover:bg-muted font-medium transition-colors">
              <div className="flex items-center gap-3">
                <BarChart2 size={20} />
                Analytics
              </div>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center justify-between px-4 py-2.5 rounded-sm text-foreground hover:bg-muted font-medium transition-colors">
              <div className="flex items-center gap-3">
                <PieChart size={20} />
                Marketing
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="px-4 py-4 mt-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">Others</p>
        <ul className="space-y-1">
          <li>
            <Link href="#" className="flex items-center justify-between px-4 py-2.5 rounded-sm text-foreground hover:bg-muted font-medium transition-colors">
              <div className="flex items-center gap-3">
                <Component size={20} />
                UI Elements
              </div>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center justify-between px-4 py-2.5 rounded-sm text-foreground hover:bg-muted font-medium transition-colors">
              <div className="flex items-center gap-3">
                <Settings size={20} />
                Settings
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
