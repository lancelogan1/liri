require("dotenv").config();
let keys = require("./keys.js");
// spotify npm package
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);


var app = process.argv[2];
var query = process.argv[3];


// omdb request
let getMovie = function (movieQuery) {
    // omdb npm package 
    let request = require("request");
    // empty request or no movie returned 
    if (movieQuery === undefined) {
        movieQuery = "Mr. Nobody"
    }


    request("http://www.omdbapi.com/?t=" + movieQuery + "&plot=short&apikey=3170fffa", function (error, response, body) {

        if (!error && response.statusCode === 200) {
            // style line 
            console.log("\n\n\n**************************************************************\n");
            // body
            console.log("--Title: " + JSON.parse(body).Title + "\n");
            // year
            console.log("--Year: " + JSON.parse(body).Year);
            // imdb rating
            console.log("--IMDB Rating: " + JSON.parse(body).imdbRating);
            // rotten tomatoes rating
            console.log("--Rotten Tomatoes Rating: " + JSON.parse(body).rottenTomatoeRating);
            // country of origin
            console.log("--Country of Origin: " + JSON.parse(body).Country);
            // language of movie
            console.log("--Language: " + JSON.parse(body).Language + "\n");
            // plot
            console.log("--Plot: " + JSON.parse(body).Plot + "\n");
            // actors in movie 
            console.log("--Actors: " + JSON.parse(body).Actors);
            // style line
            console.log("\n**************************************************************\n\n\n");
        }
    });
}


let getSpotify = function (musicQuery) {

    // empty request or no movie returned
    if (musicQuery === undefined) {
        musicQuery = "The Sign Ace of Base";

    } else {
        spotify.search({ type: 'track', query: musicQuery }, function (error, data) {
            if (error) {
                console.log("Error: " + error)
                return;
            } else {
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Preview: " + data.tracks.items[0].album.name);
                console.log("Album: " + data.tracks.items[0].preview_url);
            }
        })
    }
};



// command input to tell what function to run
switch (app) {
    case "movie-this":
        getMovie(query);
        break;
    case "spotify-this-song":
        getSpotify(query);
        break;
    case "concert-this":
        getConcert(query);
        break;

    // case "do-what-it-says":


}