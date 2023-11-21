import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function whatIWant() {
  const form = [];
  for (let i=0; i<10; i++) {
    form.push({ nameOfTheGift: "",
    price: "",
    urlOfGift: "",})
  }
  const navigate = useNavigate();
  const [userData, setUserData] = useState(form);
  const handleInputChange = (e, index) => {
    const {name, value, key } = e.target;
    console.log(name, value, key)
    const newArray = [...userData]; 
    newArray[index] [name] = value
    setUserData(newArray
    );
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
for (let i=0; i<userData.length; i++) {
   handelUpdate(i)

}
};
  const handleDelete = (i) => {
    const newUserData=[...userData]
    newUserData.splice(i,1)
    setUserData(newUserData)
  }

  const handelUpdate =(i) => {
    axios 
    .post("http://localhost:5005/gift", userData[i])
    .then((response) => {
      navigate("/finalPage");
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <form onSubmit={handelSubmit}>
      <h2>What I want</h2>
      {[...userData].map((user, index) => (
        <div key={index}>
          <label>Name of the gift</label>
          <input
            type="text"
            name="nameOfTheGift"
            value={user.nameOfTheGift}
            onChange={(e) => handleInputChange(e,index)}
            placeholder="Name of the gift"
          />

          <label>Price</label>
          <input
            type="text"
            name="price"
            value={user.price}
            onChange={(e) => handleInputChange(e,index)}
            placeholder="Price of the gift"
          />

          <label>Where found it </label>
          <input
            type="text"
            name="urlOfGift"
            value={user.urlOfGift}
            onChange={(e) => handleInputChange(e,index)}
            placeholder="URL of the gift"
          />
          <button type="button"onClick={()=> handleDelete(index)}>
            delete
          </button>
          <button type="button" onClick={()=>handelUpdate(index)}>Update</button>
        </div>
      ))}

      <input type="submit" />
    </form>
  );
}

export default whatIWant;
