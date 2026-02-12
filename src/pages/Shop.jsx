import { useState, useMemo } from "react";
import { products } from "../lib/products";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { Search } from "lucide-react";

export default function Shop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  // OPTIMIZED FILTERING (Requirement 2 & 13)
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Search (Case insensitive, checks title/brand/category)
    if (query) {
      const lowerQ = query.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerQ) || 
        p.brand.toLowerCase().includes(lowerQ) ||
        p.category.toLowerCase().includes(lowerQ)
      );
    }

    // 2. Category
    if (category !== "All") {
      result = result.filter(p => p.category === category);
    }

    // 3. Sorting
    if (sortOrder === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high-low") result.sort((a, b) => b.price - a.price);

    return result;
  }, [query, category, sortOrder]);

  return (
    <>
      <SEO title="Shop" description="Browse our catalog of parapharmacy products." />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search product, brand..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <select 
            className="p-2 border rounded-lg bg-white" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            className="p-2 border rounded-lg bg-white" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">No products found.</div>
        )}
      </div>
    </>
  );
}
