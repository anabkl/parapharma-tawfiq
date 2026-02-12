import { Link } from "react-router-dom";
import { products } from "../lib/products";
import ProductCard from "../components/ProductCard"; // (We will create this next)
import SEO from "../components/SEO";

export default function Home() {
  // Get Promos
  const promos = products.filter(p => p.isPromo).slice(0, 4);
  const featured = products.slice(0, 4);

  return (
    <>
      <SEO title="Home" />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Parapharmacie Tawfiq</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your trusted health & beauty partner in Khouribga. 100% Authentic products delivered to your door.
        </p>
        <Link to="/shop" className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </section>

      {/* Promotions */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-secondary border-l-4 border-primary pl-4">Flash Sales 🔥</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {promos.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* About Us (Requirement 12) */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-secondary">About Our Pharmacy</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Located in the heart of <strong>Khouribga</strong>, Parapharmacie Tawfiq is a real physical establishment dedicated to your well-being. 
            Unlike anonymous online sellers, we are certified professionals providing authentic dermatological and cosmetic brands.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <span className="block text-4xl mb-2">📍</span>
              <span className="font-bold">Khouribga</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl mb-2">🛡️</span>
              <span className="font-bold">100% Authentic</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
