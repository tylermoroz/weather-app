const form = document.querySelector("form");
const locationInput = document.getElementById("location-input");
const locationTitle = document.getElementById("location");
const temperature = document.getElementById("temp");
const celcius = document.getElementById("celcius");
const farenheit = document.getElementById("farenheit");

const locationData = async () => {
  const apiData = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=58609b6df0f2402e82c150303231811&q=${locationInput.value}`
  );
  const response = await apiData.json();
  locationTitle.textContent = `${response.location.name}, ${response.location.region}, ${response.location.country}`;
  if (farenheit.checked) {
    temperature.textContent = `${response.current.temp_f}°F`;
  } else if (celcius.checked) {
    temperature.textContent = `${response.current.temp_c}°C`;
  }
  console.log(response);
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await locationData();
  form.reset();
});
