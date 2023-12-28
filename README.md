# The Odin Project: Weather App
Creating a weather forecast site using a weather API

**Course reference pages:** \
[Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app)

## Thoughts

## Learnings
- Be wary of typos when referencing key-value pairs from JSON data
- Typically in programming, a binary represantion like 0 and 1 is used for boolean values, where 1
often represents 'true' and 0 represents 'false'
  - Used to interpret 'is_day' parameter in weather API
where '1' indicates it's daytime and '0' indiciates it's nighttime.
- Not sure if this level of customisation is available in other APIs but the Weather API allows check and uncheck the fields you want to appear or not appear in the json response
  - Makes it easier to view json response when I have only checked the fields that I will be using

## Recapping

## WIP
- Look of page should change based on the data - maybe by chaning the colour of the background or by adding images that describe the weather
- Design with 3 day forecast in mind to take into consideration free tier of WeatherAPI
- Add any styling you like!
- Optional: add a ‘loading’ component that displays from the time the form is submitted until the information comes back from the API. Use DevTools to test for low-end devices.
- Push that baby to github and share your solution below!