// document.getElementById("search").onchange = function() {onSearchChange(event)};

let movieObject = {};
let searchInput = "";


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

// function dynamicLandingPage(){
//   document.getElementById("hero").style.display = "none"
//   document.getElementById("searchContainer").style.display = "md:mt-36"
// }

function showMovieDetails(imdbID) {
  let fetchedMovie = movieObject[imdbID];
  localStorage.setItem("fetchedMovie", JSON.stringify(fetchedMovie));
  localStorage.setItem("searchInput", searchInput);
  window.location.href = `${window.location.origin}PYF/movieDetails`;
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
        console.log(responsesData)
        return responsesData;
        
      }),  
    )
   
    document.getElementById("hero").style.display = "none"
    document.getElementById("searchContainer").classList.add("mt-24")
    document.getElementById("searchContainer").classList.add("sm:mt-36")
    document.getElementById("searchContainer").classList.add("lg:mt-40")
    document.getElementById("searchContainer").classList.add("xl:mt-40")

    const moviesContainer = document.querySelector(".movies");
      moviesContainer.innerHTML = responses.map(response => {
      const movie = response.value;
      const imdbID = movie.imdbID;
      if(movie.Poster !== "N/A") {
        return `
                <div class="object-contain relative h-auto text-[0.75rem] leading-[0.75rem] rounded-lg bg-white/30 ring-2 ring-white/5 backdrop-blur-xs movie">
                  <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-full shadow-lg top-9 left-6"
                             >
                             <span class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2 h-fit mt-1 font-bold text-black/85 bg-gray-300/60 ring-2 ring-white/5 backdrop-blur-lg flex">
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
                          class="  mx-auto rounded-lg w-[90%] shadow-[0px_4px_8px_1px] shadow-black"
                          onclick="showMovieDetails('${imdbID}')"
                        />
                        <div class="m-4">
                          <dl>
                            <div class="flex items-center justify-between">
                              <dt class="sr-only">Movie Title</dt>
                              <dd class="text-sm font-medium text-left">${movie.Title}</dd>
                              <dt class="sr-only">Year</dt>
                              <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg ml-1 py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                              ${movie.Year}
                              </dd>
                            </div>
                          </dl>
                      
                          <div class="flex items-center justify-between gap-4 mt-4 text-xs">
                            <dt class="sr-only">Genre</dt>
                              <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                              ${movie.Genre}
                              </dd>
                              <dt class="sr-only">Runtime</dt>
                              <dd class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                              ${fixTime(movie.Runtime)}
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
  

  

