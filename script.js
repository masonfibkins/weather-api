var APIKEY = '87875bf0663cfa807f2fc62d46ca41e1';

//calls search button
$(document).ready(function () {
  $("#search-button").on("click", function () {
    //sets search item to var
      var searchTerm = $("#search-value").val();
      $("#search-value").val("");
      weatherFunction(searchTerm);
  });

  //function to call weather api
  function weatherFunction(searchTerm) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=" + APIKEY,
    }).then(function(data){
      
      //clears search box for new input
      $("#today").empty();
      var tempData = data.main.temp;
      var windData = data.wind.speed;
      var humidityData = data.main.humidity;
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      weatherForecast(lat, lon);
      var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
      
      var card = $("<div>").addClass("card");
      var cardBody = $("<div").addClass("card-body");
      var temp = $("<p>").addClass("Temperature: " + tempData + " °F");
      var wind = $("<p>").addclass("Wind: " + windData + " MPH");
      var humidity = $("<p>").addClass("Humidity: " + humidityData + " %");
      //gets uv index using lat and lon
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKEY + "&lat=" + lat + "&lon=" + lon,
      }).then(function(response){
        console.log(response);
        
        var uvColor;
        var uvData = response.value;
        var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(uvData);

        if(uvData < 3){
          btn.addClass("btn-success");
        }else if(uvData < 7){
          btn.addClass("btn-warning");
        }else{
          btn.addClass("btn-danger");
        }

        cardBody.append(uvData);
        $("#today .card-body").append(uvIndex.append(btn));

      }); //end of .then for writing uv data
      //write display data to update page
      cardBody.append(title, temp, humidity, wind);
      card.append(cardBody);
      $("#today").append(card);
    }); //end of .then for writing weather data
  } //end of weatherFunction

  //function to get 5 day weather forecast
  function weatherForecast(lat, lon){
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&units=imperial&appid=" + APIKEY,
    }).then(function(data){
      $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
      for(var i = 1; i < 6; i++){
        var utcSeconds = data.daily[i].dt;
        var d = new Date(0); //0 is the key, that sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        var timestamp = d.toLocaleString();
        var date = timestamp.substring(0,10);
        var temp = data.daily[i].temp.day;
        var wind = data.daily[i].wind_speed;  
        var humidity = data.daily[i].humidity;

        var titleForecast = $("<h3>").addClass("card-title").text(date);
        
        var cardForecast = $("<div>").addClass("card")
        var colForecast = $("<div>").addClass("card bg-primary");
        var cardBodyForecast = $("<div>").addClass("card-body p-2");
        var tempForecast = $("<div>").addClass("card-text").text("Temperature: " + temp);
        var windForecast = $("<div>").addClass("card-text").text("Wind: " + wind);
        var humidityForecast = $("<div>").addClass("card-text").text("Humidity: " + humidity);

        colForecast.append(cardForecast.append(cardBodyForecast.append(titleForecast, tempForecast, windForecast, humidityForecast)));
        $("#forecast .row").append(colForecast);
      }  
  });
  }//end of weatherForecast
}); //end of doc.ready function

