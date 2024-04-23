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
    const isValid = await isNameValid(newName);
    const isNameInTable = tableData.some(item => item.name === newName); // Check if name already exists in table data
    setIsNameTaken(!isValid || isNameInTable); // If name is taken or already exists in table, set isNameTaken to true
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
       <form onSubmit={handleSubmit}>
       <div className="form-group">
          <div style={{display: 'flex',gap:'10px', flexDirection:'column'}}>
            <div style={{display:'flex', gap: '7px'}}>
            <label>Name </label>
            <input type="text" value={name} onChange={handleNameChange} />
            </div>
            {isNameTaken && <span className="error-message">This name is already taken.</span>}
          </div>
          <div style={{display: 'flex',gap:'10px', marginLeft:'-25px'}}>
            <label>Location </label>
            <select value={selectedLocation} onChange={handleLocationChange}>
              <option value="" className='options'>Select location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="button-group">
          <button type="button" onClick={handleClear}>Clear</button>
          <button type="submit">Add</button>  
        </div> 
       </form>
       <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{data.name}</td>
              <td>{data.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </header>
    </div>
  );
}

export default App;
