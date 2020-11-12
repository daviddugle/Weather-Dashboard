//going to go ahead and use moment to get the date




//let's start with getting the input box information and appending buttons/make sure we are using local storage/
var citySrch = [];






//this is going to send the button with the name of the city to the correct area

function renderButtons(){
    $("#prev-search").empty();
    
    var storedCities=JSON.parse(localStorage.getItem("citySrch"));

    for (var i=0;i<storedCities.length;i++){
        var a=$("<button>");
        a.addClass("city");
        a.attr("data-name", storedCities[i]);
        a.text(storedCities[i]);
        $("#prev-search").append(a);

    }

};
//this is going to set up a function for the button
$("#srch-but").on("click", function(event){
    event.preventDefault();
    var srchCity =$("#city-search").val().trim();
    citySrch.push(srchCity);
    localStorage.setItem("citySrch", JSON.stringify(citySrch));
    renderButtons();
    

})
renderButtons();






//this section for today's weather











//this section is for the 