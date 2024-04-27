// All imports are done here
import React, {useState, useEffect} from 'react';
import { isNameValid, getLocations } from './mock-api/apis'; // import mock API functions
import logo from './logo.svg';
import './App.css';

function App() {
  // State variables to manage form inputs, validation, location options, loading state, and table data
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
      setIsLoading(true); // Set loading state to true while fetching data
      try {
        const locationList = await getLocations(); // Fetch locations from mock API
        setLocations(locationList);         // Set locations state with fetched data
      } catch (error) {
        console.error('Error fetching locations:', error);  //Log any errors that occur during fetching
      } finally {
        setIsLoading(false); //// Set loading state to false after fetching completes (whether successful or not)
      }
    };

    fetchLocations(); // Invoke the fetchLocations function when component mounts
  }, []);

  // Event handler to validate name input as user types
  const handleNameChange = async (e) => {
    const newName = e.target.value;    // Get the new value of the name input
    // Validate input to allow only letters
  if (/^[a-zA-Z\s]*$/.test(newName)) {
    // If input contains only letters or whitespace, update the name state
    setName(newName);
  }
   // Validate name using mock API
   try {
    const isValid = await isNameValid(newName);
    const isNameInTable = tableData.some(item => item.name === newName); // Check if name already exists in table data
    setIsNameTaken(!isValid || isNameInTable); // If name is taken or already exists in table, set isNameTaken to true
  } catch (error) {
    console.error('Error checking name validity:', error); // Log any errors that occur during name validation
  }
  };

// Event handler to update selected location
const handleLocationChange = (e) => {
  setSelectedLocation(e.target.value); // Update selectedLocation state with the new value from dropdown
};


// Event handler to handle form submission
const handleSubmit = (e) => {
  e.preventDefault();  // Prevent default form submission behavior
  if (!isNameTaken && selectedLocation !== '') {
    // Add new data to tableData state
    setTableData([...tableData, { name, location: selectedLocation }]);

    // Clear name and selectedLocation inputs
    setName('');
    setSelectedLocation('');
  }
};

// Event handler to clear form inputs
const handleClear = () => {
  // Clear name and selectedLocation inputs
  setName('');
  setSelectedLocation('');
};
  return (
    <div className="App">
      <header className="App-header">
        {/* Form element */}
       <form onSubmit={handleSubmit}>
       <div className="form-group">
          <div style={{display: 'flex',gap:'10px', flexDirection:'column'}}>
            <div style={{display:'flex', gap: '7px'}}>
            <label>Name </label>
            <input type="text" value={name} onChange={handleNameChange}  />
            </div>
            {/* Error message displayed if name is taken */}
            {isNameTaken && <span className="error-message">This name is already taken.</span>}
          </div>
          <div style={{display: 'flex',gap:'10px', marginLeft:'-25px'}}>
            <label>Location </label>
            <select value={selectedLocation} onChange={handleLocationChange} id='select123'>
              <option value="">Select location</option>
              {/* Mapping through locations to render dropdown options */}
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
       {/* Table to display registered data */}
       <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through tableData to render table rows */}
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
