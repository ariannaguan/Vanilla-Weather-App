function formatDate(now) {
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = now.getDay();
    let days = [
      `Sunday`,
      `Monday`,
      `Tuesday`,
      `Wednesday`,
      `Thursday`,
      `Friday`,
      `Saturday`
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function displayWeatherCondition(response) {
    console.log(response);
  
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#country").innerHTML = response.data.sys.country;
  
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].description;
  
    document.querySelector("#temperature-today").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  
  function searchCity(city) {
    let apiKey = "63e5d82d6246e7e494e19e9c5b4326e5";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchCurrentLocation(position) {
    let apiKey = "63e5d82d6246e7e494e19e9c5b4326e5";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-today");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  }
  
  function convertToCelcius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-today");
    temperatureElement.innerHTML = 19;
  }
  
  let dateElement = document.querySelector("#date");
  let now = new Date();
  dateElement.innerHTML = formatDate(now);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", getCurrentLocation);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", convertToCelcius);
  
  searchCity("London");
  