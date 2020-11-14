//going to go ahead and use moment to get the date
var currentDay = (moment().format("M,D,YYYY"));
var nextDay = moment().add(1, "days");









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
    // var getWeath =srchCity;
    getWeather();
    renderButtons();
    $("#uv-index").removeClass();


})
renderButtons();







//this should refresh the page with the last item in the list.
getWeather();

var latCheck="";
var lonCheck="";

//this section for today's weather


function getWeather() {
    var getWeath = $(this).attr("data-name");
    localStorage.getItem("citySrch");


    if (getWeath === undefined) {
        getWeath = citySrch[citySrch.length - 1];
        

    }




    var APIKey = "a0bebcdf3f3421ef2b632b830fa93f18";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + getWeath + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        var iconIns = (response.weather[0].icon);
        var icon = "http://openweathermap.org/img/wn/" + iconIns + "@2x.png";
        $("#weath-icon").attr("src", icon);
        $("#city-date").text(response.name + " (" + currentDay + ") ");
        var tempF = (Math.floor(response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
        $("#curr-temp").text("Current Temp: " + tempF + " F");
        $("#humidity").text("Current Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Current Wind Speed: " + response.wind.speed);
        latCheck =(response.coord.lat);
        lonCheck = (response.coord.lon);
        $("#uv-index").text("");
        
        indexUV();
        
        //got the uv index in this area right here.pretty proud of my if statements    
        function indexUV(){

               
            
            var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?lat="+  latCheck +"&lon="+ lonCheck +"&appid=" + APIKey;

            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (response) {
                
                var uvDiv =$("<div>");
                uvDiv.text("UV Index: " + response.value);
                if (response.value > 6){
                    uvDiv.addClass("high");
                }
                else if (response.value < 3 ){
                    uvDiv.addClass("low");
                }
                else{
                    uvDiv.addClass("med")
                }






                $("#uv-index").append(uvDiv);

               

        })}









        fiveDay();

        function fiveDay() {


            var APIKey2 = "a0bebcdf3f3421ef2b632b830fa93f18";
            var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + getWeath + "&appid=" + APIKey2;


            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {


                //day one

                $("#day1-date").text(response.list[10].dt_txt);
                var iconIns1 = (response.list[10].weather[0].icon);
                var icon1 = "http://openweathermap.org/img/wn/" + iconIns1 + "@2x.png";                
                $("#day1-icon").attr("src", icon1);
                var tempF1 = (Math.floor(response.list[10].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#day1-temp").text("Temp: " + tempF1 + "F");
                $("#day1-humidity").text("Humidity:" + response.list[10].main.humidity + "%");

                //day two                
                $("#day2-date").text(response.list[18].dt_txt);
                
                var iconIns2 = (response.list[18].weather[0].icon);
                var icon2 = "http://openweathermap.org/img/wn/" + iconIns2 + "@2x.png";
                console.log(icon2);
                $("#day2-icon").attr("src", icon2);
                var tempF2 = (Math.floor(response.list[18].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#day2-temp").text("Temp: " + tempF2 + "F");
                $("#day2-humidity").text("Humidity:" + response.list[18].main.humidity + "%");

                //day three                
                $("#day3-date").text(response.list[26].dt_txt);                
                var iconIns3 = (response.list[26].weather[0].icon);
                var icon3 = "http://openweathermap.org/img/wn/" + iconIns3 + "@2x.png";
                $("#day3-icon").attr("src", icon3);
                var tempF3 = (Math.floor(response.list[26].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#day3-temp").text("Temp: " + tempF3 + "F");
                $("#day3-humidity").text("Humidity:" + response.list[26].main.humidity + "%");


                //day four                
                $("#day4-date").text(response.list[34].dt_txt);                
                var iconIns4 = (response.list[34].weather[0].icon);
                var icon4 = "http://openweathermap.org/img/wn/" + iconIns4 + "@2x.png";
                $("#day4-icon").attr("src", icon4);
                var tempF4 = (Math.floor(response.list[34].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#day4-temp").text("Temp: " + tempF4 + "F");
                $("#day4-humidity").text("Humidity:" + response.list[34].main.humidity + "%");

                //day five               
                $("#day5-date").text(response.list[39].dt_txt);                
                var iconIns5 = (response.list[39].weather[0].icon);
                var icon5 = "http://openweathermap.org/img/wn/" + iconIns5 + "@2x.png";
                $("#day5-icon").attr("src", icon5);
                var tempF5 = (Math.floor(response.list[39].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#day5-temp").text("Temp: " + tempF5 + "F");
                $("#day5-humidity").text("Humidity:" + response.list[39].main.humidity + "%");








            });


        };




    });







};






$(document).on("click", ".city", getWeather);

//this section is for the 5 day forcast