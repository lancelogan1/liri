//require("dotenv").config();
let key = require("./keys.js");

var command = process.argv[2];
var query = process.argv[3];



//omdb request
let getMovie = function(movieQuery){
    let request = require("request");
    //empty request or no movie returned 
    if (movieQuery === undefined){
        movieQuery = "Mr. Nobody"
    }


    request ("http://www.omdbapi.com/?t=" + movieQuery + "&plot=short&apikey=3170fffa", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            //body
            console.log("--Title:" + JSON.parse(body).Title);
            //year
            console.log("--Year:" + JSON.parse(body).Year);
            //imdb rating
            console.log("--IMDB Rating:" + JSON.parse(body).imdbRating);
            //rotten tomatoes rating
            console.log("--Rotten Tomatoes Rating:" + JSON.parse(body).rottenTomatoeRating);
            //country of origin
            console.log("--Country of Origin:" + JSON.parse(body).Country);
            //language of movie
            console.log("--Language:" + JSON.parse(body).Language);
            //plot
            console.log("--Plot:" + JSON.parse(body).Plot);
            //actors in movie 
            console.log("--Actors:" + JSON.parse(body).Actors);
        }
    });    
}


// let getSpotify = function(){

// }



//command input to tell what function to run
switch (command){
    case "movie-this": 
        getMovie(query);
    case "spotify-this-song":
        //getSpotify(query);
    case "concert-this":
        //getConcert(query);
    
 // case "do-what-it-says":
        

}