//going to go ahead and use moment to get the date




//let's start with getting the input box information and appending buttons/make sure we are using local storage/
var citySrch = [];






//this is going to send the button with the name of the city to the correct area

function renderButtons() {
    $("#prev-search").empty();

    var storedCities = JSON.parse(localStorage.getItem("citySrch"));
    if (storedCities !== null) {
        citySrch = storedCities
    }
    for (var i = 0; i < storedCities.length; i++) {
        var a = $("<button>");
        a.addClass("city");
        a.attr("data-name", storedCities[i]);
        a.text(storedCities[i]);
        $("#prev-search").append(a);

    }

};
//this is going to set up a function for the button
$("#srch-but").on("click", function (event) {
    event.preventDefault();
    var srchCity = $("#city-search").val().trim();
    citySrch.push(srchCity);
    localStorage.setItem("citySrch", JSON.stringify(citySrch));
    $("#city-search").val("");


    renderButtons();


})
renderButtons();


//this section for today's weather


function getWeather(){
    var getWeath =$(this).attr("data-name");
    var APIKey = "a0bebcdf3f3421ef2b632b830fa93f18";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + getWeath +"&appid=" + APIKey;
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) { 

        console.log(response);
        $("#city-date").text(response.name);
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#curr-temp").text("Current Temp: "+tempF +" F");
        $("#humidity").text("Current Humidity: "+ response.main.humidity +"%");
        $("#wind-speed").text("Current Wind Speed: "+ response.wind.speed);


    });




};







$(document).on("click", ".city", getWeather);

//this section is for the 5 day forcast