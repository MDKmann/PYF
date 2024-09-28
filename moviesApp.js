// document.getElementById("search").onchange = function() {onSearchChange(event)};

let movieObject = {};
let movieObjectString = JSON.stringify(movieObject);

function showMovieDetails() {
  localStorage.setItem("fetchedMovies", movieObjectString);
  window.location.href = `${window.location.origin}/moviesDetails.html`;
  console.log(movieObjectString)
}





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
        let imdbID = responsesData.imdbID
        movieObject[imdbID] = responsesData;
        return responsesData;
      }),  
    )
   

    const moviesContainer = document.querySelector(".movies");
    moviesContainer.innerHTML = responses.map(response => {
      const movie = response.value;
      const imdbID = movie.imdbID;
        let hours = Math.floor(movie.Runtime / 60);
        let mins = movie.Runtime - (hours * 60);
        let watchTime = hours + "h " + mins +"m";
        return `
                <div class="h-auto bg-gray-200 rounded-lg movie">
                    <a
                    class="block p-4 rounded-lg shadow-sm shadow-indigo-100">
                        <img
                          alt="Movie Poster"
                          src="${movie.Poster}"
                          class="object-cover w-full h-56 rounded-md"
                          onclick="showMovieDetails()"
                        ></img>
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
                      
                                <p class="font-medium">${watchTime}</p>
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

