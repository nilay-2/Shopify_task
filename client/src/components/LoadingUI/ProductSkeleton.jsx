import React from "react";
import "../../css/Products.css";
const ProductSkeleton = () => {
  return (
    <div className="card">
      <div className="image skeleton-image"></div>
      <div className="content">
        <h2 className="title">loading...</h2>
        <p className="category"></p>
        <div className="description">Loading...</div>
        <div className="footer">
          <span className="price">$ loading...</span>
          <span className="rating">Rating: loading...</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
