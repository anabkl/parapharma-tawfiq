import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasStock = product.stock > 0;
  
  // Calculate discount percentage
  const discount = product.isPromo 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col relative group">
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {product.isPromo && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {!hasStock && (
          <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>

      <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
        <img src={product.image} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition duration-300" loading="lazy" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 text-sm md:text-base">{product.title}</h3>
        
        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-primary font-bold text-lg">{product.price} DH</span>
            {product.isPromo && (
              <span className="text-gray-400 text-sm line-through">{product.oldPrice} DH</span>
            )}
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={!hasStock}
            className={`w-full py-2 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2
              ${hasStock 
                ? 'bg-primary text-white hover:bg-green-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            {hasStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
