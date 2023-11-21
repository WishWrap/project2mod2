import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import whatIWant from "./WhatIWant";

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

  useEffect(() => {
    alldata();
  }, []);

  const alldata = () => {
    axios
      .get(`http://localhost:5005/user?id=${idUser}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5005/measure?user_id=${idUser}`)
      .then((response) => {
        setUserMeasureData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5005/gift?user_id=${idUser}`)
      .then((response) => {
        setWhatIWantData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteGift = (id) => {
    axios
      .delete(`http://localhost:5005/gift/${id}`)
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
      .put(`http://localhost:5005/gift/${updatedGift.id}`, updatedGift)
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
    <div>
      <h2>Users</h2>
      {userData.map((data, index) => (
        <div key={index}>
          mail : {data.email}
          username : {data.nameAndSurname}
        </div>
      ))}
      <h2>Measure</h2>
      {userMeasureData.map((data, index) => (
        <div key={index}>
          {data.hat}
          {data.top}
          {data.bottom}
          {data.shoes}
        </div>
      ))}
      <h2>What I Want</h2>
      {userWhatIWantData.map((data, index) => (
        <div key={index}>
          {data.nameOfTheGift}
          {data.price}
          {data.urlOfGift}
          <button onClick={() => deleteGift(data.id)}>delete</button>
          <button onClick={() => handleUpdateClick(data)}>update</button>
        </div>
      ))}
      
      {updatedGift.id && (
        <div>
          <h3>Update Gift</h3>
          <label>Name of the Gift:</label>
          <input
            type="text"
            value={updatedGift.nameOfTheGift}
            onChange={(e) =>
              setUpdatedGift({
                ...updatedGift,
                nameOfTheGift: e.target.value,
              })
            }
          />
          <label>Price:</label>
          <input
            type="text"
            value={updatedGift.price}
            onChange={(e) =>
              setUpdatedGift({ ...updatedGift, price: e.target.value })
            }
          />
          <label>URL of the Gift:</label>
          <input
            type="text"
            value={updatedGift.urlOfGift}
            onChange={(e) =>
              setUpdatedGift({ ...updatedGift, urlOfGift: e.target.value })
            }
          />
          <button onClick={updateGift}>Update</button>
        </div>
      )}
    </div>
  );
}

export default FinalPage;