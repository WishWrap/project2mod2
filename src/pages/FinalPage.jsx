import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import whatIWant from "./WhatIWant";
import "./FinalPage.css"
import "@fontsource/open-sans";

function FinalPage() {
  const { idUser } = useParams();
  const [userData, setUserData] = useState([]);
  const [userMeasureData, setUserMeasureData] = useState([]);
  const [userWhatIWantData, setWhatIWantData] = useState([]);
  const [updatedGift, setUpdatedGift] = useState({
    id: "",
    nameOfTheGift: "",
    price: "",
    urlOfGift: "",
  });
  const [productGifts, setProductGifts]= useState ([]); 

  function getProductsGifts () {
    axios
    .get(`https://supergiftme.adaptable.app/items`)
    .then ((response)=>{
      setProductGifts(response.data); 
    })
    .catch ((error)=>{
      console.log(error); 
    })
  }

  useEffect(() => {
    alldata();
    getProductsGifts(); 
  }, []);

  const alldata = () => {
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

    axios
      .get(`https://supergiftme.adaptable.app/gift?user_id=${idUser}`)
      .then((response) => {
        setWhatIWantData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteGift = (id) => {
    axios
      .delete(`https://supergiftme.adaptable.app/gift/${id}`)
      .then((response) => {
        const updatedData = userWhatIWantData.filter((gift) => gift.id !== id);
        setWhatIWantData(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateGift = () => {
    axios
      .put(`https://supergiftme.adaptable.app/gift/${updatedGift.id}`, updatedGift)
      .then((response) => {
        const updatedData = userWhatIWantData.map((gift) =>
          gift.id === updatedGift.id ? response.data : gift
        );
        setWhatIWantData(updatedData);
        setUpdatedGift({
          id: "",
          nameOfTheGift: "",
          price: "",
          urlOfGift: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateClick = (gift) => {
    setUpdatedGift({
      id: gift.id,
      nameOfTheGift: gift.nameOfTheGift,
      price: gift.price,
      urlOfGift: gift.urlOfGift,
    });
  };

  return (
 
    <div className="FinalPage">
      
      
      {userData.map((data, index) => (
        <div key={index}>
          <h2>Users</h2>
          Email : {data.email}
          <br></br>
          Username : {data.nameAndSurname}
        </div>
      ))}
      <div>
      <h2>Measure</h2>
      {userMeasureData.map((data, index) => (
        <div key={index}>
          <h4>Size of hat</h4>
          {data.hat}
          <br></br>
          <h4>Size of Top</h4>
          {data.top}
          <br></br>
          <h4>Size of Bottom</h4>
          {data.bottom}
          <br></br>
          <h4>Size of Shoes</h4>
          {data.shoes}
        </div>
     
      ))}
      </div>
      <div>
            <h2> Your Gift</h2>
            {productGifts.map((product)=>{
              return(
                <p>{product.title}</p>
              )
            })}
       
      </div>
    
    
    </div>
  );
}

export default FinalPage;