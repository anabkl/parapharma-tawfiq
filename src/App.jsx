import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // ✅ Added for SEO
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col relative">
            <Navbar />
            
            <main className="flex-grow bg-gray-50">
              <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Checkout />} />
                <Route path="/checkout" element={<Checkout />} /> {/* Added alias so both work */}
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>

            <footer className="bg-dark text-white p-6 text-center text-sm">
              © 2026 Parapharma Tawfiq. Professional E-commerce.
            </footer>

            {/* 🟢 Floating WhatsApp Button */}
            <a 
              href="https://wa.me/212675698351?text=Salam,%20j'ai%20une%20question%20sur%20un%20produit%20Parapharma%20Tawfiq"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 hover:scale-110 transition duration-300 group"
              aria-label="Contact via WhatsApp"
            >
              <div className="bg-green-500 rounded-full p-3 shadow-lg flex items-center justify-center w-14 h-14 group-hover:bg-green-600">
                {/* We use a direct SVG icon so you don't need to download an image file */}
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  alt="WhatsApp" 
                  className="w-8 h-8 filter brightness-0 invert" 
                />
              </div>
            </a>

          </div>
          <ToastContainer position="bottom-left" />
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
