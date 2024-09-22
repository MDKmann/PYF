// document.getElementById("search").onchange = function() {onSearchChange(event)};

async function onSearchChange (event) {
  const searchInput = event.target.value;
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
        return responsesData;
        

    
      }),
      async function onClickChange (event) {
        const movieDetails = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=fd7c8c4e`);
            const movieDetailsData = await movieDetails.json();
          const movieCardContainer = document.querySelector(".movie__card");
          movieCardContainer.innerHTML = movieDetailsData.map(movie__card => `
                       <div class="relative overflow-hidden text-white transition duration-500 ease-in-out transform movie-item movie__card" data-movie-id="438631">
                  <div class="absolute inset-0 z-10 transition duration-300 ease-in-out transform translate-y-10 bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
                  <div class="shadow-[inset_0px_40px_30px_10px_rgba(15,15,15,0.9)] relative z-10 px-4 pt-16 space-y-6 cursor-pointer group movie_info" data-lity="" href="https://www.youtube.com/embed/aSHs224Dge0">
                      <div class="w-full poster__info align-self-end">
                          <div class="h-32"></div>
                          <div class="space-y-6 detail_info">
                              <div class="flex flex-col space-y-2 inner">
                                  <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-full shadow-lg top-3 left-3  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs"
                                    href="./movies.html">
                                    <i class="text-[0.75rem] leading-[0.75rem] p-1 far fa-circle-xmark text-white/85"></i>
                                  </a>
                                  <a class="absolute text-[0.75rem] leading-[0.75rem] rounded-lg  p-0.5 top-1 right-3 bg-white/30 ring-2 ring-white/5 backdrop-blur-xs"
                                    href="./movies.html">
                                    <span class="p-1 text-xs text-white/85">
                                      PG-13
                                    </span>
                                  </a>
                                  <a class="relative flex items-center flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full w-min group-hover:bg-red-700" data-unsp-sanitized="clean">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 20 20" fill="currentColor">
                                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z" clip-rule="evenodd"></path>
                                      </svg>
                                      <div class="absolute text-xl font-bold text-white transition duration-500 ease-in-out transform opacity-0 group-hover:opacity-100 group-hover:translate-x-16 group-hover:pr-2">Trailer</div>
                                  </a>
                                  <h3 class="text-2xl font-bold text-white text-shadow-lg shadow-white" data-unsp-sanitized="clean">${movie__card.Title}</h3>
                                  <div class="mb-0 text-lg text-gray-400">PG-13</div>
                              </div>
                              <div class="flex flex-row justify-between datos">
                                  <div class="flex flex-col datos_col">
                                      <div class="release">01 Aug 2014</div>
                                      <div class="text-sm text-gray-400">Release date:</div>
                                  </div>
                                  <div class="flex flex-col datos_col">
                                      <div class="release">121 min</div>
                                      <div class="text-sm text-gray-400">Runtime:</div>
                                  </div>
                              </div>
                              <div class="flex flex-col overview">
                                  <div class="flex flex-col"></div>
                                  <div class="mb-2 text-xs text-gray-400">Plot:</div>
                                  <p class="mb-6 text-xs text-gray-100">
                                    A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <img class="absolute inset-0 w-full" src="https://m.media-amazon.com/images/M/MV5BNDIzMTk4NDYtMjg5OS00ZGI0LWJhZDYtMzdmZGY1YWU5ZGNkXkEyXkFqcGdeQXVyMTI5NzUyMTIz._V1_SX300.jpg" style="filter: grayscale(0);" />
                  <div class="relative z-10 flex flex-row pb-10 space-x-4 poster__footer">
                      <a
                          class="flex items-center px-4 py-2 mx-auto text-white bg-red-500 rounded-full hover:bg-red-700"
                          href="http://www.google.com/calendar/event?action=TEMPLATE&amp;dates=20210915T010000Z%2F20210915T010000Z&amp;text=Dune%20%2D%20Movie%20Premiere&amp;location=http%3A%2F%2Fmoviedates.info&amp;details=This%20reminder%20was%20created%20through%20http%3A%2F%2Fmoviedates.info"
                          target="_blank"
                          data-unsp-sanitized="clean"
                      >
                          <div class="text-sm text-white">Watch</div>
                      </a>
                  </div>
                </div>
            </div>
          </div>
          `)
          .join("")
       console.log(movieDetailsData)
      }
      
    
    )

    
    const moviesContainer = document.querySelector(".movies");
    moviesContainer.innerHTML = responses.map(response => {
      const movie = response.value;
      return `
                <div class="h-auto bg-gray-200 rounded-lg movie">
                    <a href="./moviesDetails.html" 
                    class="block p-4 rounded-lg shadow-sm shadow-indigo-100">
                        <img
                          alt="Movie Poster"
                          src="${movie.Poster}"
                          class="object-cover w-full h-56 rounded-md"
                          onclick="onClickChange(event)"
                      
                        <div class="mt-2">
                          <dl>
                            <div class="flex justify-between">
                              <dt class="sr-only">Genre</dt>
                              <dd class="text-sm text-gray-500">${movie.Genre}</dd>
                              <dt class="sr-only">Year</dt>
                              <dd class="text-sm text-gray-500">${movie.Year}</dd>
                            </div>
                      
                            <div>
                              <dt class="sr-only">Title</dt>
                              <dd class="font-medium">${movie.Title}</dd>
                            </div>
                          </dl>
                      
                          <div class="flex items-center gap-8 mt-6 text-xs">
                            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <i class="text-indigo-500 far fa-hand-point-down"></i>
                              <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">RATED</p>
                      
                                <p class="font-medium">${movie.Rated}</p>
                              </div>
                            </div>
                      
                            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <i class="text-indigo-500 far fa-star "></i>
                              <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">IMDb RATING</p>
                      
                                <p class="font-medium">${movie.imdbRating}</p>
                              </div>
                            </div>
                      
                            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <i class="text-indigo-500 far fa-clock"></i>
                              <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">WATCH TIME</p>
                      
                                <p class="font-medium">${movie.Runtime}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                </div>          
    `;
})
    .join("")
};










// async function renderMovies() {
//     const movies = await fetch(`https://www.omdbapi.com/?s=${searchResults}&apikey=fd7c8c4e`);
//     const moviesData = await movies.json();
//     const moviesContainer = document.querySelector(".movies");
//     moviesContainer.innerHTML = moviesData.Search.map((movies) => `
//                 <div class="h-auto bg-gray-200 rounded-lg movie">
//                     <a href="#" class="block p-4 rounded-lg shadow-sm shadow-indigo-100">
//                         <img
//                           alt="Movie Poster"
//                           src="${movies.Poster}"
//                           class="object-cover w-full h-56 rounded-md"
//                         />
                      
//                         <div class="mt-2">
//                           <dl>
//                             <div class="flex justify-between">
//                               <dt class="sr-only">Genre</dt>
//                               <dd class="text-sm text-gray-500">${movies.Genre}</dd>
//                               <dt class="sr-only">Year</dt>
//                               <dd class="text-sm text-gray-500">${movies.Year}</dd>
//                             </div>
                      
//                             <div>
//                               <dt class="sr-only">Title</dt>
//                               <dd class="font-medium">${movies.Title}</dd>
//                             </div>
//                           </dl>
                      
//                           <div class="flex items-center gap-8 mt-6 text-xs">
//                             <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
//                                 <i class="text-indigo-500 far fa-hand-point-down"></i>
//                               <div class="mt-1.5 sm:mt-0">
//                                 <p class="text-gray-500">RATED</p>
                      
//                                 <p class="font-medium">${movies.Rated}</p>
//                               </div>
//                             </div>
                      
//                             <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
//                                 <i class="text-indigo-500 far fa-star "></i>
//                               <div class="mt-1.5 sm:mt-0">
//                                 <p class="text-gray-500">IMDb RATING</p>
                      
//                                 <p class="font-medium">${movies.imdbRating}</p>
//                               </div>
//                             </div>
                      
//                             <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
//                                 <i class="text-indigo-500 far fa-clock"></i>
//                               <div class="mt-1.5 sm:mt-0">
//                                 <p class="text-gray-500">WATCH TIME</p>
                      
//                                 <p class="font-medium">${movies.Runtime}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </a>
//                 </div>          
//     `)
//     .join("")
//     console.log(moviesData.Search)

// }

// renderMovies();