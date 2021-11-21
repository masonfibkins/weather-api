var APIKEY = '87875bf0663cfa807f2fc62d46ca41e1';


 function getWeather(userInput) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=' + APIKEY)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        updateWeather(data);
        
      });
 }

 function updateWeather( d ) {
  var lat = d.coord.lat;
  var lon = d.coord.lon;
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  document.getElementById('name').innerHTML = d.name;
	document.getElementById('temp').innerHTML = "Temp: " + fahrenheit + '&degF';
  document.getElementById('wind').innerHTML = "Wind: " + d.wind.speed + " MPH";
  document.getElementById('humid').innerHTML = "Humidity: " + d.main.humidity + "%";
  updateUV(lon, lat);
}


function updateUV(lon, lat){
      //url to get lat and lon
      fetch('https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKEY + '&lon=' + lon + '&lat=' + lat)
      .then(function (response2) {
        return response2.json();
      })
      .then(function (data2) {
        console.log(data2);
        document.getElementById('uv').innerHTML = "UV: " + data2.value;
      });
}

//event listener to get input from submit button
document.querySelector("#submit").addEventListener("click", function (event) {
  event.preventDefault();
  var city = document.getElementById("inputCity");
  var userInput = city.value;
  getWeather(userInput);
});