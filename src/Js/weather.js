const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.querySelector("#cityname");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("#error");
// console.log(city);

const weatherBox = document.querySelector("#weatherBox");
const temp = document.querySelector("#temp");
const feelslike = document.querySelector("#feels");
const condition = document.querySelector("#desc");
const humidity = document.querySelector("#humidity");
const windspeed = document.querySelector("#wind");

let API_KEY = "234287c670b3aba119b63172daae1458";
if (!city) {
  loading.classList.add("hidden");
  errorBox.classList.remove("hidden");
} else {
  cityName.textContent = city;
  async function fetchweather(cityName) {
    try {
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );

      console.log(geoRes);

      if (!geoRes.ok) throw new Error("Geo API Failed");

      const geoData = await geoRes.json();

      console.log(geoData);

      let { lat, lon } = geoData[0];
      console.log(lat, lon);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      console.log(weatherRes);

      if (!weatherRes.ok) throw new Error("Weather API Failed");

      const weatherData = await weatherRes.json();
      console.log(weatherData);

      temp.textContent=weatherData.main.temp;
      feelslike.textContent=weatherData.main.feels_like;
      condition.textContent=weatherData.weather[0].description;
      humidity.textContent=weatherData.main.humidity;
      windspeed.textContent=weatherData.wind.speed;

      loading.classList.add("hidden");
      weatherBox.classList.remove("hidden");
    } catch (error) {
      console.log(error, "Error in Fetching weather Details");
      loading.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }
  fetchweather(city);
}
