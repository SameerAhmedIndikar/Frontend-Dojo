// ===== Async/Await Weather App =====

// ✅ Your API key (must be inside quotes)
const API_KEY = "f01ee5cdaab609c9acef62cef5b60572";

document.getElementById("getWeather").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "<p>❌ Please enter a city name</p>";
    return;
  }

  try {
    // 1️⃣ Fetch weather data using async/await
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // 2️⃣ Extract useful info
    const cityName = data.name;
    const temp = data.main.temp;
    const condition = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // 3️⃣ Show result on page
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
      <h2>${cityName}</h2>
      <img src="${icon}" alt="${condition}">
      <p><b>Temperature:</b> ${temp} °C</p>
      <p><b>Condition:</b> ${condition}</p>
    `;
  } catch (error) {
    // 4️⃣ Error handling
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<p>❌ ${error.message}</p>`;
  }
});
