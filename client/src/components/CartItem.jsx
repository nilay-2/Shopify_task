import React from "react";
import "../css/CartItem.css";
import toast from "react-hot-toast";
import toastOptions from "../utils/toastOptions";
import { backendURL } from "../utils/URL";
const CartItem = ({ item, cartArr, setCart }) => {
  const removeItem = async () => {
    try {
      const res = await fetch(
        `${backendURL}/cart/product/${item.productId}/remove`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const jsonRes = await res.json();

      if (jsonRes.error) {
        throw new Error(jsonRes.error);
      } else {
        toast.success(jsonRes.message, toastOptions);
        const newCart = cartArr.filter(
          (cItem) => cItem.productId !== item.productId
        );
        setCart(newCart);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <button className="cart-item-remove" onClick={removeItem}>
          Remove from Cart
        </button>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
