import { Route, Routes } from "react-router-dom";
import "../App.css";
import HomePage from "../pages/HomePage";
import WhatIWant from "../pages/WhatIWant";
import ProfilPage from "../pages/ProfilPage";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";

function ProductList() {
  const [allProducts, setAllProducts] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setAllProducts(response.data);
      console.log(allProducts);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  fetchProducts()
},[])
  return (
    <ChakraProvider>
      <div className="App">
         
        <div className="product-container">
          {allProducts && allProducts.map((product) => (
            <div key={product.id} className="product-box">
              <h1 className="product-title">{product.title}</h1>
              <img className="product-image" src={product.image} alt="Product" />
              <h2 className="product-price">{product.price} € </h2>
            </div>
            ))}
          </div>
      </div>
    </ChakraProvider>
  );
}
export default ProductList;