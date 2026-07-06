# Nexus Analytics Sales Dashboard

A modern, premium aesthetic sales dashboard built using Next.js 15, React, Recharts, and Tailwind CSS (Dark Mode Glassmorphism Theme). It fetches dynamic API data and mathematically simulates realistic monthly sales volumes for 2022, 2023, and 2024.

## Features & Enhancements Completed

- **Atomic Design Principle**: Components are strictly organized into Atoms, Molecules, Organisms, and Templates for high scalability.
- **Dynamic API Integration**: Fetches real product data from [Fake Store API](https://fakestoreapi.com/) and transforms it programmatically to mimic a realistic multi-year sales dataset.
- **Custom Filter Input**: Allows users to filter the charts to only display months where total sales across all years exceed a certain numerical threshold.
- **Multiple Chart Types**: Uses `recharts` to seamlessly swap between Bar, Line, and Pie chart views of the identical dataset.
- **Premium Design Aesthetics**: Implements a deeply stylized "Glassmorphism" UI with neon accents, frosted cards, hover micro-animations, and responsive layouts.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
- **Charting**: Recharts
- **Icons**: Lucide React

## Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Yeabfikre/nextjs-sales-dashboard.git
   cd nextjs-sales-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **View Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the dashboard.
