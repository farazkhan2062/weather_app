import React from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = React.useState("");
  const [error, setError] = React.useState("");
  const [weather, setWeather] = React.useState(null);
  const [loading, setLoading] = React.useState(false);


  console.log("city = ", city);
  const fetchweatherdata = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log("Fetching Weather Data");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      setError("")
      console.log("Fetching Weather Data = ", weatherResponse);
      setWeather(weatherResponse.data);
    } catch (error) {
      console.log("Error = ", error);
      setError("City not found")
      setWeather(null);

    }
    finally {
      setLoading(false)
    }
    
  };
  return (
    <div className="weather-container">
      <h1>weather App</h1>
      <form onSubmit={fetchweatherdata}>
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && (<p>{error}</p>)}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Tempreture: {weather.main.temp}</p>
          <p>Feel Like: {weather.main.feels_like}</p>
          <p>Wind Speed: {weather.wind.speed}</p>
          <p>Humidity: {weather.main.humidity}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
