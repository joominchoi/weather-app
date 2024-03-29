# The Odin Project: Weather App
Creating a weather forecast site using a weather API

Check out the [project](https://joominchoi.github.io/weather-app/)!

**Course reference pages:**
- [Project: Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app)
- [Weather API](https://www.weatherapi.com/my/)

## Thoughts

## Learnings
- Be wary of typos when referencing key-value pairs from JSON data
- Typically in programming, a binary represantion like 0 and 1 is used for boolean values, where 1
often represents 'true' and 0 represents 'false'
  - Used to interpret 'is_day' parameter in weather API
where '1' indicates it's daytime and '0' indiciates it's nighttime.
- Not sure if this level of customisation is available in other APIs but the Weather API allows check and uncheck the fields you want to appear or not appear in the json response
  - Makes it easier to view json response when I have only checked the fields that I will be using
- The line *const dateObject = new Date(2000-01-01 ${time});* is creating a new JavaScript Date object. In this case, it's using a fixed date (January 1, 2000) with the time extracted from the time string.
  - The reason for using a fixed date (2000-01-01) is that we're only interested in formatting the time part, not the date. By providing a consistent date (January 1, 2000), we can use the toLocaleString method to format the time without affecting the actual date part of the string.
  - For example, if time is "06:30 PM", the resulting dateObject will represent January 1, 2000, at 6:30 PM. However, when we call toLocaleString on this object, it will only consider the time part for formatting, and the date will be ignored.
  - This approach is useful when you want to format time strings without dealing with the complexities of different date formats, time zones, etc. It allows you to leverage the toLocaleString method for consistent time formatting.
- 1rem is equivalent to the root font size
- Had to update content security policy on html file as webpage is served over HTTPS (secure), but was trying to load an insecure resoure (HTTP) - API does not offer HTTPS endpoint


## Recapping
- Adding styling to different classes to add and remove from element depending on state
  - For example having different styling for whether it is daytime or nighttime for the searched city/country
- To make an element grow larger when hovered over by cursor, use *transform: scale(X%)'* instead of manually setting width and height of element to prevent the enlargening of the element from affecting the layout of other elements.

## WIP
- Custom UI alert for invalid search parameter
