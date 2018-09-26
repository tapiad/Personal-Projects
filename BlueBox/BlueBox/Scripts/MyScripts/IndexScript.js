onload = LoadNewMovies()

function LoadNewMovies() {
    console.log("You're in the IndexScript.js Script");

    // Create Source for GET JSON Request
    var source = "https://api.themoviedb.org/3/movie/now_playing?region=US&api_key=" + movieAPIKey;

    console.log("Source: " + source);

}