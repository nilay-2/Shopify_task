import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetail.css";
import toast from "react-hot-toast";
import toastOptions from "../utils/toastOptions";
import ProductDetailSkeleton from "./LoadingUI/ProductDetailSkeleton";
import { backendURL } from "../utils/URL";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        const jsonRes = await res.json();

        if (jsonRes) {
          setProduct(jsonRes);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message, toastOptions);
      }
    };
    getProductDetails();
  }, [id]);

  console.log(product);
  const addToCart = async () => {
    try {
      const res = await fetch(`${backendURL}/cart/product/${id}/addtocart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          image: product.image,
          rating: product.rating,
        }),
      });

      const jsonRes = await res.json();

      if (jsonRes.error) {
        throw new Error(jsonRes.error);
      } else {
        toast.success(jsonRes.message, toastOptions);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, toastOptions);
    }
  };

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="product-page">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <div className="product-rating">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </div>
        <div className="product-actions">
          <button className="buy-button">Buy</button>
          <button className="cart-button" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
