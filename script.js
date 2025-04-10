async function getLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "0ba3225877bf50ee04737afd434938dd";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
        try {
          const res = await fetch(url);
          const data = await res.json();
  
          if (data.cod == 200 || data.cod === "200") {
            document.getElementById('weatherBox').style.display = 'block';
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('temperature').textContent = data.main.temp;
            document.getElementById('condition').textContent = data.weather[0].main;
            document.getElementById('humidity').textContent = data.main.humidity;
  
            const temp = data.main.temp;
            let emoji = "⛅";
            if (temp >= 38) emoji = "🔥";
            else if (temp >= 30) emoji = "☀️";
            else if (temp >= 20) emoji = "🌤️";
            else if (temp >= 10) emoji = "🌥️";
            else if (temp >= 0) emoji = "☁️";
            else emoji = "❄️";
  
            document.getElementById('weatherEmoji').textContent = emoji;
          } else {
            alert("Failed to get weather: " + data.message);
          }
        } catch (err) {
          alert("Error fetching weather data.");
          console.error(err);
        }
      }, (err) => {
        alert("Location access denied or failed: " + err.message);
      });
    } else {
      alert("Geolocation not supported by your browser.");
    }
  }
  