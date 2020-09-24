$(document).ready(function(){
    console.log("js file working");
    var APIkey = "96a70732cd84bd1cb493d4a47475c856";
    var cityName = "Adelaide";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+APIkey+"&units=metric";
    var icon;
    var lat;
    var long;
    $.ajax({
        url: weatherURL,
        method: "GET",
        success: function(response){
            console.log(response);
            icon = response.weather[0].icon;
            console.log(icon);
            lat = response.coord.lat;
            long = response.coord.lon;
            $('#test').append("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+long+"&appid="+APIkey;
      $.ajax({
        url: uvURL,
        method: "GET",
        success: function(response){
            console.log(response);
        },
        error: function(){
            console.log("oops something went wrong");
        }
      });
        },
        error: function(){
            console.log("oops something went wrong");
        }
      });
      
      function toggleSearch(){
          $('#search-content').toggleClass("closed");
          console.log("toggle search");
      }
      $('#arrow').on("click", toggleSearch);
      $('#close').on("click", toggleSearch);
      
// get stuff:
// humidity response.main.humidity
// temperature response.main.temp
// weather type response.weather.main
// wind speed response.wind.speed (in m/s)

});//end document ready