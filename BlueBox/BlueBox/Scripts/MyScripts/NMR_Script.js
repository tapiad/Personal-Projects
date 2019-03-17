onload = LoadNMReleases();

//$('#searchBtn').click(LoadNMReleases());

// Variable to hold date value
var today;
var page;

function LoadNMReleases() {
    console.log("You're in the NMR_Script.js Script");

    isAdult = $('input[name="adultContent"]:checked').val();

    category = $('#sortBy :selected').val();
    cending = $('input[name="cending"]:checked').val();
    sortBy = category + cending;

    console.log("Adult Value:" + isAdult);
    console.log("Sort By:" + sortBy);

    // Scroll to Top of Page
    scrollUp();    

    // Get Today's Date
    getDate();

    // Get Current Page
    page = getPage();

    // If Page is undefined
    if (page === undefined) {
        page = 1;
    }
    // Display Page Number
    $("#currentPage").text("Page " + page + "/10");

    console.log("Today is: " + today);
    console.log("page: " + page);

    // Create Source for GET JSON Request for New Movie Releases
    var source = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieAPIKey +
        "&language=en-US&sort_by=" + sortBy + "&include_adult=" + isAdult +
        "&include_video=false&page=" + page + "&region=US&release_date.lte=" + today + "&with_original_language=en";

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
    var posterURL = 'https://image.tmdb.org/t/p/w300';

    $("#newMovRel_Results").text("");

    // Display First Page - 20 Results
    for (i = 0; i < 20; i+=2) {

        // Clear data
        var movieReleases = "";

        // Start a div row
        movieReleases = movieReleases.concat('<div class="row">');

        for (x = 0; x < 2; x++) {

            // Set y to display first and second movie to each row
            var y = i + x;

            // Filter out NULL posters
            //for (z = 0; data.results[y].poster_path == ! null; z++) {
            //    y = 
            //}        
            //console.log("Poster: " + data.results[y].poster_path);

            // get movie poster, title, and overview 
            movieReleases = movieReleases.concat(
                '<div class="col-sm-6 text-center">' +
                    '<span style="font-size: 2.5em; font-style: italic; text-transform: uppercase;">' +
                        '<img class="img-fluid" src="' + posterURL + data.results[y].poster_path + '" alt=' + data.results[y].original_title + '>' + // Poster Image
                    '</span>' +
                    '<hr />' +
                    '<p>' + data.results[y].overview + '</p>' + // Movie Overview Details
                '</div>');

        }

        // Close div row with a break 
        movieReleases = movieReleases.concat('</div><br />');

        // Add reults to display
        $("#newMovRel_Results").append(movieReleases);

        // Disable Previous Button if Page == 1
        if (page === 1) {
            $("#prevBtn").attr('disabled', 'disabled');
            $("#prevBtnB").attr('disabled', 'disabled');
        } else {
            $("#prevBtn").removeAttr('disabled');
            $("#prevBtnB").removeAttr('disabled');
        }
        // Disable Next Page Button if Page > 9
        if (page > 9) {
            $("#nextBtn").attr('disabled', 'disabled');
            $("#nextBtnB").attr('disabled', 'disabled');
        } else {
            $("#nextBtn").removeAttr('disabled');
            $("#nextBtnB").removeAttr('disabled');
        }       
    }
}

// CREDIT: https://stackoverflow.com/questions/4210798/how-to-scroll-to-top-of-page-with-javascript-jquery
// Scroll Page to Top
function scrollUp() {
    
    if ($('body').scrollTop() > 0) {
        $('body').scrollTop(0);         //Chrome,Safari
    } else {
        if ($('html').scrollTop() > 0) {    //IE, FF
            $('html').scrollTop(0);
        }
    }
}

// Next Page
function nextPage() {
    page += 1;
    
    LoadNMReleases();
}

// Previous Page
function prevPage() {
    page -= 1;
    
    LoadNMReleases();
}

// Get Current Page
function getPage() {
    return page;
}

// CREDIT: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
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