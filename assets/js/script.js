var APIKey="GbSqqMYxDn7M1nf2UQOTRhNleBM2l0zy6iiHUpcS";
var nationalPark=[""];
var APIKey2="eba38d5202ab062097c0e84b133dc98e";
var cityArray=["";]

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
            console.log(response.data[i].fullName)
            console.log(response.data[i].description)
            console.log(response.data[i].url)
            console.log(response.data[i].images[0].url)
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
            console.log(response.data[i].name)
            console.log(response.data[i].reservationUrl)
            console.log(response.data[i].fees)
            //.parkarea is where the dynamic data gets appended to
        }
        
    });
}

function weather(parkweather){
    var url=""
    console.log(url)
    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function(response)
    {
        for(var i=0 ;i<response.data.lenght;i++){
            console.log(response.)
            console.log(0)
            console.log()
        }
    });

}
parks("FL")
campground("")
weather()