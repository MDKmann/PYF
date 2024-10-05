// document.getElementById("search").onchange = function() {onSearchChange(event)};

let movieObject = {};
let searchInput = "";
let heroSwap = `<section id="movies__container" class="mt-20 sm:mt-40">
                <div class="relative m-4 text-[0.75rem] leading-[0.75rem] sm:w-2/3 lg:w-1/2 mx-auto rounded-2xl  py-1 px-2">
                  <label for="Search" class="sr-only"> Search </label>
              
                  <input
                
                  type="text"
                  id="search"
                  placeholder="What would you like to watch . . ?"
                  class="w-full rounded-md bg-white/30 ring-2 ring-white/5 backdrop-blur-x py-2.5 pe-10 text-center sm:text-sm"
                  onchange="onSearchChange(event)"
                   />
              
                <span class="absolute inset-y-0 grid w-10 end-0 place-content-center">
                  <button type="button" class="text-gray-600 hover:text-gray-700">
                    <span class="sr-only">Search</span>
              
                    <span class="p-1 rounded-full outline">
                      <i aria-hidden="true" class="fas fa-wand-sparkles"></i>
                    </span>
                  </button>
                </span>
              </div>
                  <div class="grid grid-cols-1 gap-4 m-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 movies">
                  </div>
                </section>`;


function rerunSearch() {
  document.getElementById("loading-overlay").style.display = "fixed";
  let previousSearch = localStorage.getItem("searchInput");
  let fromDetailsPage = document.referrer.includes("moviesDetails")
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
  window.location.href = `${window.location.origin}/moviesDetails.html`;
}

function fixTime(runtime) {
  let stringToNum = Number(runtime.split(" ")[0])
  let hours = Math.floor(stringToNum / 60);
  let mins = stringToNum - (hours * 60);
  return hours + "h " + mins +"m";
}



async function onSearchChange(event, previousSearch = null) {
  searchInput = previousSearch || event.target.value;
  const movies = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=fd7c8c4e`);
    const moviesData = await movies.json();
    const movieIds = moviesData.Search.map(movie => movie.imdbID);
    const responses = await Promise.allSettled(
      movieIds.map(async id => {
        const getResponses = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=fd7c8c4e`
        ); // Send request for each id
        const responsesData = await getResponses.json();
        console.log(responsesData)
        let imdbID = responsesData.imdbID
        movieObject[imdbID] = responsesData;
        return responsesData;
      }),  
    )
   
    document.getElementById("hero").innerHTML = heroSwap;

    const moviesContainer = document.querySelector(".movies");
      moviesContainer.innerHTML = responses.map(response => {
      const movie = response.value;
      const imdbID = movie.imdbID;
      if(movie.Poster !== "N/A") {
        return `
                <div class="object-contain relative h-auto text-[0.75rem] leading-[0.75rem] rounded-lg bg-white/30 ring-2 ring-white/5 backdrop-blur-xs movie">
                  <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-full shadow-lg top-9 left-6"
                             >
                             <span class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2 h-fit mt-1 font-bold text-black/85 bg-gray-300/50 ring-2 ring-white/5 backdrop-blur-xs flex">
                              <i class="pr-1 text-yellow-400 fas fa-star"></i></i>
                              ${movie.imdbRating}
                            </span>
                            </a>
                            <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-lg  p-1 top-9 right-6 bg-gray-300/50 ring-3 ring-white/5 backdrop-blur-xs"
                              href="./movies.html">
                              <span class="p-1 text-xs font-bold text-black/85">
                              ${movie.Rated}
                              </span>
                            </a>
                    <a href="#" class="block py-3 rounded-lg shadow-sm object shadow-indigo-100 h-full">
                          <img
                          alt="Movie Poster"
                          src="${movie.Poster}"
                          class="  mx-auto rounded-lg w-[90%] shadow-[0px_4px_8px_1px] shadow-black"
                          onclick="showMovieDetails('${imdbID}')"
                        />
                        <div class="m-4">
                          <dl>
                            <div class="flex items-center justify-between">
                              <dt class="sr-only">Movie Title</dt>
                              <dd class="text-sm font-medium text-center">${movie.Title}</dd>
                              <dt class="sr-only">Year</dt>
                              <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg ml-1 py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                              ${movie.Year}
                              </dd>
                            </div>
                          </dl>
                      
                          <div class="flex items-center justify-center gap-4 mt-4 text-xs">
                            <dt class="sr-only">Genre</dt>
                              <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                              ${movie.Genre}
                              </dd>
                              <dt class="sr-only">Runtime</dt>
                              <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                              ${fixTime(movie.Runtime)}
                              </dd>
                              <dt class="sr-only">Year</dt>
                              <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                              ${movie.Year}
                              </dd>
                          </div>
                        </div>
                      </a>
                </div>
    `};
      })
    .join(""),
    setTimeout(function removeLoadingOverlay(){
      document.getElementById("loading-overlay").style.display = "none";
    }, 1500);
};

document.addEventListener("DOMContentLoaded", rerunSearch);
  

  

