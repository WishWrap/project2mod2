import { useEffect, useState } from "react";
import axios from "axios";

function FinalPage () {
const [data, Setdata] =useState([]); 
useEffect(() => {
alldata(); 
},[]); 
const alldata = () => {
axios 
.get("http://localhost:5005") // faire / avec what I want 
.then ((response) => {
    console.log(response.alldata)
    Setdata(response.data)
})
.catch(error)
console.log(error)
}
return (
    <div> 
        <p>UserName + Measure + DataGift add a delete and update button</p>
        <p>
            {data.map((data)=>
            (<div></div>
            ))}
            </p>
            </div>
   
)
    
}



export default FinalPage