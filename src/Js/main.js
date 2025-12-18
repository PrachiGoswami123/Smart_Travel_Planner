let searchbtn = document.querySelector("#search-btn");

searchbtn.addEventListener("click", () => {
  let city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    alert("please enter a city or country name");
    return;
  }
  window.location.href = `Destination.html?city=${city}`;
});
