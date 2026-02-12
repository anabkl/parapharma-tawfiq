import { createContext, useContext, useState, useEffect } from "react";
import { fetchProductsFromDb } from "../lib/firestore_products"; // On importe la nouvelle fonction

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // On commence avec une liste vide
  const [loading, setLoading] = useState(true);
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 🟢 CHARGEMENT DES PRODUITS DEPUIS FIREBASE
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsFromDb();
        setProducts(data);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, total, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
