//temp
//wind
//humidity
//UV

 function cityInput(event) {
  event.preventDefault();
  var city = document.getElementById("inputCity");
  var userInput = city.value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=87875bf0663cfa807f2fc62d46ca41e1')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        updateWeather(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
            //url to get lat and lon
            fetch('https://api.openweathermap.org/data/2.5/uvi?appid=87875bf0663cfa807f2fc62d46ca41e1&lon=' + lon + '&lat=' + lat)
            .then(function (response2) {
              return response2.json();
            })
            .then(function (data2) {
              console.log(data2);
              document.getElementById('uv').innerHTML = "UV: " + data2.value;
            })
      });
      

 }

 function updateWeather( d ) {
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 

  document.getElementById('name').innerHTML = d.name;
	document.getElementById('temp').innerHTML = "Temp: " + fahrenheit + '&degF';
  document.getElementById('wind').innerHTML = "Wind: " + d.wind.speed + " MPH";
  document.getElementById('humid').innerHTML = "Humidity: " + d.main.humidity + "%";
}

 document.querySelector("#submit").addEventListener("click", cityInput);

//all user inputs saved in local storage
