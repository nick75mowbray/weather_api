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
            // add elements to page
            $('#today-icon').append("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
            $('#today-temp').text(Math.floor(parseInt(response.main.temp)));
            $('#today-weather').text(response.weather[0].main);
            $('#humidity').text(response.main.humidity+"%");
            $('#windspeed').text(response.wind.speed+" m/s");
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+long+"&appid="+APIkey;
      $.ajax({
        url: uvURL,
        method: "GET",
        success: function(response){
            $('#uv-rating').text(response.value);
            if (response.value < 4){
                $('#uv-text').text("low");
                $('#uv-container').css('background-color', 'blue');
            } else if (response.value > 3 && response.value < 10){
                $('#uv-text').text("moderate");
                $('#uv-container').css('background-color', 'green');
            } else {
                $('#uv-text').text("high");
                $('#uv-container').css('background-color', 'red');
            }
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
      $('#city-name').on("click", toggleSearch);
      $('#close-div').on("click", toggleSearch);
      
//   5 day forcast
var forcastURL = "http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+APIkey+"&units=metric";
$.ajax({
    url: forcastURL,
    method: "GET",
    success: function(response){
        for (var i = 0; i < 5; i++){
            var card = $("<div class='card'></div>");
            var day = $("<h4 class='day'></h4>").text(moment().add((i+1), 'days').format('ddd'));
            // var tempContainer = "<div class='temp-container></div";
            var temp = $("<h2 class='forcast-temp'></h2>").text(Math.floor(parseInt(response.list[i].main.temp))).append("&#176;");
            var forcastIcon = response.list[i].weather[0].icon;
            var forcastIMG = $("<img src='http://openweathermap.org/img/wn/"+forcastIcon+".png'>");
            card.append(day, temp, forcastIMG);
            $('#forcast-container').append(card);
    }
},
    error: function(){
        console.log("oops something went wrong");
    }
})

// display correct days for forcast
$('#day-1').text((moment().add(1, 'days').format('ddd')));
$('#day-2').text((moment().add(2, 'days').format('ddd')));
$('#day-3').text((moment().add(3, 'days').format('ddd')));
$('#day-4').text((moment().add(4, 'days').format('ddd')));
$('#day-5').text((moment().add(5, 'days').format('ddd')));
});//end document ready