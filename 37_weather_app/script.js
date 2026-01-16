const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const condition = document.querySelector("small");
const Error = document.querySelector(".error");
const Weather = document.querySelector(".weather");

// reset--
city.textContent = "";
temp.textContent = "";
humidity.textContent = "";
wind.textContent = "";
weatherIcon.src = "";
condition.textContent = "search to know";

// events...
searchBtn.addEventListener("click", () => {
  const cityValue = searchBox.value.trim();
  if (!cityValue) return;
  checkWeather(cityValue);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const cityValue = searchBox.value.trim();
    if (!cityValue) return;
    checkWeather(cityValue);
  }
});

async function checkWeather(city) {
  const apiKey = "";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      Error.style.display = "block";
      Weather.style.display = "none";
      return;
    }

    if (data.cod === 200) {
      Weather.style.display = "block";
      Error.style.display = "none";

      renderDOM(data);
      searchBox.value = "";
      searchBox.focus();
    }
  } catch (error) {
    alert("Error while fetching data");
  }
}

function renderDOM(data) {
  city.textContent = data.name;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;
  condition.textContent = "";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "./images/clouds.png";
    condition.textContent = data.weather[0].main;
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "./images/clear.png";
    condition.textContent = data.weather[0].main;
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "./images/rain.png";
    condition.textContent = data.weather[0].main;
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "./images/drizzle.png";
    condition.textContent = data.weather[0].main;
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "./images/mist.png";
    condition.textContent = data.weather[0].main;
  } else if (data.weather[0].main === "Haze") {
    weatherIcon.src = "./images/Haze.png";
    condition.textContent = data.weather[0].main;
  }
}
