const form = document.querySelector("form");
const locationInput = document.getElementById("location-input");
const locationTitle = document.getElementById("location");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temp");
const radios = document.getElementsByName("temperature");
const feelsLike = document.getElementById("feels-like");
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

const displayData = (res) => {
  locationTitle.textContent = `${res.location.name}, ${res.location.region}, ${res.location.country}`;
  condition.textContent = `${res.current.condition.text}`;
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
