import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import WeatherData from './Components/WeatherData';
import {getWeatherData}  from './Services/WeatherService';


function App() {
  const persistedLocation = localStorage.getItem('searchTerm');
  const[searchTerm, setSearchTerm] = useState (persistedLocation || 'Dallas, TX');
  const [weatherData, setWeatherData] =useState ([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting');
  }
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm) }, [searchTerm]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getWeatherData();
        console.log(response.data.list);
        setWeatherData(response.data.list);
        setLoading(false)
    } catch {
      setError(true);
      setLoading(false);
    }
  }
    fetchData();
}, []);
  return (
    <div id='main' className="container">
      {/* Search Bar Component */}
      <SearchBar handleSubmit={handleSubmit} searchTerm={searchTerm} handleChange={handleChange} id={'search-city'}>
      <strong> Search City: {searchTerm}</strong>
      </SearchBar>
      {false ? <p>My condition is true</p>: <p>My condition is false</p> }
      {error && <p>There ws error loading your data</p>}
      {loading ? <p>Data Loading</p> : (
      <WeatherData list={weatherData} />
      )}
    </div>
  );
}
export default App;