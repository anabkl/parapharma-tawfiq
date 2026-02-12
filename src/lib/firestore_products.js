import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc, writeBatch } from "firebase/firestore";

// 1. Lire les produits depuis Firebase
export const fetchProductsFromDb = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// 2. Mettre à jour le stock (Fonction Admin)
export const updateProductStock = async (productId, newStock) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, {
    stock: parseInt(newStock)
  });
};

// 3. Envoyer tes produits locaux vers Firebase (À faire une seule fois)
export const seedDatabase = async (localProducts) => {
  const batch = writeBatch(db);
  
  localProducts.forEach((product) => {
    // On utilise l'ID du produit comme ID du document pour faciliter les choses
    const docRef = doc(db, "products", product.id.toString());
    // On ajoute un stock par défaut de 10 si non précisé
    batch.set(docRef, { ...product, stock: product.stock || 10 });
  });

  await batch.commit();
  console.log("Base de données initialisée !");
};
