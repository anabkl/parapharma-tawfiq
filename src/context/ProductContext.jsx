import { createContext, useContext, useState } from "react";

// 1. Create the "Brain" (Context)
const ProductContext = createContext();

// 2. Define your Products Data
// notice the path: "/images/uploads/..." maps to "public/images/uploads/..."
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "SVR Sebiaclear Serum",
    description: "Correction globale anti-imperfections, marques et rides.",
    price: 200,
    category: "Visage",
    image: "/images/uploads/svr-sebiaclear-serum-30-ml.webp" 
  },
  {
    id: 2,
    name: "La Roche-Posay Anthelios",
    description: "Fluide invisible UVMune 400 SPF50+.",
    price: 180,
    category: "Solaire",
    image: "/images/uploads/la-roche-posay-anthelios-uvmune-400-fluide-invisible-solaire-spf50-peau-sensible-50ml.webp"
  },
  {
    id: 3,
    name: "Packshot Texture",
    description: "Texture riche pour hydratation intense.",
    price: 150,
    category: "Soins",
    image: "/images/uploads/packshottexture.jpg.webp"
  },
  {
    id: 4,
    name: "Promo Pack 1",
    description: "Offre spéciale - Soins complets.",
    price: 300,
    category: "Offres",
    image: "/images/uploads/images-1-.jpeg"
  },
  {
    id: 5,
    name: "Promo Pack 2",
    description: "Kit essentiel pour peau sensible.",
    price: 250,
    category: "Offres",
    image: "/images/uploads/images-2-.jpeg"
  }
];

// 3. Create the Provider (The wrapper that gives data to your app)
export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart function
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  // Calculate total price
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ProductContext.Provider value={{ products: PRODUCTS_DATA, cart, addToCart, removeFromCart, cartTotal }}>
      {children}
    </ProductContext.Provider>
  );
};

// 4. Create a hook to use this easier
export const useShop = () => useContext(ProductContext);
