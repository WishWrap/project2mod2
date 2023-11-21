import { useEffect, useState } from "react";
import axios from "axios";

function FinalPage() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    alldata();
  }, []);
  const alldata = () => {
    axios
      .get("http://localhost:5005/user") 
      .then((response) => {
        console.log(response.alldata);
        setdata(response.data);
      })
      .catch(error);
    console.log(error);
  };
  axios
    .get("http://localhost:5005/measure") 
    .then((response) => {
      console.log(response.alldata);
      setdata(response.data);
    })
    .catch(error);
  console.log(error);

  axios
    .get("http://localhost:5005/whatIWant/") 
    .then((response) => {
      console.log(response.alldata);
      setdata(response.data);
    })
    .catch(error);
  console.log(error);

  return (
    <div>
      <p>UserName + Measure + DataGift add a delete and update button</p>
      <p>
        {data.map((data) => (
          <div></div>
        ))}
      </p>
    </div>
  );
}

export default FinalPage;
