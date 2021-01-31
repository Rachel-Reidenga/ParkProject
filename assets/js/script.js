var APIKey="GbSqqMYxDn7M1nf2UQOTRhNleBM2l0zy6iiHUpcS";
var nationalPark=[""];
var APIKey2="eba38d5202ab062097c0e84b133dc98e";
var cityArray=[""];
//var city="";
function parks(parks){
    $(".parks").empty()
    //developer.nps.gov/api/v1
    //curl -X GET "https://developer.nps.gov/api/v1/parks?q=Smoky%20Mountains" -H "accept: application/json"
    var url="https://developer.nps.gov/api/v1/parks?stateCode="+parks+"&api_key="+APIKey;
    //curl -X GET "https://developer.nps.gov/api/v1/parks?stateCode=FL" -H "accept: application/json"
    console.log(url)
    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function(response) 
    {
        for(var i=0 ;i<response.data.length;i++){
            // console.log(response.data[i].fullName)
            // console.log(response.data[i].description)
            // console.log(response.data[i].url)
            // console.log(response.data[i].images[0].url)
            //.parkarea is where the dynamic data gets appended to
        }
        
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
            //.parkarea is where the dynamic data gets appended to
        }
        
        //dynamically create button and make sure you store the city into the btn
        //when user clicks , grab the city... call that ajax below
        $(".pickCity").click(function(){
           var city=$(this).attr("data-city");
           var weatherURL= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey2;
           $.ajax({
               url: weatherURL,
               method: "GET"
           })
           .then(function(weatherobj){
               var iconurl = "https://openweathermap.org/img/w/" + weatherobj.weather[0].icon + ".png";
               console.log(weatherobj.main.temp)
               console.log(iconurl);
   
           });
          });
       
      

        
    });
}

parks("FL")
campground("")