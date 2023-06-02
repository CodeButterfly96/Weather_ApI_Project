//challenge 1
//display current date and time using JavaScript: Tuesday 16:00
let weekDay = new Date();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];
let day = days[weekDay.getDay()];
let currentHour = weekDay.getHours();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = weekDay.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let time = `${currentHour}:${currentMinutes}`;

let date = document.querySelector("#date");
date.innerHTML = `${day} ${time}`;

//function displays location and weather of city input by user
function displayWeatherCondition(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#first-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//function uses api weather and input from previous function to give user weather condition
function searchCity(city) {
  let apiKey = "dde1f2d647a3967cf125beb90ab44f1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}


/*add a search engine, when searching for a city(i.e. Paris), 
display the city name on the page after the user submits the form. */
function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//submit city
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", displayCity);

//search location of user to display current weather in current location
function searchLocation(position) {
  let apiKey = "dde1f2d647a3967cf125beb90ab44f1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//geolocation api function
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

/* Display a fake temperature (i.e. 17) in Celsius and add a link to convert
it to Fahrenheit. When clicking on it, it should convert the temperatrue to 
Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.*/
function showCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#first-temp");
  currentTemperature.innerHTML = "10";
}
function showFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#first-temp");
  currentTemperature.innerHTML = "50";
}

//celcius button
let celciusTemperature = document.querySelector("#celsius");
celciusTemperature.addEventListener("click", showCelsius);

//fehrenheit button
let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", showFahrenheit);

//current location weather button
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
