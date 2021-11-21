var APIKEY = '87875bf0663cfa807f2fc62d46ca41e1';


 function getWeather(userInput) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=' + APIKEY)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        updateWeather(data);
        storeWeather(userInput);
      });
 }

 function updateWeather(d) {
  var lat = d.coord.lat;
  var lon = d.coord.lon;
	var fahrenheit = Math.abs(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  var temp = fahrenheit.toFixed(2);
  document.getElementById('currentCity').innerHTML = d.name;
	document.getElementById('temp').innerHTML = "Temperature: " + temp;
  document.getElementById('wind').innerHTML = "Wind: " + d.wind.speed;
  document.getElementById('humid').innerHTML = "Humidity: " + d.main.humidity;
  updateUV(lon, lat);
  getForecast(lon, lat);
  
  storeWeather(d);
  storeCityList(d);
}


function updateUV(lon, lat){
      //url to get lat and lon
    fetch('https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKEY + '&lon=' + lon + '&lat=' + lat)
    .then(function (response) {
      return response.json();
     })
     .then(function (data) {
     document.getElementById('todaysUVIndex').innerHTML = "UV: " + data.value;
     });
}

function getForecast(lon, lat){
  var forecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=hourly&appid=' + APIKEY;

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
// console.log(d);
// document.getElementById('d-temp').innerHTML = "Temp: " + temp + '&degF';
// document.getElementById('d-wind').innerHTML = "Wind: " + d.daily[i].wind_speed + " MPH";
// document.getElementById('d-humid').innerHTML = "Humidity: " + d.daily[i].humidity + "%";

var cardDiv = document.createElement("div");
cardDiv.setAttribute("class", "card forecast-card mx-2 shadow");
var cardBodyDiv = document.createElement("div");
cardBodyDiv.setAttribute("class", "card-body");
var dateDiv = document.createElement("div");
dateDiv.setAttribute("class", "forecast-date");

var pTemp = document.createElement("p");
const newContent = document.createTextNode("Temp: " + temp + " °F");
pTemp.appendChild(newContent);

var wind = d.daily[i].wind_speed;
var pWind = document.createElement("p");
const newWind = document.createTextNode("Wind: " + wind + " MPH");
pWind.appendChild(newWind);


var humidity = d.daily[i].humidity;
var pHumid = document.createElement("p");
const newHumidity = document.createTextNode("Humidity: " + humidity + "%")
pHumid.appendChild(newHumidity);

cardBodyDiv.append(pTemp, pWind, pHumid);
cardDiv.append(cardBodyDiv);
document.getElementById("forecast").appendChild(cardDiv);

}
}

function storeWeather(data){
  var dataList = [];
  dataList = JSON.parse(localStorage.getItem('session')) || [];
  dataList.push(data);
  localStorage.setItem('session', JSON.stringify(dataList));
}

function storeCityList(data){
  var cityList = [];
  cityList = JSON.parse(localStorage.getItem('cities')) || [];
  cityList.push(data.name);
  localStorage.setItem('cities', JSON.stringify(cityList));
  // console.log(cityList);
  // citySearchList(data);
}

function citySearchList(){
  let searchHistory = localStorage;
  for(let i = 0; i < 9; i++){
    console.log(searchHistory[i]);
  }
   
}








//event listener to get input from submit button
document.querySelector("#citySearchBtn").addEventListener("click", function (event) {
  event.preventDefault();
  var city = document.getElementById("citySearchText");
  var userInput = city.value;
  getWeather(userInput);
  // citySearchList();
});

