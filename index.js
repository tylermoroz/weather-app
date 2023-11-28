const form = document.querySelector("form");
const locationInput = document.getElementById("location-input");
const locationTitle = document.getElementById("location");
const temperature = document.getElementById("temp");

const locationData = async () => {
  const apiData = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=58609b6df0f2402e82c150303231811&q=${locationInput.value}`
  );
  const response = await apiData.json();
  locationTitle.textContent = `${response.location.name}, ${response.location.region}, ${response.location.country}`;
  temperature.textContent = `${response.current.temp_c}°C / ${response.current.temp_f}°F`;
  // console.log(
  //   `${response.location.name}, ${response.location.region}, ${response.location.country}. Currently ${response.current.temp_c} degrees Celsius.`
  // );
  console.log(response);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  locationData();
  form.reset();
});
