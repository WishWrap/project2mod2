import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import WhatIWant from "./pages/WhatIWant";
import ProfilPage from "./pages/ProfilPage";
import FinalPage from "./pages/FinalPage.jsx"; 
import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  return (
    <div className="App">

 

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/whatIWant/:idUser" element={<WhatIWant/>}/>
        <Route path="/profile/:idUser" element={<ProfilPage/>}/>
        <Route path="/finalPage/:idUser" element={<FinalPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
