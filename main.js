/* eslint-disable no-console */
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const localTimeElement = document.getElementById('local-time');
const locationElement = document.getElementById('location');
const currentTemperatureElement = document.getElementById('current-temperature');
const feelsLikeElement = document.getElementById('feels-like');
const todayMinTemperatureElement = document.getElementById('today-min-temperature');
const todayMaxTemperatureElement = document.getElementById('today-max-temperature');
const windElement = document.getElementById('wind');
const uvElement = document.getElementById('uv');
const sunsetElement = document.getElementById('sunset');
const sunriseElement = document.getElementById('sunrise');
const humidityElement = document.getElementById('humidity');
const conditionElement = document.getElementById('condition');
const conditionIconElement = document.getElementById('condition-icon');
const temperatureUnitButton = document.getElementById('temperature-unit');
let isCelsius = true;
let weatherData; // Store weather data in a variable

const myKey = '6e77dbcd41ad4cf5b2a183208232112';
const defaultCity = 'London';

// Function to fetch weather data
async function fetchWeatherData(city) {
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${city}&days=3&aqi=no&alerts=no
  `;

  const response = await fetch(apiUrl, { mode: 'cors' });
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
  }
  return response.json();
}

// Function to output weather information
async function fetchWeatherInformation() {
  try {
    const city = cityInput.value || defaultCity;
    weatherData = await fetchWeatherData(city); // Update weatherData
    if (weatherData) {
      console.log(weatherData);
      // eslint-disable-next-line no-use-before-define
      displayWeatherInformation(weatherData);
      cityInput.value = '';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

function dateFormatter(date) {
  const inputDate = date;
  const dateObject = new Date(inputDate);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return dateObject.toLocaleString('en-GB', options);
}

function timeFormatter(time) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  const dateObject = new Date(`2000-01-01 ${time}`); // Using a common date for formatting
  return dateObject.toLocaleString('en-GB', options);
}

// Function to update temperature elements
function updateTemperatures(data, isCelsius) {
  const currentTemperatureKey = isCelsius ? 'temp_c' : 'temp_f';
  const feelsLikeKey = isCelsius ? 'feelslike_c' : 'feelslike_f';
  const todayMinTemperatureKey = isCelsius ? 'mintemp_c' : 'mintemp_f';
  const todayMaxTemperatureKey = isCelsius ? 'maxtemp_c' : 'maxtemp_f';

  return {
    currentTemperature: data.current[currentTemperatureKey],
    feelsLike: data.current[feelsLikeKey],
    todayMinTemperature: data.forecast.forecastday[0].day[todayMinTemperatureKey],
    todayMaxTemperature: data.forecast.forecastday[0].day[todayMaxTemperatureKey],
  };
}

// Function to handle button click
function handleTemperatureButtonClick(isCelsius) {
  const temperatures = updateTemperatures(weatherData, isCelsius);

  currentTemperatureElement.textContent = `Current Temperature: ${temperatures.currentTemperature} °${
    isCelsius ? 'C' : 'F'
  }`;
  feelsLikeElement.textContent = `Feels Like: ${temperatures.feelsLike}°${
    isCelsius ? 'C' : 'F'
  }`;
  todayMinTemperatureElement.textContent = `Min Temperature: ${temperatures.todayMinTemperature} °${
    isCelsius ? 'C' : 'F'
  }`;
  todayMaxTemperatureElement.textContent = `Max Temperature: ${temperatures.todayMaxTemperature} °${
    isCelsius ? 'C' : 'F'
  }`;
}

// Function to display weather information
function displayWeatherInformation(data) {
  const formattedDateUK = dateFormatter(data.location.localtime);
  const iconURL = `https:${data.current.condition.icon}`;
  const formattedSunset = timeFormatter(data.forecast.forecastday[0].astro.sunset);
  const formattedSunrise = timeFormatter(data.forecast.forecastday[0].astro.sunrise);

  localTimeElement.textContent = `Local Time: ${formattedDateUK}`;
  locationElement.textContent = `Location: ${data.location.name}, ${data.location.country}`;
  currentTemperatureElement.textContent = `Current Temperature: ${data.current.temp_c} °C`;
  feelsLikeElement.textContent = `Feels Like: ${data.current.feelslike_c} °C`;
  todayMinTemperatureElement.textContent = `Min Temperature: ${data.forecast.forecastday[0].day.mintemp_c} °C`;
  todayMaxTemperatureElement.textContent = `Min Temperature: ${data.forecast.forecastday[0].day.maxtemp_c} °C`;
  windElement.textContent = `Wind: ${data.current.wind_mph} mph`;
  uvElement.textContent = `UV: ${data.current.uv}`;
  sunsetElement.textContent = `Sunset: ${formattedSunset}`;
  sunriseElement.textContent = `Sunrise: ${formattedSunrise}`;
  humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
  conditionElement.textContent = `Condition: ${data.current.condition.text}`;
  conditionIconElement.src = iconURL;
}

searchButton.addEventListener('click', fetchWeatherInformation);

temperatureUnitButton.addEventListener('click', () => {
  isCelsius = !isCelsius; // Toggle between Celsius and Fahrenheit
  handleTemperatureButtonClick(isCelsius);
  if (isCelsius) {
    temperatureUnitButton.textContent = 'Display °F';
  } else {
    temperatureUnitButton.textContent = 'Display °C';
  }
});

// Initial fetch when the page loads
fetchWeatherInformation().then(() => {
  handleTemperatureButtonClick(isCelsius); // Call handleButtonClick with the initial value
});
