let movieString = localStorage.getItem("fetchedMovie");
    movieObject = JSON.parse(movieString);

function fixTime(runtime) {
    let stringToNum = Number(runtime.split(" ")[0])
    let hours = Math.floor(stringToNum / 60);
    let mins = stringToNum - (hours * 60);
    return hours + "h " + mins +"m";
  }

function splitGenres(genres) {
    let splitString = genres.split(" ");
    return splitString.length;
}

function youtubeSearch(movieTitle) {
    movieTitle = movieObject.Title;
    let ytTitle = movieTitle.split(" ").join("+");
    return `https://www.youtube.com/results?search_query=${ytTitle}+trailer`;
}
 youtubeSearch();

 function watchMovieSearch(movieTitle) {
    movieTitle = movieObject.Title;
    let watchTitle = movieTitle.split(" ").join("+");
    return `https://www.google.com/search?q=watch+${watchTitle}`;
}
watchMovieSearch();


function updateMovieDetails() {
     document.getElementById("rating").textContent = movieObject.Rated;
     document.getElementById("title").textContent = movieObject.Title;
     document.getElementById("imdb").textContent = movieObject.imdbRating;
     document.getElementById("genre").textContent = splitGenres(movieObject.Genre);
     document.getElementById("genre").textContent = movieObject.Genre;
     document.getElementById("genre").textContent = movieObject.Genre;
     document.getElementById("date").textContent = movieObject.Year;
     document.getElementById("runtime").textContent = fixTime(movieObject.Runtime);
     document.getElementById("plot").textContent = movieObject.Plot;
     document.getElementById("posterMain").src = movieObject.Poster;
     document.getElementById("watch").href = watchMovieSearch(movieObject.Title);
     //  document.getElementById("trailer").href = youtubeSearch(movieObject.Title);
}



document.addEventListener("DOMContentLoaded", updateMovieDetails);

async function backToSearch(event) {
    const searchInput = localStorage.getItem("searchInput");
    window.location.href = `${window.location.origin}/PYF/`;
    
};