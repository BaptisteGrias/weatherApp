import arrDayOrder from './utilitaires/timeGestion.js';

const apiKey = '68a60dd4c54746ee1f2a1a252f9801d3';
let resultApi;

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const location = document.querySelector('.location');
const hour = document.querySelectorAll('.hour-name-forecast');
const weatherPerHour = document.querySelectorAll('.hour-forecast-value');
const dayDiv = document.querySelectorAll('.day-forecast-name');
const temperatureDayDiv = document.querySelectorAll('.day-forecast-temp');
const imgIcon = document.querySelector('.logo-weather');
const loaderContainer = document.querySelector('.overlay-icon-loader');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      callApi(long, lat);
      console.log(long, lat);
    },
    () => {
      alert('you must allow your location browser for using this app');
    },
  );
}

function callApi(long, lat) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=imperial&lang=en&appid=${apiKey}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultApi = data;
      console.log(resultApi);

      weather.innerHTML = resultApi.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultApi.current.temp) + 10}°`;
      location.innerText = resultApi.timezone;

      //   hours by 3 hours with temperature

      let actualHour = new Date().getHours();

      for (let i = 0; i < hour.length; i++) {
        let hourIncr = actualHour + i * 3;

        if (hourIncr > 24) {
          hour[i].innerText = `${hourIncr - 24} h`;
        } else if (hourIncr === 24) {
          hour[i].innerText = '00 h';
        } else {
          hour[i].innerText = `${hourIncr}h`;
        }
      }

      //    temperature by 3 hours

      for (let i = 0; i < weatherPerHour.length; i++) {
        weatherPerHour[i].innerText = `${Math.trunc(resultApi.hourly[i * 3].temp) + 10}°`;
      }

      //   three first letter of the day

      for (let j = 0; j < arrDayOrder.length; j++) {
        dayDiv[j].innerText = arrDayOrder[j].slice(0, 3);
      }

      //   temperature per day

      for (let k = 0; k < 7; k++) {
        temperatureDayDiv[k].innerText = `${Math.trunc(resultApi.daily[k + 1].temp.day)}°`;
      }

      //   logo dynamique

      if (actualHour >= 6 && actualHour < 21) {
        imgIcon.src = `ressources/days/${resultApi.current.weather[0].icon}.svg`;
      } else {
        imgIcon.src = `ressources/nights/${resultApi.current.weather[0].icon}.svg`;
      }

      //   loader

      loaderContainer.classList.add('disappear');
    });
}
