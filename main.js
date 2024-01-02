/* eslint-disable no-console */
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const localTimeElement = document.getElementById('local-time');
const locationElement = document.getElementById('location');
const currentTemperatureElement = document.getElementById('current-temperature');
const feelsLikeElement = document.getElementById('feels-like');
const windElement = document.getElementById('wind');
const uvElement = document.getElementById('uv');
const sunsetElement = document.getElementById('sunset');
const sunriseElement = document.getElementById('sunrise');
const humidityElement = document.getElementById('humidity');
const conditionElement = document.getElementById('current-condition');
const conditionIconElement = document.getElementById('current-condition-icon');
const temperatureUnitButton = document.getElementById('temperature-unit');
const speedUnitButton = document.getElementById('speed-unit');
const forecastDay1MinTemperature = document.getElementById('forecast-day-1-min-temperature');
const forecastDay1MaxTemperature = document.getElementById('forecast-day-1-max-temperature');
const forecastDay1Condition = document.getElementById('forecast-day-1-condition');
const forecastDay1ConditionIcon = document.getElementById('forecast-day-1-condition-icon');
const forecastDay2Element = document.getElementById('forecast-day-2');
const forecastDay2MinTemperature = document.getElementById('forecast-day-2-min-temperature');
const forecastDay2MaxTemperature = document.getElementById('forecast-day-2-max-temperature');
const forecastDay2Condition = document.getElementById('forecast-day-2-condition');
const forecastDay2ConditionIcon = document.getElementById('forecast-day-2-condition-icon');
const forecastDay3Element = document.getElementById('forecast-day-3');
const forecastDay3MinTemperature = document.getElementById('forecast-day-3-min-temperature');
const forecastDay3MaxTemperature = document.getElementById('forecast-day-3-max-temperature');
const forecastDay3Condition = document.getElementById('forecast-day-3-condition');
const forecastDay3ConditionIcon = document.getElementById('forecast-day-3-condition-icon');
let isCelsius = true;
let isMph = true;
let weatherData; // Store weather data in a variable

const myKey = '6e77dbcd41ad4cf5b2a183208232112';
const defaultCity = 'London';

// Function to fetch weather data
async function fetchWeatherData(city) {
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${city}&days=3&aqi=no&alerts=no
  `;

  const response = await fetch(apiUrl, { mode: 'cors' });
  if (!response.ok) {
    alert('Please enter a valid country or city');
    cityInput.value = '';
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
      toggleBackground();
      cityInput.value = '';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

function getDayOfWeek(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
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
  const currentTemperatureUnit = isCelsius ? 'temp_c' : 'temp_f';
  const feelsLikeUnit = isCelsius ? 'feelslike_c' : 'feelslike_f';
  const todayMinTemperatureUnit = isCelsius ? 'mintemp_c' : 'mintemp_f';
  const todayMaxTemperatureUnit = isCelsius ? 'maxtemp_c' : 'maxtemp_f';

  return {
    currentTemperature: data.current[currentTemperatureUnit],
    feelsLike: data.current[feelsLikeUnit],
    todayMinTemperature:
      data.forecast.forecastday[0].day[todayMinTemperatureUnit],
    todayMaxTemperature:
      data.forecast.forecastday[0].day[todayMaxTemperatureUnit],
  };
}

// Function to handle button click
function handleTemperatureUnitButtonClick(isCelsius) {
  const temperatures = updateTemperatures(weatherData, isCelsius);

  currentTemperatureElement.textContent = `${
    temperatures.currentTemperature
  }°${isCelsius ? 'C' : 'F'}`;
  feelsLikeElement.textContent = `Feels Like: ${temperatures.feelsLike}°${
    isCelsius ? 'C' : 'F'
  }`;
  todayMinTemperatureElement.textContent = `Min Temperature: ${
    temperatures.todayMinTemperature
  }°${isCelsius ? 'C' : 'F'}`;
  todayMaxTemperatureElement.textContent = `Max Temperature: ${
    temperatures.todayMaxTemperature
  }°${isCelsius ? 'C' : 'F'}`;
}

function updateSpeed(data, isMph) {
  const windUnit = isMph ? 'wind_mph' : 'wind_kph';

  return {
    wind: data.current[windUnit],
  };
}

function handleSpeedButtonClick(isMph) {
  const speed = updateSpeed(weatherData, isMph);

  windElement.textContent = `Wind: ${speed.wind}${isMph ? 'mph' : 'kph'}`;
}

// Function to display weather information
function displayWeatherInformation(data) {
  const formattedDateUK = dateFormatter(data.location.localtime);
  const currentConditioniconURL = `https:${data.current.condition.icon}`;
  const forecastDay1ConditioniconURL = `https:${data.forecast.forecastday[0].day.condition.icon}`;
  const forecastDay2ConditioniconURL = `https:${data.forecast.forecastday[1].day.condition.icon}`;
  const forecastDay3ConditioniconURL = `https:${data.forecast.forecastday[2].day.condition.icon}`;
  const formattedSunset = timeFormatter(data.forecast.forecastday[0].astro.sunset);
  const formattedSunrise = timeFormatter(data.forecast.forecastday[0].astro.sunrise);
  const forecastDay2Day = getDayOfWeek(data.forecast.forecastday[1].date);
  const forecastDay3Day = getDayOfWeek(data.forecast.forecastday[2].date);

  localTimeElement.textContent = formattedDateUK;
  locationElement.textContent = `${data.location.name}, ${data.location.country}`;
  currentTemperatureElement.textContent = `${data.current.temp_c}°C`;
  feelsLikeElement.textContent = `Feels Like: ${data.current.feelslike_c}°C`;
  windElement.textContent = `Wind: ${data.current.wind_mph}mph`;
  uvElement.textContent = `UV: ${data.current.uv}`;
  sunsetElement.textContent = `Sunset: ${formattedSunset}`;
  sunriseElement.textContent = `Sunrise: ${formattedSunrise}`;
  humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
  conditionElement.textContent = data.current.condition.text;
  conditionIconElement.src = currentConditioniconURL;
  forecastDay1MinTemperature.textContent = `${data.forecast.forecastday[0].day.mintemp_c}°C`;
  forecastDay1MaxTemperature.textContent = `${data.forecast.forecastday[0].day.maxtemp_c}°C`;
  forecastDay1Condition.textContent = data.forecast.forecastday[0].day.condition.text;
  forecastDay1ConditionIcon.src = forecastDay1ConditioniconURL;
  forecastDay2Element.textContent = forecastDay2Day;
  forecastDay2MinTemperature.textContent = `${data.forecast.forecastday[1].day.mintemp_c}°C`;
  forecastDay2MaxTemperature.textContent = `${data.forecast.forecastday[1].day.maxtemp_c}°C`;
  forecastDay2Condition.textContent = data.forecast.forecastday[1].day.condition.text;
  forecastDay2ConditionIcon.src = forecastDay2ConditioniconURL;
  forecastDay3Element.textContent = forecastDay3Day;
  forecastDay3MinTemperature.textContent = `${data.forecast.forecastday[2].day.mintemp_c}°C`;
  forecastDay3MaxTemperature.textContent = `${data.forecast.forecastday[2].day.maxtemp_c}°C`;
  forecastDay3Condition.textContent = data.forecast.forecastday[2].day.condition.text;
  forecastDay3ConditionIcon.src = forecastDay3ConditioniconURL;
}

searchButton.addEventListener('click', fetchWeatherInformation);

temperatureUnitButton.addEventListener('click', () => {
  isCelsius = !isCelsius; // Toggle between Celsius and Fahrenheit
  handleTemperatureUnitButtonClick(isCelsius);
  if (isCelsius) {
    temperatureUnitButton.textContent = 'Display °F';
  } else {
    temperatureUnitButton.textContent = 'Display °C';
  }
});

speedUnitButton.addEventListener('click', () => {
  isMph = !isMph;
  handleSpeedButtonClick(isMph);
  if (isMph) {
    speedUnitButton.textContent = 'Display kph';
  } else {
    speedUnitButton.textContent = 'Display mph';
  }
});

function toggleBackground() {
  const { body } = document;

  if (weatherData.current.is_day === 1) {
    body.classList.remove('night');
    body.classList.add('day');
  } else {
    body.classList.remove('day');
    body.classList.add('night');
  }
}

// Initial fetch when the page loads
fetchWeatherInformation().then(() => {
  // handleTemperatureUnitButtonClick(isCelsius); // Call handleButtonClick with the initial value
});
