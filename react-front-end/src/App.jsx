import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./LandingPage.jsx";
import Dashboard from "./Dashboard.jsx";
import Outbreak from "./OutbreakPage.jsx";
import Focus from "./FocusPage.jsx";
import Checkout from "./Checkout.jsx";
import PostTravelSymptom from "./PostTravelPage.jsx";


function App() {
  let lsCountry = null;
  if (localStorage.getItem('country')) {
    lsCountry = localStorage.getItem('country');
  }
  const [country, setCountry] = React.useState(lsCountry);

  let lsSymptom = null;
  if (localStorage.getItem('symptom')) {
    lsSymptom = localStorage.getItem('symptom');
  }
  const [symptom, setSymptom] = React.useState(lsSymptom);


  const setCountryAbstract = (country) => {
    setCountry(country);
    localStorage.setItem('country', country);
  }

  const setSymptomAbstract = (symptom) => {
    setSymptom(symptom);
    localStorage.setItem('symptom', symptom);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing country={country} setCountryFunction={setCountryAbstract} symptom={symptom} setSymptomFunction={setSymptomAbstract}/>} />
        <Route path="/outbreak" element={<Outbreak country={country} setCountryFunction={setCountryAbstract}/>} />
        <Route path="/focus" element={<Focus country={country} setCountryFunction={setCountryAbstract}/>} />
        <Route path="/dashboard" element={<Dashboard country={country} setCountryFunction={setCountryAbstract}/>} />
        <Route path="/checkout" element={<Checkout country={country} setCountryFunction={setCountryAbstract}/>} />
        <Route path="/postTravel" element={<PostTravelSymptom country={country} symptom={symptom} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
