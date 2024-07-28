import { useContext } from "react";
import { AppContext } from "../App";
import ProductCard from "./Products";
import ProductSkeleton from "./LoadingUI/ProductSkeleton";
import "../css/Home.css";
const Home = () => {
  const products = useContext(AppContext);
  // console.log(products);

  if (!products.length) {
    return (
      <div className="home">
        {Array(10)
          .fill(0)
          .map((prod, i) => {
            return <ProductSkeleton key={i} />;
          })}
      </div>
    );
  }

  return (
    <div className="home">
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
};

export default Home;
