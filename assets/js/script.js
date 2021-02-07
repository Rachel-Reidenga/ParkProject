$( document ).ready(function() {


var APIKey = "GbSqqMYxDn7M1nf2UQOTRhNleBM2l0zy6iiHUpcS";
var nationalPark = [""];
var APIKey2 = "eba38d5202ab062097c0e84b133dc98e";
var cityArray = [""];
var parkarea = document.querySelector(".parkarea");

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    parks($("#stateSearch").val())
})

// this function will take in a city name and return the weather info for the city/park
async function weatherGetter(cityName) {
    var trueCityName;
    // City name cannot be more than 2 words.
    if (cityName.split(' ').length >= 3) {
        //make the city only 2 words long
        var temporaryString = '';
        temporaryString += cityName.split(' ')[0] + " " + cityName.split(' ')[1];
        trueCityName = temporaryString;
    } else {
        //cityname is less than 3 and is good to go <3
        trueCityName = cityName;
    }
    // if we made it this far the true city name is handled yay
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + trueCityName + "&appid=" + APIKey2;
    //console.log(weatherURL);

    return await $.ajax({
        url: weatherURL,
        method: "GET"
    })
        .then(function (weatherobj) {
            console.log(weatherobj.main.temp);
            var iconurl = "https://openweathermap.org/img/w/" + weatherobj.weather[0].icon + ".png";
            var convertedTemp = ((weatherobj.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
            /*
            {
                icon: "url to the icon.png",
                temperature: -1.73   -- we use F
            }
            */
            return {
                icon: "https://openweathermap.org/img/w/" + weatherobj.weather[0].icon + ".png",
                temperature: convertedTemp
            };
        });

}
//var city="";
function parks(parks) {
    $(".parkarea").empty()
    //developer.nps.gov/api/v1
    //curl -X GET "https://developer.nps.gov/api/v1/parks?q=Smoky%20Mountains" -H "accept: application/json"
    var url = "https://developer.nps.gov/api/v1/parks?stateCode=" + parks + "&api_key=" + APIKey;
    //curl -X GET "https://developer.nps.gov/api/v1/parks?stateCode=FL" -H "accept: application/json"
    console.log(url)
    $.ajax({
        url: url,
        method: "GET"
    })
        .then(async function (response) {
            console.log(response.data);
            var fullHtml = ''
            for (var i = 0; i < 4 && i < response.data.length; i++) {
                var city = response.data[i].addresses[0].city
                var weatherData = await weatherGetter(city);
                console.log(weatherData);

                var html = `
            <div class="row">
                <div class="col s12 m7 card-bg">
                    <div class="card-image">
                        <img src=${response.data[i].images[0].url} class="park-image">
                        <span class="card-title">
                            <h2>${response.data[i].fullName}</h2>
                        </span>
                        <div class="weather-card">
                            <span>Temperature: ${weatherData.temperature} *F</span>
                            <img class="weather-icon" src=${weatherData.icon} alt="Weather Icon">
                           
                        </div>
                    </div>
                    <div class="card-content">
                        <p>
                            ${response.data[i].description}
                        </p>
                    </div>
                    <div class="card-action">
                    <div class="footer-card">
                        
                    
                       
                        <a  class="card-link" href=${response.data[i].url}>Learn More!</a>
                    </div>
                    </div>
                </div>
            </div>`;
                console.log(html)
                fullHtml += html;
            }

            $(".parkarea").html(fullHtml);

        });
}


});