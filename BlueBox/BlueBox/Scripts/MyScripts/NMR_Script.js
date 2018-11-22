onload = LoadNMReleases();

var today;

function LoadNMReleases() {
    console.log("You're in the NMR_Script.js Script");

    getDate();

    console.log("Today is: " + today);

    // Create Source for GET JSON Request for New Movie Releases
    var source = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieAPIKey +
        "&language=en-US&sort_by=release_date.desc&include_adult=true&" +
        "include_video=true&page=1&region=US&release_date.lte=" + today + "&with_original_language=en";

    console.log("Now Playing JSON Source: " + source);

    // Get 'Now Playing' Movies
    // Get JSON object from AJAX call
    $.ajax({
        url: source,
        method: "GET",
        success: getNewMoviesReleases,
        error: errorOnAjax
    });
}

function getNewMoviesReleases(data) {

    // URL to all Movie's Poster
    var posterURL = 'https://image.tmdb.org/t/p/w200';

    // Display First Page - 20 Results
    for (i = 0; i < 20; i+=4) {

        // Clear data
        var movieReleases = "";

        // Data
        //var result = data.results[i];

        //// Get Poster Image
        //var posterImg = posterURL + result.poster_path;
        //// Get Title
        //var movieTitle = result.original_title;
        //// Get Vote Count
        //var voteCount = result.vote_count;
        //// Get Vote Average
        //var voteAvg = result.vote_average;
        //// Get Overview Details
        //var movieOverview = result.overview;
        //// Get Movie ID
        //var movieID = result.id;

        movieReleases = movieReleases.concat('<div class="row">');

        for (x = 0; x < 4; x++) {
            var y = i + x;

            movieReleases = movieReleases.concat(
                '<div class="col-sm-3">' +
                    '<img class="img-fluid" src="' + posterURL + data.results[y].poster_path + '" alt=' + data.results[y].original_title + '>' + // Poster Image
                '<hr />' +
                '<p class="text-left">' + data.results[y].overview + '</p>' + // Movie Overview Details
                '</div>');

            console.log('in: ' + y);
        }
        console.log('out');

        movieReleases = movieReleases.concat('</div><br />');

        $("#newMovRel_Results").append(movieReleases);

        //movieReleases = movieReleases.concat(
        //    '<div class="row">' +
        //        '<div class="col-sm-3">' +
        //    '<img class="img-fluid" src="' + posterURL + data.results[i].poster_path + '" alt=' + data.results[i].original_title + '>' + // Poster Image
        //        '</div>' +
        //        '<div class="col-sm-3">' +
        //    //'<img class="img-fluid" src="' + posterURL + data.results[i+1].poster_path + '" alt=' + data.results[i+1].original_title  + '>' + // Poster Image
        //        '</div>' +
        //        '<div class="col-sm-3">' +
        //            //'<img class="img-fluid" src="' + posterImg + '" alt=' + movieTitle + '>' + // Poster Image
        //        '</div>' +
        //        '<div class="col-sm-3">' +
        //            //'<img class="img-fluid" src="' + posterImg + '" alt=' + movieTitle + '>' + // Poster Image
        //        '</div>' +
        //    '</div>');

        //$("#newMovRel_Results").append(movieReleases);

        // Set Row opening
        //if (i % 4 === 0) {
        //    console.log("First i = " + i);
        //    movieReleases = movieReleases.concat(
        //        '<div class="row">' +
        //        '<div class="col-sm-3">' +
        //        '<img class="img-fluid" src="' + posterImg + '" alt=' + movieTitle + '>' + // Poster Image
        //        //'<div class="carousel-caption fixed-top" id="movieInfo">' +
        //        //    '<h1>' + movieTitle + '</h1>' + // Movie Title
        //        //    '<hr />' +
        //        //    '<h4 class="text-left">Overview:</h4>' +
        //        //    '<p class="text-left">' + movieOverview + '</p>' + // Movie Overview Details
        //        //    '<p class="text-left">Average Vote: ' + voteAvg + '/10 <small> -- Vote Count: ' + voteCount + '</small></p>' + // Movie Ratings
        //        //    '<button type="button" class="btn btn-primary video-btn" id="trailerButtonID" data-toggle="modal" data-src="' + movieID +
        //        //    '" data-target="#myModal">Watch Trailer</button >' + // Button to Watch Trailer
        //        //'</div>' +
        //        '</div>');

        //    // Display New Movie Release
        //    $("#newMovRel_Results").append(movieReleases);

        //} else if ((i + 1) % 4 === 0) { // Set Row Closing
        //    console.log("Forth i = " + i);
        //    movieReleases = movieReleases.concat(
        //        '<div class="col-sm-3">' +
        //        '<img class="img-fluid" src="' + posterImg + '" alt=' + movieTitle + '>' + // Poster Image
        //        //'<div class="carousel-caption fixed-top" id="movieInfo">' +
        //        //    '<h1>' + movieTitle + '</h1>' + // Movie Title
        //        //    '<hr />' +
        //        //    '<h4 class="text-left">Overview:</h4>' +
        //        //    '<p class="text-left">' + movieOverview + '</p>' + // Movie Overview Details
        //        //    '<p class="text-left">Average Vote: ' + voteAvg + '/10 <small> -- Vote Count: ' + voteCount + '</small></p>' + // Movie Ratings
        //        //    '<button type="button" class="btn btn-primary video-btn" id="trailerButtonID" data-toggle="modal" data-src="' + movieID +
        //        //    '" data-target="#myModal">Watch Trailer</button >' + // Button to Watch Trailer
        //        //'</div>' +
        //        '</div>' +
        //        '</div>');
        //    // Display New Movie Release
        //    $("#newMovRel_Results").append(movieReleases);         
        //} else {

        //    // Create Movie Poster
        //    movieReleases = movieReleases.concat(
        //        '<div class="col-sm-3">' +
        //        '<img class="img-fluid" src="' + posterImg + '" alt=' + movieTitle + '>' + // Poster Image
        //        //'<div class="carousel-caption fixed-top" id="movieInfo">' +
        //        //    '<h1>' + movieTitle + '</h1>' + // Movie Title
        //        //    '<hr />' +
        //        //    '<h4 class="text-left">Overview:</h4>' +
        //        //    '<p class="text-left">' + movieOverview + '</p>' + // Movie Overview Details
        //        //    '<p class="text-left">Average Vote: ' + voteAvg + '/10 <small> -- Vote Count: ' + voteCount + '</small></p>' + // Movie Ratings
        //        //    '<button type="button" class="btn btn-primary video-btn" id="trailerButtonID" data-toggle="modal" data-src="' + movieID +
        //        //    '" data-target="#myModal">Watch Trailer</button >' + // Button to Watch Trailer
        //        //'</div>' +
        //        '</div>');

        //    // Display New Movie Releases
        //    $("#newMovRel_Results").append(movieReleases);
        //}
    }
}

function getDate() {
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
}

// Ajax Error 
function errorOnAjax(e) {
    console.log("Error on Ajax: " + e.error);
    return false;
}