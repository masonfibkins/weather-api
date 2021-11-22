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
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + ",US&appid=" + APIKEY,
    }).then(function(data){
      
      //clears search box for new input
      $("#today").empty();
      var tempData = data.main.temp;
      var windData = data.wind.speed;
      var humidityData = data.main.humidity;
      var lon = data.coord.lon;
      var lat = data.coord.lat;

      var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
      
      var card = $("<div>").addClass("card");
      var cardBody = $("<div").addClass("card-body");
      var temp = $("<p>").addClass("Temperature: " + tempData + " °F");
      var wind = $("<p>").addclass("Wind: " + windData + " MPH");
      var humidity = $("<p>").addClass("Humidity: " + humidityData + " %");
      console.log(data);
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
      console.log(data);
    }); //end of .then for writing weather data
  } //end of weatherFunction

}); //end of doc.ready function

