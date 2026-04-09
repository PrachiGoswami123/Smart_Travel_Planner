// Get city from URL
const params = new URLSearchParams(window.location.search);
const city = params.get("city");

// DOM elements
const cityName = document.querySelector("#cityName");
const loading = document.querySelector("#loading");
const placesBox = document.querySelector("#placesBox");
const errors = document.querySelector("#error");

// API Keys
const WeatherAPI_KEY = "234287c670b3aba119b63172daae1458";
const UnsplashAPI_KEY = "Nxrkushh7QpGL_joTKsKhjckW7DYo94Rlp-578j-giQ";
const GeoapifyAPI_KEY = "147a968bc4c3418d86773b2783efb38c";

// If city not provided
if (!city) {
  loading.classList.add("hidden");
  errors.textContent = "City Not Provided";
  errors.classList.remove("hidden");
} else {
  cityName.textContent = `Best places in ${city}`;
  fetchPlaces(city);
}

// Fetch places function
async function fetchPlaces(cityName) {
  try {
    /* ---------------- GEO LOCATION ---------------- */
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${WeatherAPI_KEY}`
    );

    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error("City Not Found");

    const { lat, lon } = geoData[0];

    /* ---------------- PLACES API ---------------- */
    const placesRes = await fetch(
      `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},12000&limit=12&apiKey=${GeoapifyAPI_KEY}`
    );

    if (!placesRes.ok) throw new Error("Places API Failed");

    const data = await placesRes.json();
    loading.classList.add("hidden");

    if (!data.features.length) throw new Error("No Places Found");

    placesBox.classList.remove("hidden");
    placesBox.innerHTML = "";

    /* ---------------- LOOP PLACES ---------------- */
    for (let place of data.features) {
      let imageUrl = "https://placehold.co/400x300?text=Tourist+Spot";

      /* -------- UNSPLASH IMAGE -------- */
      try {
        const query = place.properties.name
          ? `${place.properties.name} ${city} tourism`
          : `${city} tourism`;

        const unsplashRes = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
          )}&per_page=1&client_id=${UnsplashAPI_KEY}`
        );

        const unsplashData = await unsplashRes.json();

        if (unsplashData.results?.length > 0) {
          imageUrl = unsplashData.results[0].urls.small;
        }
      } catch (err) {
        console.log("Unsplash image not found");
      }

      /* -------- CARD UI -------- */
      const div = document.createElement("div");
      div.className =
        "bg-white rounded-xl shadow hover:shadow-lg transition hover:scale-105 overflow-hidden";

      div.innerHTML = `
        <img 
          src="${imageUrl}" 
          alt="${place.properties.name || "Tourist Place"}"
          class="w-full h-40 object-cover"
        />

        <div class="p-4">
          <h3 class="font-bold text-lg text-green-700 mb-1">
            ${place.properties.name || "Tourist Place"}
          </h3>
          <p class="text-sm text-gray-600">
            ${place.properties.city || city}
          </p>
        </div>
      `;

      placesBox.appendChild(div);
    }
  } catch (error) {
    console.log("Places Error:", error.message);
    loading.classList.add("hidden");
    errors.textContent = error.message;
    errors.classList.remove("hidden");
  }
}
