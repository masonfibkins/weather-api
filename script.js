var APIKEY = '87875bf0663cfa807f2fc62d46ca41e1';


 function getWeather(userInput) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=' + APIKEY)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        updateWeather(data);  
      });
 }

 function updateWeather(d) {
  var lat = d.coord.lat;
  var lon = d.coord.lon;
	var fahrenheit = Math.abs(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  var temp = fahrenheit.toFixed(2);
  document.getElementById('name').innerHTML = d.name;
	document.getElementById('temp').innerHTML = "Temp: " + temp + '&degF';
  document.getElementById('wind').innerHTML = "Wind: " + d.wind.speed + " MPH";
  document.getElementById('humid').innerHTML = "Humidity: " + d.main.humidity + "%";
  updateUV(lon, lat);
  getForecast(lon, lat);
}


function updateUV(lon, lat){
      //url to get lat and lon
    fetch('https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKEY + '&lon=' + lon + '&lat=' + lat)
    .then(function (response) {
      return response.json();
     })
     .then(function (data) {
     document.getElementById('uv').innerHTML = "UV: " + data.value;
     });
}

function getForecast(lon, lat){
  let forecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=hourly&appid=' + APIKEY;

  fetch(forecastURL)
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) { 
    updateForecast(data); 
  }); 
}

function updateForecast(d){
for(var i = 0; i < 6; i++){
var fahrenheit = Math.abs((parseFloat((d.daily[i].temp.day)-273.15)*1.8)+32); 
var temp = fahrenheit.toFixed(2);
  console.log(temp);
}
}

//event listener to get input from submit button
document.querySelector("#submit").addEventListener("click", function (event) {
  event.preventDefault();
  var city = document.getElementById("inputCity");
  var userInput = city.value;
  getWeather(userInput);
});