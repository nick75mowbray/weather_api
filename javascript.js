$(document).ready(function(){
    console.log("js file working");
function runAPI(city){
    var APIkey = "96a70732cd84bd1cb493d4a47475c856";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIkey+"&units=metric";
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
            $('#city-name').text(city);
            $('#today-icon').empty();
            $('#today-icon').append("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
            $('#today-temp').text(Math.floor(parseInt(response.main.temp)));
            $('#today-weather').text(response.weather[0].description);
            $('#humidity').text(response.main.humidity+"%");
            $('#windspeed').text(Math.floor(parseInt(response.wind.speed))+" m/s");
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
    //   get 5 day forcast
    var forcastURL = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+APIkey+"&units=metric";
    $.ajax({
        url: forcastURL,
        method: "GET",
        success: function(response){
            $('#forcast-container').empty();
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
        });
    };//end runAPI function

    // show / hide search container
      function toggleSearch(){
          $('#search-content').toggleClass("closed");
          console.log("toggle search");
      }
      $('#arrow').on("click", toggleSearch);
      $('#city-name').on("click", toggleSearch);
      $('#close-div').on("click", toggleSearch);


// LOCAL STORAGE
var cities = [];
var currentCity;

var citystorage = localStorage.getItem("citystorage");
var currentCitykey = localStorage.getItem("currentCitykey");
init();
initCity()

function renderButtons(){
    $('#btn-container').empty();
    for (var i=0; i < cities.length; i++){
        var buttonDiv = $("<div class='btn-container'></div>");
        var deletebtn = $("<button class='delete'></button>").text("X");
        var cityBTN = $("<button class='city-btn'></button>").text(cities[i]);
        buttonDiv.append(cityBTN, deletebtn);
        $('#btn-container').append(buttonDiv);
        console.log("buttons rendering");
    }
};

function init() {
    // check if local storage has been used else get data from local storage
    if(citystorage===null){
        console.log("nothing in storage");
    } else {
        cities = JSON.parse(localStorage.getItem("citystorage"));
    }
    // Render buttons
    renderButtons();
};

function initCity() {
    // check if local storage has been used else get data from local storage
    if(currentCitykey===null){
        console.log("nothing in storage");
        currentCity = "Adelaide";
    } else {
        currentCity = JSON.parse(localStorage.getItem("currentCitykey"));
    }
    runAPI(currentCity);

};
function storeCities() {
    // store timeblock objects in local storage
    localStorage.setItem("citystorage", JSON.stringify(cities));
};
function storeCurrrentCity() {
    // store timeblock objects in local storage
    localStorage.setItem("currentCitykey", JSON.stringify(currentCity));
};

// search button
$('#search-form').on("submit", function(event){
    event.preventDefault();
    cities.push($('#city-search').val());
    storeCities();
    currentCity = $('#city-search').val();
    storeCurrrentCity();
    renderButtons();
    toggleSearch();
    runAPI($('#city-search').val());
    
});

// buttons
$('.city-btn').on("click", function(){
    var thisCity = $( this ).text();
    console.log(thisCity);
    toggleSearch();
    runAPI(thisCity);
    currentCity = thisCity;
    storeCurrrentCity();
});

// delete button
$('.delete').on("click", function(){
    var thisCity = $( this ).parent();
    var index;
    for (var i = 0; i < cities.length; i++){
        if ((thisCity.children('.city-btn').text())==cities[i]){
            index = i;
        }
    }
    // remove city from array at positon index
    cities.splice(index, 1);
    storeCities();
    renderButtons();
});


});//end document ready