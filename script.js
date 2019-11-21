$(document).ready(function () {

    getWeather("austin");
    load();
    function load(){
        for (i = 1; i < localStorage.length + 1; i++){
            newCity(localStorage.getItem("city" + i));
            console.log(i)
        }
    }
    $("#search").on("click", function () {
        var city = $("#cityInput").val();
        var count = 0;
        getWeather(city);
        newCity(city);
        localStorage.setItem("city" + (localStorage.length + 1), city);
    })
    $(document).on("click", "#cityBtn", function(){
        getWeather($(this).text());
        console.log("yup");
    });

    function newCity(city){
        var newCity = $("<button>").text(city);
        newCity.addClass("row h2 btn btn-outline-secondary btn-lg btn-block");
        newCity.attr("id", "cityBtn");
        $("#cities").append(newCity);

    }

    function getWeather(city) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&APPID=72a4e95acd20695f9d45b7d4270004be"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#city").text(response.name);
            $("#temp").text("Temperature: " + ((response.main.temp - 273.15) * 9 / 5 + 32).toFixed(2));
            $("#humid").text("Humidity: " + response.main.humidity + "%");
            $("#wind").text("Wind Speed: " + (response.wind.speed / 1.609).toFixed(2) + "MPH");
            // console.log(response);
        })
        queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&APPID=72a4e95acd20695f9d45b7d4270004be"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < response.list.length; i++) {
                console.log(response.list[i].weather[0].description);
                $("#cardDate" + i).text((response.list[i].dt_txt).substring(0, 10));
                $("#cardIcon" + i).text(response.list[i].weather[0].description);
                $("#cardTemp" + i).text("Temp: " + ((response.list[i].main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + " F");
                $("#cardHumid" + i).text("Humidity:" + response.list[i].main.humidity + "%");
                if (i == 0) {
                    i = (i + 8) - 2;
                }
                else {
                    i = (i + 8) - 1
                }
            }
            // console.log(response);
        })

    }

});