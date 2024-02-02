const api = {
    key: "ac3d373982429d4527748ca90562f274",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  const defaultCity = 'Hyderabad'; // Set your default city here

  document.addEventListener('DOMContentLoaded', () => {
    // Display weather information for the default city when the page loads
    getResults(defaultCity);
  });
  
  const weatherForm = document.getElementById('weatherForm');
  weatherForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const query = searchbox.value;
    getResults(query);

    searchbox.value = ''; // Clear the input field after submission
  });

  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
      searchbox.value = "";
    }
  }
  
  async function getResults(query) {
    clearError();
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Weather data not available for ${query}`);
        }
        return response.json();
      })
      .then(weather => {
        displayResults(weather);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching weather data:', error.message);
        displayError(error.message);
      });
  }

  function displayError(message) {
    // Display the error message to the user (e.g., update UI with an error message)
    let errorElement = document.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      document.querySelector('.app-wrap').appendChild(errorElement);
    }
    errorElement.innerText = `Error: ${message}`;
  }

  // Clear error message when new search is made
  function clearError() {
    let errorElement = document.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let icon = weather.weather[0].icon;
    displayIcon(icon);

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    const forecastSection = document.getElementById('forecast');
    forecastSection.innerHTML = `<h2>Weather Forecast</h2>${processForecastData(forecast)}`;
    displayForecast(weather.coord.lat, weather.coord.lon);
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }

  function displayIcon(iconCode) {
    // Replace 'iconBaseUrl' with the actual base URL for OpenWeatherMap icons
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconElement = document.querySelector('.weather-icon');
  
    if (iconCode && iconElement) {
      iconElement.src = `${iconBaseUrl}${iconCode}@2x.png`;
      iconElement.alt = 'Weather Icon';
    }
  }

  function displayForecast(lat, lon) {
    fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${api.key}`)
        .then(response => response.json())
        .then(forecast => {
            const forecastSection = document.getElementById('forecast');
            forecastSection.innerHTML = `<h2>Weather Forecast</h2>${processForecastData(forecast)}`;
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error.message);
            displayError('Could not fetch forecast data.');
        });
  } 

  function processForecastData(forecast) {
    let forecastHTML = '';

    if (forecast && forecast.daily && forecast.daily.length > 0) {
        forecastHTML += '<div class="forecast">';
        
        forecast.daily.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

            forecastHTML += '<div class="forecast-day">';
            forecastHTML += `<div class="forecast-day-info"><img class="forecast-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather Icon">${dayOfWeek}</div>`;
            forecastHTML += `<div class="forecast-day-temp">${Math.round(day.temp.day)}°C</div>`;
            forecastHTML += '</div>';
        });

        forecastHTML += '</div>';
    } else {
        forecastHTML += '<p>No forecast data available.</p>';
    }

    return forecastHTML;
  }




  function getDayOfWeek(dayIndex) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
  }