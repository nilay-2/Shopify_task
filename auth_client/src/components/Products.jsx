import React from "react";
import "../css/Products.css";
import { Link, useNavigate } from "react-router-dom";
const LimitDesc = ({ desc, prodId }) => {
  return (
    <p>
      {desc.slice(0, 200)}
      <Link to={`/product/${prodId}`}>
        <span className="read-more">...read more</span>
      </Link>
    </p>
  );
};

const ProductCard = ({ product }) => {
  const { id, title, price, description, category, image, rating } = product;

  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/product/${id}`);
      }}
    >
      <img src={image} alt={title} className="image" />
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="category">{category}</p>
        <div className="description">
          {<LimitDesc desc={description} prodId={id} />}
        </div>
        <div className="footer">
          <span className="price">${price}</span>
          <span className="rating">
            Rating: {rating.rate} ({rating.count})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
