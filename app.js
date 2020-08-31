window.addEventListener('load', () => {
  let long;
  let lat;

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // long = Math.round(long * 1000) / 1000;
      // lat = Math.round(lat * 1000) / 1000;
      let tempDesc = document.querySelector('.temp-description');
      let tempDeg = document.querySelector('.temp-degree');
      let locTimezone = document.querySelector('.loc-timezone');
      let tempSec = document.querySelector('.temp-section');
      let tempSpan = document.querySelector('.temp-section span');

      // lat = 43.15
      // lon = -77.62
      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5a921df27f42ca519b1b1e137d5e4ec7`
      
      fetch(api)
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          // console.log(data);
          const {temp} = data.main;
          const {description} = data.weather[0];
          // Set DOM elements from the API
          let a = (temp - 273.15) * (9/5) + 32;
          let celsius = Math.round((temp - 273.15) * 100) / 100;
          let b = Math.round(a * 10) / 10;
          tempDeg.textContent = b;
          tempDesc.textContent = description;
          locTimezone.textContent = data.name + ', ' + data.sys.country;
          // Set icon
          setIcon(description, document.querySelector(".icon"));

          //Change temp to Celsius/Fahrenheit
            tempSec.addEventListener('click', () => {
              if(tempSpan.textContent ==="F") {
                tempSpan.textContent = "C";
                tempDeg.textContent = celsius;
              } else {
                tempSpan.textContent = "F";
                tempDeg.textContent = b;
              }
            });
        });
    })
  } 
  else {
    h1.textContent = "Didn't work."
  }

  function setIcon(icon, iconID) {
    var result;
    const skycons = new Skycons({color: "white"});
    const currIcon = icon.replace(/-/g, "_");
    switch(currIcon) {
      case "clear sky":
        result = "CLEAR_DAY";
        break;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        result = "PARTLY_CLOUDY_DAY";
        break;
      case "shower rain":
      case "rain":
      case "thunderstorm":
        result = "RAIN";
        break;
      case "snow":
        result = "SNOW";
        break;
      case "mist":
        result = "FOG";
        break;
    }
    skycons.play();
    return skycons.set(iconID, Skycons[result]);
  }


});