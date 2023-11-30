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
  locationTitle.textContent = `${response.location.name}, ${response.location.region}, ${response.location.country}`;
  condition.textContent = `${response.current.condition.text}`;
  temperature.textContent = `${response.current.temp_c}°C`;
  feelsLike.textContent = `Feels like ${response.current.feelslike_c}°C`;
  for (let radio of radios) {
    if (radio.value == "farenheit") {
      radio.addEventListener("click", () => {
        temperature.textContent = "";
        feelsLike.text = "";
        temperature.textContent = `${response.current.temp_f}°F`;
        feelsLike.textContent = `Feels like ${response.current.feelslike_f}°F`;
      });
    } else if (radio.value == "celcius") {
      radio.addEventListener("click", () => {
        temperature.textContent = "";
        feelsLike.text = "";
        temperature.textContent = `${response.current.temp_c}°C`;
        feelsLike.textContent = `Feels like ${response.current.feelslike_c}°C`;
      });
    }
  }
  console.log(response);
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await locationData();
  form.reset();
});
