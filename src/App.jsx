import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./component/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
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

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="App">
      <h1>WishWrap</h1>

      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

     

    </div>
  );
}

export default App;
