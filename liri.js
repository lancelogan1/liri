require("dotenv").config();
let keys = require("./keys.js");
// omdb npm package
let request = require("request");
// spotify npm package
let Spotify = require("node-spotify-api");
// grabbing spotify keys 
let spotify = new Spotify(keys.spotify);
// fs npm package
let fs = require("fs");

//commands 
var app = process.argv[2];
var query = process.argv[3];

// omdb - movie data
let getMovie = function (movieQuery) {

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

// spotify - song data 
let getSpotify = function (musicQuery) {

    // empty request or no movie returned
    if (musicQuery === undefined) {
        musicQuery = "The-Sign-Ace-of-Base";

    } else {
        spotify.search({ type: 'track', query: musicQuery }, function (error, data) {
            if (error) {
                console.log("Error: " + error)
                return;
            } else {
                // style line 
                console.log("\n\n\n**************************************************************\n");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song: " + data.tracks.items[0].name + "\n");
                console.log("Preview: " + data.tracks.items[0].album.name);
                console.log("Album: " + data.tracks.items[0].preview_url);
                // style line
                console.log("\n**************************************************************\n\n\n");
            }
        })
    }
};

// bands in town - concert data
let getConcert = function (showQuery) {

    // empty request or no show returned 
    if (showQuery === undefined) {
        showQuery = "Willie-Nelson";
    }
    request("https://rest.bandsintown.com/artists/" + showQuery + "/events?app_id=07bb82e56c591d688fda49b5440928a6&name=", function (error, response, body) {
        let result = JSON.parse(body);

        for (i = 0; i < result.length; i++) {
            if (!error && response.statusCode === 200) {


                // style line 
                console.log("\n\n\n**************************************************************\n");
                // body
                console.log("--Artist/Bands: " + result[i].lineup[0] + "\n");
                console.log("--Venue: " + result[i].venue.name + "\n--City: " + result[i].venue.city + ", " + result[i].venue.region + result[i].venue.country);
                console.log("\n" + result[i].datetime);
                console.log("\n**************************************************************\n\n\n");
            }
        }
    });
}

// let doWhatItSays = function () {
//     if (musicQuery === "i-want-it-that-way") {

//         fs.readFile("random.txt", "utf8", function(error, data) {
//             if(error){
//                  console.log(error);
//              }else{
//                 var dataArr = data.split(',');
//         userCommand = dataArr[0];
//         secondCommand = dataArr[1];
//         //if multi-word search term, add.
//         for(i=2; i<dataArr.length; i++){
//             secondCommand = secondCommand + "+" + dataArr[i];
//         };
//               }
// }
//     }
// }

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
    case "do-what-it-says":
        doWhatItSays(query);
        break;
}