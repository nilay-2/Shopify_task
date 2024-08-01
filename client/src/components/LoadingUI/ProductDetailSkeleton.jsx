import "../../css/ProductDetail.css";
import "../../css/Products.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="product-page">
      <div className="product-image skeleton-image"></div>
      <div className="product-details">
        <h1 className="product-title">Loading...</h1>
        <p className="product-category"></p>
        <p className="product-description">Loading...</p>
        <p className="product-price">$loading...</p>
        <div className="product-rating"></div>
        <div className="product-actions">
          <button className="buy-button">Buy</button>
          <button className="cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
