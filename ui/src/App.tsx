import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetPerson } from './hooks/api-hooks';

function App() {
  const [getPerson, pending, error, data] = useGetPerson({
    species: true,
    films: true,
    starships: true,
  });

  React.useEffect(() => {
    getPerson(14);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {pending && "LOADING"}
        {data && <img src={logo} className="App-logo" alt="logo" />}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {process.env.REACT_APP_API_BASE_URL}
        </a>
      </header>
    </div>
  );
}

export default App;
