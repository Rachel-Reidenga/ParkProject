var APIKey="GbSqqMYxDn7M1nf2UQOTRhNleBM2l0zy6iiHUpcS";
var nationalPark=[""];

function parks(parks){
    $(".parks").empty()
    var url="https://developer.nps.gov/api/v1/parks?parkCode"+parks+"acad&api_key="+APIKey;
    console.log(url)
}