import React, { useEffect, useState } from 'react';
import { Vacation } from '../../shared/typescript/Vacation';

import './App.css';

function App() {

  const [vacations, setVacations] = useState([{}]);

  useEffect(() => {
    //fetch('/api')
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setVacations(data));
  }, []);

  return (
    <div>
      {typeof vacations === undefined ? (<p>Loading...</p>) :
      (
        <ul>
            {vacations.map((vacation: any) => (
            <li key={vacation.id}>
                <h4>{vacation.id}</h4>
                <h4>{vacation.title}</h4>
                <h4>{vacation.body}</h4>
                <h4>{vacation.pictureURL}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
