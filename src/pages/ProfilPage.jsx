import { useState } from "react";
import axios from "axios";

function profilPage() {
  const [userData, setUserData] = useState({
    hat: "",
    top: "",
    bottom: "",
    shoes: "",
  });

  const hatSize = [];
  for (let i = 51; i <= 65; i++) {
    hatSize.push(i);
  }

  //send the user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(userData);

    axios
      .post("http://localhost:5005/gift", userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handelSubmit}>
      <div>
        <h2>Measure</h2>
        <label htmlFor="hat"> Hat </label>
        <select
          name="hat"
          id="hat"
          value={userData.hat}
          onChange={handleInputChange}
          required
        >
          <option value="" hidden defaultValue="" disabled></option>
          {hatSize.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="top"> Top </label>
        <select
          name="top"
          id="top"
          value={userData.top}
          onChange={handleInputChange}
        >
          <option value="" hidden defaultValue="" disabled></option>
          <option value="xxs">XXS</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="3XL">3XL</option>
          <option value="4XL">4XL</option>
          <option value="5XL">5XL</option>
          <option value="6XL">6XL</option>
          <option value="7XL">7XL</option>
          <option value="8XL">8XL</option>
        </select>
      </div>
      <div>
        <label htmlFor="bottom"> Bottom</label>
        <select
          name="bottom"
          id="bottom"
          value={userData.bottom}
          onChange={handleInputChange}
        >
          <option value="" hidden defaultValue="" disabled></option>
          <option value="xxs">XXS</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="3XL">3XL</option>
          <option value="4XL">4XL</option>
        </select>
      </div>
      <div>
        <label htmlFor="shoes"> Shoes</label>
        <select
          name="shoes"
          id="shoes"
          value={userData.shoes}
          onChange={handleInputChange}
        >
          <option value="" hidden defaultValue="" disabled></option>
          <option value="6/37">6 / 36</option>
          <option value="7/38">7/38</option>
          <option value="8/39">8/39</option>
          <option value="9/40">9/40</option>
          <option value="10/41">10/41</option>
          <option value="11/42">11/42</option>
          <option value="12/43">12/43</option>
          <option value="13/44">13/44</option>
          <option value="15/45">15/45</option>
          <option value="16/46">16/46</option>
          <option value="17/47">17/47</option>
          <option value="18/49">18/49</option>
          <option value="19/50">19/50</option>
          <option value="20/51">20/51</option>
          <option value="21/52">21/52</option>
          <option value="22/53">22/53</option>
          <option value="23/54">23/54</option>
        </select>
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}

export default profilPage;
