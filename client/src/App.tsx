import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavigationMenuComp from './components/NavigationMenuComp';
import FooterComp from './components/FooterComp';
import VacationDisplayComp from './components/VacationDisplayComp';
import ParticipateDisplayComp from './components/ParticipateDisplayComp';

import { Vacation } from './components/VacationComp';



function App() {
  const [vacations, setVacations] = useState<Array<Vacation>>();

  // TODO: take vacation information from tab data, othewise fetch it.

  useEffect(() => {
    fetch('http://localhost:5000/api/vacations', { mode: 'cors' })
      .then(response => response.json())
      .then(data => setVacations(data));
  }, []);

  console.log(vacations);

  return (
    <>
      <NavigationMenuComp />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<VacationDisplayComp vacations={vacations} />} />
            <Route path="/participate/" element={<ParticipateDisplayComp vacations={vacations} chosenVacationIndex={0} />} />
        </Routes>
      </BrowserRouter>
      <FooterComp/>
    </>
  );
}

export default App;