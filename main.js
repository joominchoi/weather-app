const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const localTimeElement = document.getElementById('local-time');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const feelsLikeElement = document.getElementById('feels-like');
const temperatureUnitButton = document.getElementById('temperature-unit');
let isCelsius = true;

// Function to fetch weather data
async function fetchWeatherData(city, apiKey) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  const response = await fetch(apiUrl, { mode: 'cors' });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch weather data. Status: ${response.status}`);
  }
  return response.json();
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
    hour12: true,
  };
  return dateObject.toLocaleString('en-GB', options);
}

// Function to display weather information
function displayWeatherInformation(data) {
  const formattedDateUK = dateFormatter(data.location.localtime);
  temperatureUnitButton.addEventListener('click', () => {
    isCelsius = !isCelsius; // Toggle between Celsius and Fahrenheit
    handleButtonClick(data, isCelsius);
  });

  localTimeElement.textContent = `Local Time: ${formattedDateUK}`;
  locationElement.textContent = `Location: ${data.location.name}, ${data.location.country}`;
  temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
  conditionElement.textContent = `Condition: ${data.current.condition.text}`;
  feelsLikeElement.textContent = `Feels Like: ${data.current.feelslike_c}°C`;
}

// Function to output weather information
async function fetchWeatherInformation() {
  const apiKey = '6e77dbcd41ad4cf5b2a183208232112';

  try {
    const city = cityInput.value || 'London';
    const responseData = await fetchWeatherData(city, apiKey);

    if (responseData) {
      console.log(responseData.location, responseData.current);
      displayWeatherInformation(responseData);
      cityInput.value = '';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

searchButton.addEventListener('click', fetchWeatherInformation);

fetchWeatherInformation();

// Function to update temperature elements
function updateTemperatures(data, isCelsius) {
  const temperatureElement = isCelsius
    ? data.current.temp_c
    : data.current.temp_f;
  const feelsLikeElement = isCelsius
    ? data.current.feelslike_c
    : data.current.feelslike_f;

  return {
    temperature: temperatureElement,
    feelsLike: feelsLikeElement,
  };
}

// Function to handle button click
function handleButtonClick(data, isCelsius) {
  const temperatures = updateTemperatures(data, isCelsius);

  temperatureElement.textContent = `Temperature: ${temperatures.temperature}°${
    isCelsius ? 'C' : 'F'
  }`;
  feelsLikeElement.textContent = `Feels Like: ${temperatures.feelsLike}°${
    isCelsius ? 'C' : 'F'
  }`;
}
