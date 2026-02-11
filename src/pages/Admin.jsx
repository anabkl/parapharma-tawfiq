import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { Package, Check, Clock } from "lucide-react";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "orders", id), { status: newStatus });
    fetchOrders(); // Refresh
  };

  if (loading) return <div className="text-center py-20">Loading Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="font-bold">{order.customer.firstName} {order.customer.lastName}</div>
                  <div className="text-sm text-gray-500">{order.customer.phone}</div>
                </td>
                <td className="p-4">{order.items.length} items</td>
                <td className="p-4 font-bold text-primary">{order.total} DH</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => updateStatus(order.id, 'Confirmed')} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200" title="Confirm">
                    <Check size={16} />
                  </button>
                  <button onClick={() => updateStatus(order.id, 'Pending')} className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200" title="Pending">
                    <Clock size={16} />
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
