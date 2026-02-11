import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Checkout />} /> {/* Simplified for demo */}
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <footer className="bg-dark text-white p-6 text-center text-sm">
            © 2026 Parapharma Tawfiq. Professional E-commerce.
          </footer>
        </div>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
