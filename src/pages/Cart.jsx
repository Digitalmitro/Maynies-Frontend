import { useEffect, useState } from "react";
import axios from "axios";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/courses/cart`,
        {
          withCredentials: true,
        }
      );
      setCartItems(res?.data?.data || []);
      console.log("first", res?.data?.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (courseId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/api/courses/cart/${courseId}`,
        {
          withCredentials: true,
        }
      );
  
      if (res.ok) {
        console.log("Item removed from cart:", res.data);
        setCartItems((prev) =>
          prev.filter((item) => item.course_id._id !== courseId)
        );
      } 
      fetchCart(); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => {
            const course = item.course_id;

            return (
              <div
                key={item._id}
                className="flex border border-gray-300 rounded-lg overflow-hidden shadow"
              >
                <img
                  src={course?.thumbnail_url}
                  alt={course?.title}
                  className="w-32 h-32 object-cover"
                />
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Instructor: {course?.instructor_name}
                  </p>
                  <p className="text-sm text-gray-500">Level: {course?.level}</p>
                </div>
                <div className="p-4 flex flex-col justify-between items-end">
                  <p className="text-orange-600 font-bold text-lg">
                    ₹{course?.discount_price}
                  </p>
                  <p className="text-xs line-through text-red-400">
                    ₹{course?.price}
                  </p>
                  <button
                    className="mt-2 text-sm text-red-500 hover:underline"
                    onClick={() => removeFromCart(item?.course_id?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CartPage;
