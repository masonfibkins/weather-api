var APIKEY = '87875bf0663cfa807f2fc62d46ca41e1';

//calls search button
$(document).ready(function () {
  //search button feature
  $("#search-button").on("click", function () {
      var searchTerm = $("#search-value").val();//grab value in input search-value.
      $("#search-value").val("");//empty input field.
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
  });

  var history = JSON.parse(localStorage.getItem("history")) || [];//grab item from local storage, if any.

  if (history.length > 0) {//sets history array search to correct length.
      weatherFunction(history[history.length - 1]);
  }
  for (var i = 0; i < history.length; i++) {// makes a row for each element in history array(searchTerms).
      createRow(history[i]);
  }

  function createRow(text) {
      var listItem = $("<li>").addClass("list-group-item").text(text);
      $(".history").append(listItem);
  }
  //listener for list item on click functionality.
  $(".history").on("click", "li", function () {
      weatherFunction($(this).text());
      weatherForecast($(this).text());
  });

  function weatherFunction(searchTerm) {

      $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=9bbe868aa95e2e05ff8a18fa3fab1fc7&units=imperial",


      }).then(function (data) {
          if (history.indexOf(searchTerm) === -1) {//if index of search value does not exist.
              history.push(searchTerm);//push searchValue to history array.
              localStorage.setItem("history", JSON.stringify(history));//places item pushed into local storage with
              createRow(searchTerm);
          }
          $("#today").empty();// clears out old content
          var cityName = data.name;
          var windData = data.wind.speed;
          var humidityData = data.main.humidity;
          var tempData = data.main.temp;
          var lon = data.coord.lon;
          var lat = data.coord.lat;

          var title = $("<h3>").addClass("card-title").text(cityName);
          var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
          var card = $("<div>").addClass("card");
          var cardBody = $("<div>").addClass("card-body");
          var wind = $("<p>").addClass("card-text").text("Wind Speed: " + windData + " MPH");
          var humid = $("<p>").addClass("card-text").text("Humidity: " + humidityData + "%");
          var temp = $("<p>").addClass("card-text").text("Temperature: " + tempData + " °F");


          $.ajax({
              type: "GET",
              url: "https://api.openweathermap.org/data/2.5/uvi?appid=9bbe868aa95e2e05ff8a18fa3fab1fc7&lat=" + lat + "&lon=" + lon,


          }).then(function (response) {
              console.log(response);

              // var uvColor;
              var uvResponse = response.value;
              var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
              var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);


              if (uvResponse < 3) {
                  btn.addClass("btn-success");
              } else if (uvResponse < 7) {
                  btn.addClass("btn-warning");
              } else {
                  btn.addClass("btn-danger");
              }

              cardBody.append(uvIndex);
              $("#today .card-body").append(uvIndex.append(btn));

          });

          // merge and add to page
          title.append(img);
          cardBody.append(title, temp, humid, wind);
          card.append(cardBody);
          $("#today").append(card);
          console.log(data);
      });
  }
  // function weatherForecast(searchTerm) 1) drop s

  //function to get 5 day weather forecast
  function weatherForecast(searchTerm){
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=" + APIKEY,
    }).then(function(data){
      var lon = data.coord.lon;
      var lat = data.coord.lat;
    

    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&units=imperial&appid=" + APIKEY,
    }).then(function(data2){
      $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
      for(var i = 1; i < 6; i++){
        var utcSeconds = data2.daily[i].dt;
        var d = new Date(0); //0 is the key, that sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        var timestamp = d.toLocaleString();
        var date = timestamp.substring(0,10);
        var temp = data2.daily[i].temp.day;
        var wind = data2.daily[i].wind_speed;  
        var humidity = data2.daily[i].humidity;

        var titleForecast = $("<h3>").addClass("card-title").text(date);
        
        var colForecast = $("<div>").addClass("col-md-2");
        var cardForecast = $("<div>").addClass("card bg-primary text-white")
        var cardBodyForecast = $("<div>").addClass("card-body p-2");
        var tempForecast = $("<div>").addClass("card-text").text("Temperature: " + temp);
        var windForecast = $("<div>").addClass("card-text").text("Wind: " + wind);
        var humidityForecast = $("<div>").addClass("card-text").text("Humidity: " + humidity);

        colForecast.append(cardForecast.append(cardBodyForecast.append(titleForecast, tempForecast, windForecast, humidityForecast)));
        $("#forecast .row").append(colForecast);
      }
    });  
  });
}//end of weatherForecast

}); //end of doc.ready function

