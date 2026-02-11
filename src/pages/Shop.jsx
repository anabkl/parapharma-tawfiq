import { products } from "../lib/products";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Shop() {
  const { addToCart } = useCart();

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.title} added!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-secondary">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col"
          >
            <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
              <img src={product.image} alt={product.title} className="max-h-full object-contain" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-gray-800 line-clamp-2 mb-2">{product.title}</h3>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-primary font-bold text-lg">{product.price} DH</span>
                <button 
                  onClick={() => handleAdd(product)}
                  className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary transition"
                >
                  Add +
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
