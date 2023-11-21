import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'

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
      .post("http://localhost:5005/user", userData)
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
    .get (`http://localhost:5005/user?email=${userData.email}&nameAndSurname=${userData.nameAndSurname}`)
    .then ((response)=>{
      if(response.data.length === 1){
      navigate("/whatIWant")
      }
      else {
        post()
      }
    })
    

    
  };
  return (
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
  );
}

export default HomePage;
