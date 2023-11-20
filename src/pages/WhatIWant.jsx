import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function whatIWant() {
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({
        nameOfTheGift:"",  
        price :"", 
        urlOfGift:"", 
    }); 
    const handleInputChange = (e) => {
        const {name, value} = e.target; 
        setUserData ({
            ...userData, 
            [name] : value, 
        }); 
    }; 
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
    
        axios
          .post("http://localhost:5005/gift", userData)
          .then((response) => {
            console.log(response.data);
        //re initialize the form after press enter 
        setUserData({
            nameOfTheGift:"", 
            price:"", 
            urlOfGift:"",
          });
        })
          .catch((error) => {
            console.log(error);
          });
      };
    


return (
    <form onSubmit={handelSubmit}>
    <h2>What I want</h2>
      
    <label>Name of the gift</label>
    <input 
    type="text" 
    name="nameOfTheGift"
    value={userData.nameOfTheGift}
    onChange={handleInputChange} 
    placeholder="Name of the gift" />

    <label>Price</label>
    <input 
    type="text" 
    name="price"
    value={userData.price}
    onChange={handleInputChange}
    placeholder="Price of the gift" />
    
    <label>Where found it </label>
    <input 
    type="text" 
    name="urlOfGift"
    value={userData.urlOfGift}
    onChange={handleInputChange}
    placeholder="URL of the gift" />
  

 <input type="submit"/>
</form>
)
}

export default whatIWant