import './App.css';
import SearchBar from './components/SearchBar';
import WeatherData from './components/WeatherData';


function App() {
  return (
    <div id='main' className="container">
      {/* Search Bar Component*/}
      <SearchBar/>
      {/* Iterating through array */}
      <WeatherData/>
      </div>
  );
}
export default App;
