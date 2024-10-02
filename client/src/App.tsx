import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NoPageComp from './components/NoPageComp';
import NavigationMenuComp from './components/NavigationMenuComp';
import FooterComp from './components/FooterComp';
import VacationDisplayComp from './components/VacationDisplayComp';
import ParticipateDisplayComp from './components/ParticipateDisplayComp';

import { Vacation } from './components/VacationComp';

//https://getbootstrap.com/docs/5.3/examples/

function App() {
  const [vacations, setVacations] = useState<Array<Vacation>>(() => {
    var vacationJson = sessionStorage.getItem('vacations');
    if (vacationJson) {
      return JSON.parse(vacationJson);
    } else {
      return new Array<Vacation>();
    }
  });


  useEffect(() => {
    fetch('http://localhost:5000/api/vacations', { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        setVacations(data);
        sessionStorage.setItem('vacations', JSON.stringify(vacations));
      });
  }, []);

  var num = 10;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavigationMenuComp/>}>
            <Route index element={<VacationDisplayComp vacations={vacations} />} />
            <Route path="participate" element={<ParticipateDisplayComp vacations={vacations} chosenVacationId={num} />} />
            <Route path="*" element={<NoPageComp />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <FooterComp />
    </>
  );
}

export default App;