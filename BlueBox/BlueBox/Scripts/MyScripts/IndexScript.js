onload = LoadNewMovies();

function LoadNewMovies() {
    console.log("You're in the IndexScript.js Script");

    // Create Source for GET JSON Request for Now Playing Movies
    var source = "https://api.themoviedb.org/3/movie/now_playing?region=US&api_key=" + movieAPIKey;

    console.log("Now Playing JSON Source: " + source);

    // Get 'Now Playing' Movies
    // Get JSON object from AJAX call
    $.ajax({
        url: source,
        method: "GET",
        success: getNowPlayingMovies,
        error: errorOnAjax
    });
}



// Displays 'Now Playing' Movies onto Slider
function getNowPlayingMovies(data) {

    // URL to all Movie's Poster
    var posterURL = 'https://image.tmdb.org/t/p/w400';


    //Display First 5 Results
    for (i = 0; i < 5; i++) {
        var result = data.results[i];

        // Clear variable
        var carSlider = "";
        // Get Poster Image
        var posterImg = posterURL + result.poster_path;
        // Get Title
        var movieTitle = result.original_title;
        // Get Vote Count
        var voteCount = result.vote_count;
        // Get Vote Average
        var voteAvg = result.vote_average;
        // Get Overview Details
        var movieOverview = result.overview;
        // Get Movie ID
        var movieID = result.id;


        // Set First Carousel Active
        if (i === 0) {
            carSlider = carSlider.concat('<div class="carousel-item active">');
        } else {
            carSlider = carSlider.concat('<div class="carousel-item">');
        }


        // Create Movie Poster
        carSlider = carSlider.concat(
            '<img class="img-fluid" src="' + posterImg + '" alt=' + movieTitle + '>' + // Poster Image
                '<div class="carousel-caption fixed-top" id="movieInfo">' +
                '<h1>' + movieTitle + '</h1>' + // Movie Title
                '<hr />' +
                '<h4 class="text-left">Overview:</h4>' +
                '<p class="text-left">' + movieOverview + '</p>' + // Movie Overview Details
                '<p class="text-left">Average Vote: ' + voteAvg + '/10 <small> -- Vote Count: ' + voteCount + '</small></p>' + // Movie Ratings
                '<button type="button" class="btn btn-primary video-btn" id="trailerButtonID" data-toggle="modal" data-src="' + movieID +
                '" data-target="#myModal">Watch Trailer</button >' + // Button to Watch Trailer
                '</div>' +
            '</div>');

        // Add Movie Poster to Carousel Slider
        $("#carouselSlider").append(carSlider);
    }
}


// If Trailer Button Clicked...
$(document).on("click", "#trailerButtonID", playTrailer);


// Play Movie Trailer
function playTrailer() {

    // Get Video ID
    var videoID = $(this).data("src");
    console.log("Video ID: " + videoID);


    // Create Source for GET JSON Request for Movie Trailer Video
    var source = "https://api.themoviedb.org/3/movie/" + videoID + "/videos?api_key=" + movieAPIKey + "&language=en-US";

    console.log("Trailer Video JSON Source: " + source);

    // Get Movie Trailer Videos
    // Get JSON object from AJAX call
    $.ajax({
        url: source,
        method: "GET",
        success: displayTrailerVideo,
        error: errorOnAjax
    });
}


// Get Trailer Video & Autoplay on Modal
var videoSrc;
function displayTrailerVideo(data) {
    // Get Video Key
    var videoKey = data.results[0].key;
    console.log("Trailer Video Key: " + videoKey);

    // Video Soucre to Trailer Video
    videoSrc = "https://www.youtube.com/embed/" + videoKey;
    console.log("Trailer Video Source: " + videoSrc);

    // Autoplay Trailer onto Modal
    $("#video").attr('src', videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
}


//Creadit: https://codepen.io/JacobLett/pen/xqpEYE
$(document).ready(function () {

    // Stop Playing Video when Modal Closes
    $('#myModal').on('hide.bs.modal', function (e) {
        // Set to Video Source without Autoplay
        $("#video").attr('src', videoSrc);
    });
 
});



// Ajax Error 
function errorOnAjax(e) {
    console.log("Error on Ajax: " + e.error);
    return false;
}