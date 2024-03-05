async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
let weatherWidgetDiv = document.querySelector("#weatherWidget");
weatherWidgetDiv.style.display = "none";
let dropDown = document.querySelector("#citySelect");
dropDown.addEventListener("change", (event)=> {
  let selectedCity = event.target.value;
  selectedCity = selectedCity === "New York"? "New+York" : selectedCity;
  selectedCity = selectedCity === "San Francisco"? "San+Francisco" : selectedCity;
  dropDown.disabled = "disabled";
  weatherWidgetDiv.style.display = "none";
  let pendingP = document.querySelector(".info");
  pendingP.textContent = "Fetching weather data...";
   axios.get(`http://localhost:3003/api/weather?city=${selectedCity}`)
    .catch(error => {
      console.log(error.message);
      pendingP.textContent = "Weather info not found";
    })
    .then((res) => {
      let currentInfo = res.data.current;
      let forecastInfo = res.data.forecast;
      let locationInfo = res.data.location;
      weatherWidgetDiv.style.display = "block";
      pendingP.textContent = "";
      let todayStats = document.querySelector("#todayStats")
      let nextDay = document.querySelector("#forecast").children[0]
      let twoDays = document.querySelector("#forecast").children[1]
      let threeDays = document.querySelector("#forecast").children[2]
      function findWeather(infoDescription) {
        let weatherDescription;
        descriptions.forEach(weatherArray => {
          if (infoDescription === weatherArray[0]) {
            weatherDescription = weatherArray[1]
          }
        })
        return weatherDescription
      }
      function findDay (date) {
        let dayName = "Someday";
        let year = parseInt(date.slice(0, 4));
        let month =parseInt(date.slice(5, 7));
        let day = parseInt(date.slice(8,10));
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
        let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let monthName = months[month - 1];
        let formatDate = `${monthName} ${day}, ${year}`;
        let newDate = new Date(formatDate)
        let dayNumber = newDate.getDay() - 1
        dayName = weekDays[dayNumber]
        return dayName;
      }

      //Current Information
      document.querySelector("#apparentTemp").children[1].textContent =
        currentInfo.apparent_temperature + "°";
      document.querySelector("#todayDescription").textContent = 
        findWeather(currentInfo.weather_description);
      todayStats.children[0].textContent =
        `${currentInfo.temperature_min}°/${currentInfo.temperature_max}°`;
      todayStats.children[1].textContent = 
        `Precipitation: ${currentInfo.precipitation_probability * 100}%`;
      todayStats.children[2].textContent = 
        `Humidity: ${currentInfo.humidity}%`;
      todayStats.children[3].textContent = 
        `Wind: ${currentInfo.wind_speed}m/s`;

      // Forecast Information
      nextDay.children[0].textContent = 
        findDay(forecastInfo.daily[0].date);
      nextDay.children[1].textContent =
        findWeather(forecastInfo.daily[0].weather_description);
      nextDay.children[2].textContent =
        `${forecastInfo.daily[0].temperature_min}°/${forecastInfo.daily[0].temperature_max}°`;
      nextDay.children[3].textContent =
        `Precipitation: ${forecastInfo.daily[0].precipitation_probability * 100}%`;

      twoDays.children[0].textContent =
        findDay(forecastInfo.daily[1].date);
      twoDays.children[1].textContent =
        findWeather(forecastInfo.daily[1].weather_description);
      twoDays.children[2].textContent =
        `${forecastInfo.daily[1].temperature_min}°/${forecastInfo.daily[1].temperature_max}°`;
      twoDays.children[3].textContent =
        `Precipitation: ${forecastInfo.daily[1].precipitation_probability * 100}%`;

      threeDays.children[0].textContent =
        findDay(forecastInfo.daily[2].date);
      threeDays.children[1].textContent =
        findWeather(forecastInfo.daily[2].weather_description);
      threeDays.children[2].textContent =
        `${forecastInfo.daily[2].temperature_min}°/${forecastInfo.daily[2].temperature_max}°`;
      threeDays.children[3].textContent =
        `Precipitation: ${forecastInfo.daily[2].precipitation_probability * 100}%`;

      //Location Information
      document.querySelector("#location").children[0].textContent = 
        locationInfo.city;
      document.querySelector("#location").children[1].textContent =
        locationInfo.country;
    })
    .finally(()=> {
      dropDown.disabled = false;
    })
  
})

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
