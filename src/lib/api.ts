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

// Reliable local fallback data if the public API is offline or rate-limiting
const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack", price: 109.95, category: "men's clothing", rating: { rate: 3.9, count: 120 } },
  { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts ", price: 22.3, category: "men's clothing", rating: { rate: 4.1, count: 259 } },
  { id: 3, title: "Mens Cotton Jacket", price: 55.99, category: "men's clothing", rating: { rate: 4.7, count: 500 } },
  { id: 4, title: "Mens Casual Slim Fit", price: 15.99, category: "men's clothing", rating: { rate: 2.1, count: 430 } },
  { id: 5, title: "John Hardy Women's Legends Naga Gold & Dragon Bracelet", price: 695, category: "jewelery", rating: { rate: 4.6, count: 400 } },
  { id: 6, title: "Solid Gold Petite Micropave ", price: 168, category: "jewelery", rating: { rate: 3.9, count: 70 } },
  { id: 7, title: "White Gold Plated Princess", price: 9.99, category: "jewelery", rating: { rate: 3, count: 400 } },
  { id: 8, title: "Pierced Owl Stainless Steel Double", price: 10.99, category: "jewelery", rating: { rate: 1.9, count: 100 } },
  { id: 9, title: "WD 2TB Elements Portable External Hard Drive", price: 64, category: "electronics", rating: { rate: 3.3, count: 203 } },
  { id: 10, title: "SanDisk SSD PLUS 1TB Internal SSD", price: 109, category: "electronics", rating: { rate: 2.9, count: 470 } }
];

/**
 * Fetches real product data from Fake Store API and mathematically 
 * projects it into a realistic 3-year sales dataset for 2022-2024.
 * Uses a robust local fallback if the external API is unresponsive.
 */
export async function fetchSalesData(): Promise<MonthlySalesData[]> {
  let products: Product[] = [];

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000) // Timeout after 5s to prevent build hangs
    });
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    products = await response.json();
    console.log("Successfully fetched product data from FakeStoreAPI");
  } catch (error) {
    console.warn("Failed to fetch from FakeStoreAPI. Using robust local fallback products. Error:", error);
    products = FALLBACK_PRODUCTS;
  }

  // Calculate a base "volume" from the product data (sum of prices * ratings)
  const baseVolume = products.reduce((acc, product) => {
    return acc + (product.price * (product.rating?.count || 100));
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
      year2022: Math.max(1000, Math.floor(base2022)),
      year2023: Math.max(1000, Math.floor(base2022 * 1.15 * jitter1)), // ~15% growth
      year2024: Math.max(1000, Math.floor(base2022 * 1.35 * jitter2)), // ~35% growth
    };
  });
}
