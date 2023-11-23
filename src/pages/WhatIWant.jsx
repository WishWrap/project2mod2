import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductList from "../component/ProductList"

function whatIWant() {
  const { idUser } = useParams();
  const form = [];
  for (let i = 0; i < 10; i++) {
    form.push({ nameOfTheGift: "", price: "", urlOfGift: "", user_id: idUser });
  }
  const navigate = useNavigate();
  const [userData, setUserData] = useState(form);
  const handleInputChange = (e, index) => {
    const { name, value, key } = e.target;
    console.log(name, value, key);
    const newArray = [...userData];
    newArray[index][name] = value;
    setUserData(newArray);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    for (let i = 0; i < userData.length; i++) {
      handelUpdate(i);
    }
  };
  const handleDelete = (i) => {
    const newUserData = [...userData];
    newUserData.splice(i, 1);
    setUserData(newUserData);
  };

  const handelUpdate = (i) => {
    const keys = Object.keys(userData[i]);
    for(let j = 0; j < keys.length; j++) {
      const key = keys[j]
      if (userData[i][key] === '') {
        return ;
      }
    }
    console.log(keys);
    
    axios
      .post("https://supergiftme.adaptable.app/gift", userData[i])
      .then((response) => {
        navigate(`/finalPage/${idUser}`);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function navigateToFinalPage(event){
    navigate(`/finalPage/${idUser}`);
  }

  return (



      
    <div>
    <ProductList/>
    <div className="productlist-button-container">
    <button className="productlist-button" onClick={navigateToFinalPage}>My Gift Shortlist</button>
    </div>
    </div>
  );
}

export default whatIWant;