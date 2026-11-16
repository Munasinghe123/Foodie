import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

function OrderSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 
      </h1>
      <p>Your order has been placed successfully.</p>
    </div>
  );
}

export default OrderSuccess;
