require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");

var request = require("request");

var Spotify = require("node-spotify-api");

var moment = require("moment");

var spotify = new Spotify(keys.spotify);

console.log(spotify);

var userOption = process.argv[2]

var userSearch = process.argv.splice(3).join(" ")

console.log(userOption, userSearch)

if (userOption === "spotify-this-song") {
    spotifySong(userSearch);
}

function spotifySong(userSearch){

    spotify.search({ type: 'track', query: userSearch, limit: '50' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(JSON.stringify(data));

        for ( var i = 0; i < data.tracks.items.length; i++) {


        if(((data.tracks.items[i].name)).toLowerCase().includes((userSearch).toLowerCase())) {
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("\r\n");
        }
        }
        
        // console.log(data.tracks.items[0].album.artists[0].name);

    });
}

if (userOption === "concert-this") {

    var queryUrl = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"
    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            x = JSON.parse(body);
            console.log(x);
            console.log(x.length);
            for (var i = 1; i < x.length; i++) {
                console.log(x[i].venue);
                console.log(moment(x[i].datetime).format('L'));
            };
        }
    })
}

if (userOption === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            x = JSON.parse(body)
            console.log("Movie Title: " + x.Title);
            console.log("Release Year: " + x.Released);
            console.log("IMDB Rating: " + x.imdbRating);
            console.log("Rotten Tomato Rating: " + x.Ratings[1].Value);
            console.log("Produced in Country: " + x.Country);
            console.log("Language: " + x.Language);
            console.log("Plot: " + x.Plot);
            console.log("Actors: " + x.Actors);

        }
    });
}
if (userOption === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        data = data.split(",");
        console.log(data);
        var x = data[0];
        var y = data[1];
        spotifySong(y);
    })
}