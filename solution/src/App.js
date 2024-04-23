import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { isNameValid, getLocations } from './mock-api/apis'; // import mock API functions

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

  // Fetch locations from mock API when component mounts
  useEffect(() => {
    // Fetch locations from mock API
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const locationList = await getLocations(); // Use getLocations from mock API
        setLocations(locationList);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Function to handle name input change
  const handleNameChange = async (e) => {
    const newName = e.target.value;
    setName(newName);

   // Validate name using mock API
   try {
    const isValid = await isNameValid(newName); // Use isNameValid from mock API
    setIsNameTaken(!isValid);
  } catch (error) {
    console.error('Error checking name validity:', error);
  }
};

const handleLocationChange = (e) => {
  setSelectedLocation(e.target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!isNameTaken && selectedLocation !== '') {
    setTableData([...tableData, { name, location: selectedLocation }]);
    setName('');
    setSelectedLocation('');
  }
};

const handleClear = () => {
  setName('');
  setSelectedLocation('');
};

  return (
    <div className="App">
      <header className="App-header">
       <p>Hello</p>
      </header>
    </div>
  );
}

export default App;
