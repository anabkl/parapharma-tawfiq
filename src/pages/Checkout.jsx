import { useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "", city: "", address: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error("Cart is empty");
    
    setLoading(true);

    try {
      await addDoc(collection(db, "orders"), {
        customer: formData,
        items: cart,
        total: total,
        status: "Pending",
        createdAt: new Date().toISOString()
      });

      clearCart();
      toast.success("Order Placed Successfully! 🎉");
      navigate("/"); // Or to a success page
    } catch (error) {
      console.error(error);
      toast.error("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <div className="text-center py-20">Your cart is empty.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      
      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" required onChange={handleChange} className="border p-3 rounded-lg w-full" />
            <input name="lastName" placeholder="Last Name" required onChange={handleChange} className="border p-3 rounded-lg w-full" />
          </div>
          <input name="phone" placeholder="Phone Number" required onChange={handleChange} className="border p-3 rounded-lg w-full" />
          <select name="city" required onChange={handleChange} className="border p-3 rounded-lg w-full bg-white">
            <option value="">Select City</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Rabat">Rabat</option>
            <option value="Khouribga">Khouribga</option>
            <option value="Marrakech">Marrakech</option>
          </select>
          <input name="address" placeholder="Full Address" required onChange={handleChange} className="border p-3 rounded-lg w-full" />
          
          <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50">
            {loading ? "Processing..." : `Confirm Order (${total} DH)`}
          </button>
        </form>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-xl h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-3 mb-6">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{item.title}</span>
              <span className="font-bold">{item.price} DH</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 flex justify-between font-bold text-xl text-primary">
          <span>Total</span>
          <span>{total} DH</span>
        </div>
      </div>
    </div>
  );
}
