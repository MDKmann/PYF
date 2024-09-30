// document.getElementById("search").onchange = function() {onSearchChange(event)};

let movieObject = {};



function showMovieDetails(imdbID) {
  let fetchedMovie = movieObject[imdbID];
  localStorage.setItem("fetchedMovie", JSON.stringify(fetchedMovie));
  window.location.href = `${window.location.origin}/moviesDetails.html`;
}

function fixTime(runtime) {
  let stringToNum = Number(runtime.split(" ")[0])
  let hours = Math.floor(stringToNum / 60);
  let mins = stringToNum - (hours * 60);
  return hours + "h " + mins +"m";
}



async function onSearchChange(event) {
  const searchInput = event.target.value;
  localStorage.setItem("searchInput", searchInput);
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
   

    const moviesContainer = document.querySelector(".movies");
    moviesContainer.innerHTML = responses.map(response => {
      const movie = response.value;
      const imdbID = movie.imdbID;
        return `
                <div class="object-contain relative h-auto text-[0.75rem] leading-[0.75rem] rounded-lg bg-white/30 ring-2 ring-white/5 backdrop-blur-xs movie">
                  <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-full shadow-lg top-9 left-6"
                             >
                             <span class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2 h-fit mt-1 bg-white/30 ring-2 ring-white/5 backdrop-blur-xs flex">
                              <i class="pr-1 text-yellow-400 fas fa-star"></i></i>
                              ${movie.imdbRating}
                            </span>
                            </a>
                            <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-lg  p-1 top-9 right-6 bg-white/30 ring-2 ring-white/5 backdrop-blur-xs"
                              href="./movies.html">
                              <span class="p-1 text-xs text-white/85">
                              ${movie.Rated}
                              </span>
                            </a>
                    <a href="#" class="block py-3 rounded-lg shadow-sm object shadow-indigo-100 ">
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
    `;
    })
    .join("")
};


  

  

//     const moviesContainer = document.querySelector(".movies");
//     moviesContainer.innerHTML = responses.map(response => {
//       const movie = response.value;
//       const imdbID = movie.imdbID;
//         return `
//                 <div class="h-auto bg-gray-200 rounded-lg movie">
//                     <a
//                     class="block p-4 rounded-lg shadow-sm shadow-indigo-100">
//                         <img
//                           alt="Movie Poster"
//                           src="${movie.Poster}"
//                           class="object-cover w-full h-56 rounded-md"
//                           onclick="showMovieDetails('${imdbID}')"
//                         ></img>
//                         <div class="mt-2">
//                           <dl>
//                             <div class="flex justify-between">
//                               <dt class="sr-only">Genre</dt>
//                               <dd class="text-sm text-gray-500">${movie.Genre}</dd>
//                               <dt class="sr-only">Year</dt>
//                               <dd class="text-sm text-gray-500">${movie.Year}</dd>
//                             </div>
                      
//                             <div>
//                               <dt class="sr-only">Title</dt>
//                               <dd class="font-medium">${movie.Title}</dd>
//                             </div>
//                           </dl>
                      
//                           <div class="flex items-center gap-8 mt-6 text-xs">
//                             <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
//                                 <i class="text-indigo-500 far fa-hand-point-down"></i>
//                               <div class="mt-1.5 sm:mt-0">
//                                 <p class="text-gray-500">RATED</p>
                      
//                                 <p class="font-medium">${movie.Rated}</p>
//                               </div>
//                             </div>
                      
//                             <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
//                                 <i class="text-indigo-500 far fa-star "></i>
//                               <div class="mt-1.5 sm:mt-0">
//                                 <p class="text-gray-500">IMDb RATING</p>
                      
//                                 <p class="font-medium">${movie.imdbRating}</p>
//                               </div>
//                             </div>
                      
//                             <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
//                                 <i class="text-indigo-500 far fa-clock"></i>
//                               <div class="mt-1.5 sm:mt-0">
//                                 <p class="text-gray-500">WATCH TIME</p>
                      
//                                 <p class="font-medium">${fixTime(movie.Runtime)}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                       </a>
//                 </div>          
//     `;
//     })
//     .join("")
// };


  

  

