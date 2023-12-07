const form = document.querySelector("form");
const locationInput = document.getElementById("location-input");
const locationContainer = document.getElementById("location-container");
const locationCity = document.getElementById("location-city");
const locationRegion = document.getElementById("location-region");
const weatherIcon = document.getElementById("weather-icon");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temp");
const radios = document.getElementsByName("temperature");
const feelsLike = document.getElementById("feels-like");
const lastUpdate = document.getElementById("last-update");
const celcius = document.getElementById("celcius");
const farenheit = document.getElementById("farenheit");

const locationData = async () => {
  const apiData = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=58609b6df0f2402e82c150303231811&q=${locationInput.value}`
  );
  const response = await apiData.json();
  console.log(response);
  displayData(response);
  toggleTemp(response);
};

const displayData = async (res) => {
  locationContainer.style.display = "flex";
  locationCity.textContent = `${res.location.name}`;
  locationRegion.textContent = `${res.location.region}, ${res.location.country}`;
  weatherIcon.src = `${res.current.condition.icon}`;
  condition.textContent = `${res.current.condition.text}`;
  lastUpdate.textContent = `Last update: (local time) ${res.current.last_updated}`;
  for (let radio of radios) {
    if (radio.checked && radio.value == "celcius") {
      temperature.textContent = `${res.current.temp_c}°C`;
      feelsLike.textContent = `Feels like ${res.current.feelslike_c}°C`;
    } else if (radio.checked && radio.value == "farenheit") {
      temperature.textContent = `${res.current.temp_f}°F`;
      feelsLike.textContent = `Feels like ${res.current.feelslike_f}°F`;
    }
  }
};

const toggleTemp = (res) => {
  for (let radio of radios) {
    if (radio.value == "farenheit") {
      radio.addEventListener("click", () => {
        temperature.textContent = "";
        feelsLike.text = "";
        temperature.textContent = `${res.current.temp_f}°F`;
        feelsLike.textContent = `Feels like ${res.current.feelslike_f}°F`;
      });
    } else if (radio.value == "celcius") {
      radio.addEventListener("click", () => {
        temperature.textContent = "";
        feelsLike.text = "";
        temperature.textContent = `${res.current.temp_c}°C`;
        feelsLike.textContent = `Feels like ${res.current.feelslike_c}°C`;
      });
    }
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await locationData();
  form.reset();
});
