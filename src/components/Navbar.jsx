import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="bg-primary text-white text-center text-xs py-2 font-bold">
        Free Delivery on orders over 150 DH 🚚
      </div>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Parapharma<span className="text-secondary">Tawfiq</span>
        </Link>
        
        <div className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/shop" className="hover:text-primary transition">Shop</Link>
          <Link to="/admin" className="hover:text-primary transition">Admin</Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/cart" className="relative text-gray-600 hover:text-primary">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
