onload = LoadNewMovies()

function LoadNewMovies() {
    console.log("You're in the IndexScript.js Script");

    // Create Source for GET JSON Request
    var source = "https://api.themoviedb.org/3/movie/now_playing?region=US&api_key=" + movieAPIKey;

    console.log("Source: " + source);

    // Get 'Now Playing' Movies
    // Get JSON object from AJAX call
    $.ajax({
        url: source,
        method: "GET",
        success: getNowPlayingMovies,
        error: errorOnAjax
    });
}


// Display 'Now Playing'  Movie Results
function getNowPlayingMovies(data) {
    console.log("Total Results: " + data.total_results);

    // URL to Movie's Poster
    var posterURL = 'https://image.tmdb.org/t/p/w400';

    //Display First 5 Results
    for (i = 0; i < 5; i++) {
        var result = data.results[i];

        // Clean 
        var carSlider = "";
        // Movie's Poster Image
        var posterImg = posterURL + result.poster_path;
        // Movie's Title
        var movieTitle = result.original_title;

        // Set First Carousel Active
        if (i == 0) {
            carSlider = carSlider.concat('<div class="carousel-item active">');
        } else {
            carSlider = carSlider.concat('<div class="carousel-item">');
        }

        // Create Movie Poster
        carSlider = carSlider.concat(
            '<img class="img-fluid" src="' + posterImg + '" alt=' + movieTitle + '>' +                
            '</div>');

        // Add Movie Poster to Carousel Slider
        $("#carouselSlider").append(carSlider);
    }
    

}


// Ajax Error 
function errorOnAjax(e) {
    console.log("Error on Ajax: " + e.error);
    return false;
}