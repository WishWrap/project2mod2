import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'
import "./HomePage.css"

function HomePage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: "",
    nameAndSurname: "",
  });

  //send the user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
const post =()=>{
  axios
      .post("https://supergiftme.adaptable.app/user", userData)
      .then((response) => {
        navigate("/profile/"+response.data.id)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

}
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(userData);

    axios
    .get (`https://supergiftme.adaptable.app/user?email=${userData.email}&nameAndSurname=${userData.nameAndSurname}`)
    .then ((response)=>{
  
        post()
      
    })
    

    
  };
  return (
    <div className="homePage">
      <h1>Register</h1>
      <h2>It's Free !</h2>
      <div>Register to start your profil</div>
      <form onSubmit={handelSubmit}>
    <div>
      <h2>Profil</h2>
      <input
        onChange={handleInputChange}
        type="text"
        name="nameAndSurname"
        placeholder="Name and Surname"
      />
      <input onChange={handleInputChange} 
      type="email" 
      name="email"
      placeholder="email" />
      <input type="submit"/>
    </div>
  </form>
  </div>
    
  );
}

export default HomePage;