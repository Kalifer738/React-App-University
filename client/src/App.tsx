import React, { useEffect, useState } from 'react';
import { VacationComp, Vacation, VacationProps, IVacation } from './components/VacationComp';

import './App.css';

function App() {

  const [vacations, setVacations] = useState<[IVacation]>();

  useEffect(() => {
    //fetch('/api')
    fetch('/api/vacations')
      .then(response => response.json())
      .then(data => setVacations(data));
  }, []);

  return (
    <div>
      {typeof vacations === undefined ?
        (<p>Loading...</p>)
        :
        (<> {vacations?.map((vacation: Vacation, _, __) => (<VacationComp vacation={vacation}></VacationComp>))} </>)}
    </div>
  );
}

export default App;
