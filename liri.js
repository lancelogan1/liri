//omdb rating request

let request = require("request");
request ("http://www.omdbapi.com/?t=rudy&y=&plot=short&apikey=3170fffa", function(error, response, body) {

if (!error && response.statusCode === 200) {
    //console.log(body);
    console.log("The movies rating is: " + JSON.parse(body).imdbRating);
}
});