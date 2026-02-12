import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { updateProductStock, seedDatabase } from '../lib/firestore_products';
import { toast } from 'react-toastify';

// On reprend tes données locales juste pour l'initialisation
const LOCAL_PRODUCTS = [
  { id: 1, title: "SVR Sebiaclear", price: 200, category: "Visage", image: "/images/uploads/svr-sebiaclear-serum-30-ml.webp" },
  { id: 2, title: "La Roche-Posay", price: 180, category: "Solaire", image: "/images/uploads/la-roche-posay-anthelios-uvmune-400-fluide-invisible-solaire-spf50-peau-sensible-50ml.webp" },
  // ... ajoute les autres ici si besoin
];

export default function Admin() {
  const { products } = useCart();
  const [stockValues, setStockValues] = useState({});

  // Fonction "Magique" pour remplir la base de données la première fois
  const handleSeed = async () => {
    if(window.confirm("Attention : Cela va écraser les données Firebase avec les produits locaux. Continuer ?")) {
      try {
        await seedDatabase(LOCAL_PRODUCTS);
        toast.success("Produits envoyés vers Firebase ! Rechargez la page.");
      } catch (e) {
        toast.error("Erreur : " + e.message);
      }
    }
  };

  const handleUpdate = async (id) => {
    const newVal = stockValues[id];
    if (!newVal) return;
    
    try {
      await updateProductStock(id, newVal);
      toast.success("Stock mis à jour !");
    } catch (e) {
      toast.error("Erreur de mise à jour");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administration</h1>
        {/* Bouton d'initialisation - À utiliser une seule fois */}
        <button onClick={handleSeed} className="bg-red-500 text-white px-4 py-2 rounded text-sm">
          Initialiser la Base de Données
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Produit</th>
              <th className="p-4 text-left">Stock Actuel</th>
              <th className="p-4 text-left">Nouveau Stock</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${p.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {p.stock || 0}
                  </span>
                </td>
                <td className="p-4">
                  <input 
                    type="number" 
                    className="border p-1 rounded w-20"
                    placeholder="Qté"
                    onChange={(e) => setStockValues({...stockValues, [p.id]: e.target.value})}
                  />
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleUpdate(p.id)}
                    className="text-blue-600 hover:text-blue-900 font-bold"
                  >
                    Sauvegarder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
