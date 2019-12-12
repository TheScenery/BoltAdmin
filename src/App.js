import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import BoltAdminClient from './components/BoltAdminClient';

function App() {
  return (
    <Router>
      <Route path="/">
          <div className="App">
            <BoltAdminClient />
          </div>
        </Route>
    </Router>
  );
}

export default App;
