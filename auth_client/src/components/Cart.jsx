import { useEffect, useState } from "react";
import { backendURL } from "../utils/URL";
import toast from "react-hot-toast";
import toastOptions from "../utils/toastOptions";
import CartItem from "./CartItem";
import "../css/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCartItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${backendURL}/cart/getallitems`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 204) {
          throw new Error("Cart is empty");
        }

        const jsonRes = await res.json();

        if (jsonRes.error) {
          throw new Error(jsonRes.error);
        } else {
          setCart(jsonRes.data.cart);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message, toastOptions);
      } finally {
        setIsLoading(false);
      }
    };

    getCartItems();
  }, []);

  const getTotalAmount = (cart) => {
    let totalSum = 0;

    cart.forEach((item) => {
      totalSum += item.price;
    });

    return totalSum;
  };

  if (isLoading) {
    return (
      <div style={{ padding: "50px" }}>
        <h4 style={{ textAlign: "center" }}>loading....</h4>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div style={{ padding: "50px" }}>
        <h4 style={{ textAlign: "center" }}>Cart is empty!</h4>
      </div>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      {cart.map((item, i) => {
        return (
          <CartItem item={item} key={i} cartArr={cart} setCart={setCart} />
        );
      })}
      <div className="cart-total">
        <p>
          <span>Total:</span> ${getTotalAmount(cart).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Cart;
