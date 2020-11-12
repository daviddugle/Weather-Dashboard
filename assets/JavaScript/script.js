//going to go ahead and use moment to get the date




//let's start with getting the input box information and appending buttons/make sure we are using local storage/
var citySrch = [];






//this is going to send the button with the name of the city to the correct area

function renderButtons(){
    $("#prev-search").empty();
    


    for (var i=0;i<citySrch.length;i++){
        var a=$("<button>");
        a.addClass("city");
        a.attr("data-name", citySrch[i]);
        a.text(citySrch[i]);
        $("#prev-search").append(a);

    }

};
//this is going to set up a function for the button
$("#srch-but").on("click", function(event){
    event.preventDefault();
    var srchCity =$("#city-search").val().trim();
    citySrch.push(srchCity);
    renderButtons();
    

})
renderButtons();






//this section for today's weather











//this section is for the 