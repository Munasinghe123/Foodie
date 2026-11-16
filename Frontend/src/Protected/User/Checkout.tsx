import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 300;
  const total = subtotal + deliveryFee;

  const payload = {
    items: cartItems.map(item => ({
      foodId: item.id,
      quantity: item.quantity,
    })),
  };

  const handlePayment = async () => {
    try {

      console.log("checkout payload", payload);
      const res = await axios.post(
        "http://localhost:7000/api/order/create",  payload, 
        {
          withCredentials: true,
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-200 items-center px-4">
      <div className="w-full max-w-lg bg-white hover:shadow-orange-400 rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × Rs.{item.price}
                </p>
              </div>
              <p className="font-medium">
                Rs.{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rs.{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery</span>
            <span>Rs.{deliveryFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-orange-500">Rs.{total}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="
            w-full py-3 rounded-xl bg-orange-500 text-white
            font-medium shadow-lg
            hover:bg-orange-600 hover:shadow-xl
            transition active:scale-[0.97]
          "
        >
          Pay & Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
