import { Link } from "react-router-dom";
import "../css/Header.css";
const Header = () => {
  return (
    <header className="header">
      <Link
        to="/"
        className="logo"
        style={{ color: "white", textDecoration: "none" }}
      >
        Shopify
      </Link>
      <nav className="nav">
        <Link to="/cart">Cart</Link>
        <Link to="/history">Purchase history</Link>
      </nav>
      <div className="login">
        <Link
          to="/login"
          style={{ color: "white", textDecoration: "none" }}
          className="login-button"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
