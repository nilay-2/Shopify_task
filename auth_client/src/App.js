import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import toastOptions from "./utils/toastOptions";

export const AppContext = React.createContext();

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        const jsonRes = await res.json();

        if (jsonRes) {
          setProducts(jsonRes);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message, toastOptions);
      }
    };
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider value={products}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/product/:id" element={<ProductDetail />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
