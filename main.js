const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const localTimeElement = document.getElementById('local-time');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');

// Function to fetch weather data
function fetchWeatherData(city, apiKey) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  return fetch(apiUrl, { mode: 'cors' }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to fetch weather data. Status: ${response.status}`,
      );
    }
    return response.json();
  });
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

  localTimeElement.textContent = `Local Time: ${formattedDateUK}`;
  locationElement.textContent = `Location: ${data.location.name}, ${data.location.country}`;
  temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
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