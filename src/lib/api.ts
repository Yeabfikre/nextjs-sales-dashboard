export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type MonthlySalesData = {
  month: string;
  year2022: number;
  year2023: number;
  year2024: number;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Fetches real product data from Fake Store API and mathematically 
 * projects it into a realistic 3-year sales dataset for 2022-2024.
 */
export async function fetchSalesData(): Promise<MonthlySalesData[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      // Use revalidate to cache data but still allow API integration mechanics
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch API data");
    }

    const products: Product[] = await response.json();
    
    // Calculate a base "volume" from the real API data (e.g. sum of prices * ratings)
    const baseVolume = products.reduce((acc, product) => {
      return acc + (product.price * product.rating.count);
    }, 0) / 100; // Scale down for realistic dashboard numbers (e.g. 10k - 50k)

    // Generate monthly data with seasonal variations
    return MONTHS.map((month, index) => {
      // Create a deterministic pseudo-random seasonal curve based on the month
      const seasonality = 1 + Math.sin((index / 11) * Math.PI) * 0.5; // Peak in middle of year
      const holidayBump = (index === 10 || index === 11) ? 1.4 : 1; // Nov/Dec bump
      
      // Calculate realistic growth YoY (Year over Year)
      const base2022 = Math.floor(baseVolume * seasonality * holidayBump * 0.8);
      
      // Randomize slightly using the index to avoid completely uniform curves
      const jitter1 = 0.9 + (Math.sin(index * 2) * 0.2); 
      const jitter2 = 0.9 + (Math.cos(index * 3) * 0.2);
      
      return {
        month,
        year2022: Math.floor(base2022),
        year2023: Math.floor(base2022 * 1.15 * jitter1), // ~15% growth
        year2024: Math.floor(base2022 * 1.35 * jitter2), // ~35% growth
      };
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    // Fallback to empty array to handle UI gracefully
    return [];
  }
}
