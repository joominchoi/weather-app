// Function to fetch weather data
function fetchWeatherData(city, apiKey) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  return fetch(apiUrl, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
      }
      return response.json();
    });
}

// Function to output weather information
async function fetchWeatherInformation() {
  const apiKey = '6e77dbcd41ad4cf5b2a183208232112';

  try {
    const searchTerm = 'awef';
    const responseData = await fetchWeatherData(searchTerm, apiKey);

    if (responseData) {
      console.log(responseData.location, responseData.current);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

fetchWeatherInformation();
