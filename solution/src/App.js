import React, {useState, useEffect} from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
  // State variables to manage form inputs, validations and table data
  const [name, setName] = useState('');
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([])

  return (
    <div className="App">
      <header className="App-header">
       <p>Hello</p>
      </header>
    </div>
  );
}

export default App;
