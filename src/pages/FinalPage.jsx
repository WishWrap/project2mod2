import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import whatIWant from "./WhatIWant";
import "./FinalPage.css";
import "@fontsource/open-sans";


import { ChakraProvider } from "@chakra-ui/react";


function FinalPage() {
  const {idUser} = useParams();
  const [allProducts, setAllProducts] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userMeasureData, setUserMeasureData] = useState([]);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://supergiftme.adaptable.app/items`);
      setAllProducts(response.data.sort((a,b)=>b.id-a.id));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  

  useEffect(() => {
    axios
  .get(`https://supergiftme.adaptable.app/user?id=${idUser}`)
  .then((response) => {
    setUserData(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

axios
  .get(`https://supergiftme.adaptable.app/measure?user_id=${idUser}`)
  .then((response) => {
    setUserMeasureData(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
    fetchProducts();
  }, []);

  return (
    <ChakraProvider>
      <div className="App center-info">
        <div>  {userData.map((data, index) => (
        <div key={index}>
          <h2 class="title">Users</h2>
          Email {data.email}
          <br></br>
          Username {data.nameAndSurname}
        </div>
      ))}
      </div>
      <div className="center-info">
      <h2 class="title">Measure</h2>
      {userMeasureData.map((data, index) => (
        <div key={index}>
          <h4 className="subtitle">Size of hat</h4>
          {data.hat}
          <br></br>
          <h4 className="subtitle">Size of Top</h4>
          {data.top}
          <br></br>
          <h4 className="subtitle">Size of Bottom</h4>
          {data.bottom}
          <br></br>
          <h4 className="subtitle">Size of Shoes</h4>
          {data.shoes}
        </div>
     
      ))}
      </div>
        <div className="product-container">
          
          {allProducts &&
            allProducts.map((product) => (
              <div key={product.id} className="product-box">
                <h1 className="product-title">{product.title}</h1>
                <img
                  className="product-image"
                  src={product.images[0]}
                  alt="Product"
                />
                <h2 className="product-price">{product.price} € </h2>

                
              </div>
            ))}
        </div>
        </div>
    </ChakraProvider>
  );
}

export default FinalPage;













