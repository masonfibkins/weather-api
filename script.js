var city = "Denver";

 function cityInput(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=87875bf0663cfa807f2fc62d46ca41e1')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
 }


 window.onload = function() {
    cityInput(city);
  }
