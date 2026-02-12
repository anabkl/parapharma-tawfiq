import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Printer } from "lucide-react";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyOrder = async () => {
      if(!orderId) return;
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Order Verified in Firestore:", docSnap.id, docSnap.data());
          setOrder({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Order NOT FOUND in Firestore");
        }
      } catch (e) {
        console.error("Error verifying order:", e);
      } finally {
        setLoading(false);
      }
    };
    verifyOrder();
  }, [orderId]);

  if (loading) return <div className="p-10 text-center">Verifying Order...</div>;
  if (!order) return <div className="p-10 text-center text-red-500">Order not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white my-10 border shadow-lg print:shadow-none print:border-none print:my-0 print:w-full">
      {/* Printable Header */}
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-2xl font-bold text-primary">Parapharmacie Tawfiq</h1>
        <p>Khouribga, Morocco</p>
        <p>Tel: 0600000000</p>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h3 className="font-bold text-gray-500">Bill To:</h3>
          <p className="font-bold">{order.customer.firstName} {order.customer.lastName}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}, {order.customer.city}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">Order #{order.id.slice(0, 6).toUpperCase()}</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="text-left py-2">Item</th>
            <th className="text-center py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{item.title}</td>
              <td className="text-center py-2">{item.quantity}</td>
              <td className="text-right py-2">{item.price} DH</td>
              <td className="text-right py-2">{item.price * item.quantity} DH</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">Total: {order.total} DH</p>
        </div>
      </div>

      {/* Buttons (Hidden when printing) */}
      <div className="print:hidden flex gap-4 justify-center">
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          <Printer size={20} /> Print Invoice
        </button>
        <Link to="/" className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300">
          Back to Shop
        </Link>
      </div>
    </div>
  );
}




