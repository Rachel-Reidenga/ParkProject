var APIKey="GbSqqMYxDn7M1nf2UQOTRhNleBM2l0zy6iiHUpcS";
var nationalPark=[""];
var APIKey2="eba38d5202ab062097c0e84b133dc98e";
var cityArray=[""];
var parkarea = document.querySelector(".parkarea");

$("#searchBtn").on("click", function(){
    parks($("#stateSearch").val())
})

//var city="";
function parks(parks){
    $(".parkarea").empty()
    

    //developer.nps.gov/api/v1
    //curl -X GET "https://developer.nps.gov/api/v1/parks?q=Smoky%20Mountains" -H "accept: application/json"
    var url="https://developer.nps.gov/api/v1/parks?stateCode="+parks+"&api_key="+APIKey;
    //curl -X GET "https://developer.nps.gov/api/v1/parks?stateCode=FL" -H "accept: application/json"
    // console.log(url)
    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function(response) 
    {
        // console.log(response.data);
        // console.log(response.data[0].addresses[0].city)
        // $(".pickCity").click(function(){
            var city=response.data[0].addresses[0].city
        //grab the city
            var string1=city
            string1= string1.split(" ")
            //console.log(string1)
            var temp="";
            //only grab the first 2 words for the city search to work
            for(var i=0;i<2;i++){
                temp+=" "+string1[i]
            }
            // console.log(temp)
            // console.log(weatherURL);
            var weatherURL= "https://api.openweathermap.org/data/2.5/weather?q="+temp+"&appid="+APIKey2;
            // console.log(weatherURL);
            $.ajax({
                url: weatherURL,
                method: "GET"
            })
            .then(function(weatherobj){
                var iconurl = "https://openweathermap.org/img/w/" + weatherobj.weather[0].icon + ".png";
                // console.log(weatherobj.main.temp)
                // console.log(iconurl);
    
            });
        //    });

        for(var i=0 ;i<response.data.length;i++){

            // .parkarea is where the dynamic data gets appended to

          var div1=$("<div>");
          div1.attr("class","row")
          var div2=$("<div>");
          div2.attr("class", "col s12 m7")
          var div3=$("<div>");
          div3.attr("class", "card")
          var div4=$("<div>");
          div4.attr("class", "card-image")
          var img=$("<img>");
          img.attr("src", response.data[i].images[0].url)
          var span=$("<span>");
          span.attr("class", "card-title")
          span.text(response.data[i].fullName)
          var div5=$("<div>");
          div5.attr("class", "card-content")
          var p=$("<p>");
          p.text(response.data[i].description)
          var div6=$("<div>");
          div6.attr("class", "card-action")
          var a=$("<a>");
          a.attr("href", response.data[i].url)
          a.text("Learn more!")

          div4.append(img)
          div4.append(span)
          div5.append(p)
          div6.append(a)

          div3.append(div4)
          div3.append(div5)
          div3.append(div6)

          div2.append(div3)
          div1.append(div2)

          $(".parkarea").append(div1)



        }

        // fire off weahter!!
        findWeather( response.data[0].latitude, response.data[0].longitude);
        
    });
}

function campground(campground){
    //curl -X GET "https://developer.nps.gov/api/v1/campgrounds?parkCode=&stateCode=FL" -H "accept: application/json"
    var url="https://developer.nps.gov/api/v1/campgrounds?stateCode="+campground+"&api_key="+APIKey;
    console.log(url)
    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function(response) 
    {
       
        for(var i=0 ;i<response.data.length;i++){
            //<button class="pickCity" data-city="Reno">CampGround1</button>
            var campbtn= $("<button>")
            //<button></button>
            campbtn.attr("class", "pickCity");

            campbtn.attr("data-city", "Reno");
            campbtn.text(response.data[i].name);
            //.campground
            $(".campground").append(campbtn);
            

            // console.log(response.data[i].name)
            // console.log(response.data[i].reservationUrl)
            // console.log(response.data[i].fees)
            // .parkarea is where the dynamic data gets appended to
        }
        
        //dynamically create button and make sure you store the city into the btn
        //when user clicks , grab the city... call that ajax below
       
       
      

        
    });
}


function findWeather(lat, lon){
    $(".weather").empty()
    var city=$(this).attr("data-city");
    var weatherURL= "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +"&appid="+APIKey2;
    //console.log(weatherURL)
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
    .then(function(weatherobj){
         var iconurl = "https://openweathermap.org/img/w/" + weatherobj.list[0].weather[0].icon + ".png";
        // console.log("API DATA!", weatherobj.list[0].weather[0])
        // console.log(iconurl)

        
        // console.log(iconurl);

        var div1= $("<div>");
        div1.attr("class", "row");
        var div2=$("<div>");
        div2.attr("class", "col s12 m6")
        var div3=$("<div>");
        div3.attr("class", "card blue-grey darken-1")
        var div4=$("<div>");
        div4.attr("class", "card-content white-text")
        var span=$("<span>");
        span.text("Weather: ");
        span.attr("class", "card-title")
        var img=$("<img>");
        img.attr("class", "icon");
        img.attr("src", iconurl)
        var p=$("<p>");
        var convert=((weatherobj.list[0].main.temp - 273.15) * 9/5 + 32);
        p.text("Temperature: "+ convert.toFixed(2)+"F")

        span.append(img)
        div4.append(span)
        div4.append(p)

        div3.append(div4)
        div2.append(div3)
        div1.append(div2)

        $(".weather").append(div1)






            // var stateWeather = document.createElement("p");
            // stateWeather.textContent = weatherobj.list[0].weather[0];

            //.weather

    });
};

parks()
// campground("")

