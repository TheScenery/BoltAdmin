import React from 'react';
import logo from './gopher.png';
import './App.css';
import { getAllDB } from './request/api';

function App() {
  // test api proxy
  getAllDB().then(result => console.log(result));
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
