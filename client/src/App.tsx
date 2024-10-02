import './App.css';
import React, { useEffect, useState } from 'react';
import { VacationComp, Vacation, VacationProps, IVacation } from './components/VacationComp';
import { VacationDisplayComp } from './components/VacationDisplayComp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationMenuComp from './components/NavigationMenuComp';



function App() {

  const [vacations, setVacations] = useState<Array<Vacation>>();

  useEffect(() => {
    //fetch('/api')
    fetch('http://localhost:5000/api/vacations', { mode: 'cors' })
      .then(response => response.json())
      .then(data => setVacations(data));
  }, []);

  return (
    <>
      <NavigationMenuComp>
        <VacationDisplayComp vacations={vacations}></VacationDisplayComp>
      </NavigationMenuComp>
    </>
  );
}

export default App;