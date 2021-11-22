var APIKEY = '87875bf0663cfa807f2fc62d46ca41e1';

//calls search button
$(document).ready(function () {
  $("#search-button").on("click", function () {
    //sets search item to var
      var searchTerm = $("#search-value").val();
      $("#search-value").val("");
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
  });

});

