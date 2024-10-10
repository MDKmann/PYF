// document.getElementById("search").onchange = function() {onSearchChange(event)};

let movieObject = {};
let sortArray = [];
let searchInput = "";
let dynamicSearchBox = "flex flex-col items-center w-full px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded-lg shadow-lg opacity-75 sm:w-3/4 md:w-2/3 sm:mx-auto sm:mb-6 md:mb-8 mt-12 sm:mt-24 lg:mt-36 xl:mt-40";
const magicArray = [
    "Avengers",
    "Harry Potter",
    "Batman",
    "Spider Man",
    "Inside Out",
    "The Lord of the Rings",
    "The Lion King",
    "Top Gun",
    "Jumanji",
    "The Adam Project",
    "27 Dresses",
    "Meet the Fockers",
    "Honey I Shrunk the Kids",
    "How to Train Your Dragon",
    "The Family Man",
    "The Cinderella Story",
    "Never Been Kissed",
    "The Princess Diaries",
    "The Polar Express",
    "21 Jumpstreet",
    "21",
    "Molly's Game",
    "The Age of Adaline"
]


function magicSearch() {
  let magicIndex = Math.floor(Math.random() * 22);
  let magicValue = magicArray[magicIndex];
  let previousSearch = magicValue
  return onSearchChange(null, previousSearch);
}



function rerunSearch() {
  document.getElementById("loading-overlay").style.display = "fixed";
  let previousSearch = localStorage.getItem("searchInput");
  let fromDetailsPage = document.referrer.includes("movieDetails")
  if (previousSearch && fromDetailsPage) {
    onSearchChange(null, previousSearch)
    localStorage.removeItem("searchInput")
    setTimeout(function removeLoadingOverlay(){
      document.getElementById("loading-overlay").style.display = "none";
    }, 2000);
  }
  setTimeout(function removeLoadingOverlay(){
    document.getElementById("loading-overlay").style.display = "none";
  }, 2000);
}

function showMovieDetails(imdbID) {
  let fetchedMovie = movieObject[imdbID];
  localStorage.setItem("fetchedMovie", JSON.stringify(fetchedMovie));
  localStorage.setItem("searchInput", searchInput);
  window.location.href = `${window.location.origin}/PYF/movieDetails`;
}

function fixTime(runtime) {
  let stringToNum = Number(runtime.split(" ")[0])
  let hours = Math.floor(stringToNum / 60);
  let mins = stringToNum - (hours * 60);
  return hours + "h " + mins +"m";
}

// Gets an array of movies from movieObject hash and sorts them by movies choosen attribute
// calls fillMoviesContainer function and passes the sorted array of movies
function sortMovies(event) {
  let sortEvent = event.target.value;
  let movies = Object.values(movieObject);

  if(sortEvent === "YEAR_HIGH_TO_LOW") {
   movies.sort((a, b) => Date.parse(b.Released) - Date.parse(a.Released));
  }
  else if(sortEvent === "YEAR_LOW_TO_HIGH") {
    movies.sort((a, b) => Date.parse(a.Released) - Date.parse(b.Released));
  }
  else if(sortEvent === "RATING_HIGH_TO_LOW") {
    movies.sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));
  }
  else if(sortEvent === "RATING_LOW_TO_HIGH") {
    movies.sort((a, b) => Number(a.imdbRating) - Number(b.imdbRating));
  }
  fillMoviesContainer(movies);



}
function fillMoviesContainer(movies) {
 const moviesContainer = document.querySelector(".movies");
 moviesContainer.innerHTML = movies.map(movie => {
   const imdbID = movie.imdbID;
   if (movie.Poster !== "N/A") {
     return `
           <div class="object-contain relative h-auto min-h-[500px] text-[0.75rem] leading-[0.75rem] rounded-lg bg-white/30 ring-2 ring-white/5 backdrop-blur-xs movie">
             <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-full shadow-lg top-9 left-6">
               <span class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2 h-fit font-bold text-black/85 bg-gray-300/60 ring-2 ring-white/5 backdrop-blur-lg flex">
                 <i class="pr-1 text-yellow-400 fas fa-star"></i></i>
                 ${movie.imdbRating}
               </span>
             </a>
             <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-lg font-bold p-1 top-9 right-6 bg-gray-300/60 ring-3 ring-white/5 backdrop-blur-lg"
               <span class="p-1 text-xs  text-black/85">
                 ${movie.Rated}
               </span>
             </a>
             <a class="block py-3 rounded-lg shadow-sm object shadow-indigo-100 h-full">
               <img
                 alt="Movie Poster"
                 src="${movie.Poster}"
                 class="  mx-auto rounded-lg w-[90%] h-2/3 md:h-3/4 lg:h-2/3 shadow-[0px_4px_8px_1px] shadow-black"
                 onclick="showMovieDetails('${imdbID}')"
               />
               <div class="m-4 w-auto">
                 <dl class="h-1/3 sm:h-1/2 w-auto items-center justify-between flex">
                   <div class="flex flex-row items-center justify-between">
                     <div>
                      <dt class="sr-only">Movie Title</dt>
                      <dd class="text-sm font-medium text-left self-start">${movie.Title}</dd>
                     </div> 
                     <div>
                      <dt class="sr-only">Year</dt>
                      <dd class="text-[0.75rem] leading-[0.75rem] self-end  rounded-lg ml-1 py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                      ${movie.Year}
                      </dd>
                     </div>
                   </div>
                 </dl>
                 <dl class="h-1/3 sm:h-1/2 items-center flex w-auto">
                   <div class="flex items-center justify-between gap-4 mt-4 text-xs">
                     <dt class="sr-only">Genre</dt>
                       <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg self-start py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                       ${movie.Genre}
                       </dd>
                     <dt class="sr-only">Runtime</dt>
                       <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg self-end py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                       ${fixTime(movie.Runtime)}
                       </dd>
                   </div>
                 </dl>
               </div>
             </a>
           </div>
          `
   };
 }).join("")
}

async function onSearchChange(event, previousSearch = null) {
    searchInput = previousSearch || event.target.value;
    const movies = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=fd7c8c4e`);
    const moviesData = await movies.json();
    const movieIds = moviesData.Search.map(movie => movie.imdbID);
    await Promise.allSettled(
      movieIds.map(async id => {
        const getResponses = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=fd7c8c4e`
        ); // Send request for each id
        const responsesData = await getResponses.json();
        let imdbID = responsesData.imdbID
        movieObject[imdbID] = responsesData;
      })
    )
    fillMoviesContainer(Object.values(movieObject));
   
    document.getElementById("hero").style.display = "none"
    document.getElementById("searchContainer").className = dynamicSearchBox;

    setTimeout(function removeLoadingOverlay(){
      document.getElementById("loading-overlay").style.display = "none";
    }, 1500);
};

document.addEventListener("DOMContentLoaded", rerunSearch);
  

  

