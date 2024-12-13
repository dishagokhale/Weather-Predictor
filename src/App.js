import React, { useEffect, useState } from 'react';
import './App.css';

const apiKey = '69VbkJnLPBc6k0dUmxKIbeKD3pNXEroB';

const App = () => {
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const targetUrl = `http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${apiKey}`;
    // const fetchUrl = proxyUrl + targetUrl;

    // fetch(fetchUrl)
    fetch(`http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setCities(data);
      })
      .catch(err => {
        setError('Error fetching city list');
      });
  }, []);

  const fetchWeather = (cityKey) => {
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const targetUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${apiKey}`;
    // const fetchUrl = proxyUrl + targetUrl;
  
    // fetch(fetchUrl)
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${apiKey}`)
      .then(response => response.json())
      .then(weatherResponse => {
        const cityData = cities.find(city => city.Key === cityKey);
        setWeather({
          city: cityData.LocalizedName,
          country: cityData.Country.LocalizedName,
          temperature: weatherResponse.DailyForecasts[0].Temperature,
          condition: weatherResponse.Headline.Text,
          icon: weatherResponse.DailyForecasts[0].Day.Icon,
          day: weatherResponse.DailyForecasts[0].Day,
          night: weatherResponse.DailyForecasts[0].Night,
          headline: weatherResponse.Headline,
          link: weatherResponse.Headline.Link
          
        });
        setError(null);
      })
      .catch(err => {
        setError('Error fetching data');
        setWeather(null);
      });
  };
  
  const handleCityChange = (event) => {
    const cityKey = event.target.value;
    setSelectedCity(cityKey);
    fetchWeather(cityKey);
  };

  return (
    <div className="app">
      <h1>Weather Predictor</h1>
      <div className="select-container">
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {cities.map(city => (
            <option key={city.Key} value={city.Key}>{city.LocalizedName},{city.Country.LocalizedName}</option>
          ))}
        </select>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city},{weather.country}</h2>
          <img src={`https://developer.accuweather.com/sites/default/files/${weather.icon < 10 ? '0' : ''}${weather.icon}-s.png`} alt="Weather Icon" />
          <div className="temperature">
            <p>Temperature: {weather.temperature.Minimum.Value}°F - {weather.temperature.Maximum.Value}°F</p>
          </div>
          <div className="condition">
            <p>Condition: {weather.condition}</p>
          </div>
          <div className="time">
          <div className="day">
            <h3>Day:</h3> <p>{weather.day.IconPhrase}, <br/> Precipitation: {weather.day.HasPrecipitation ? 'Yes' : 'No'}, <br/> Type: {weather.day.PrecipitationType || 'None'}</p>
          </div>
          <div className="night">
            <h3>Night:</h3> <p>{weather.night.IconPhrase}, <br/> Precipitation: {weather.night.HasPrecipitation ? 'Yes' : 'No'}, <br/> Type: {weather.day.PrecipitationType || 'None'}</p>
          </div>
          </div>
          <div className="headline">
            <p>Severity: {weather.headline.Severity}</p>
            <p>Category: {weather.headline.Category || 'None'}</p>
            <p>Headline: {weather.headline.Text}</p>
          </div>
          <div className="links">
            <a href={weather.link} target="_blank" rel="noopener noreferrer">Detailed Link</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
