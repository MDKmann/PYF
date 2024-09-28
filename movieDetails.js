console.log(localStorage.getItem("fetchedMovies"));

async function onClickChange (event) {
  console.log(window.location)
  debugger
  const movieDetails = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=fd7c8c4e`);
      const movieDetailsData = await movieDetails.json();
    const movieCardContainer = document.querySelector(".movie__card");
    movieCardContainer.innerHTML = movieDetailsData.map(movie__card => `
                  <div class="relative overflow-hidden text-white transition duration-500 ease-in-out transform movie-item movie__card" data-movie-id="438631">
            <div class="absolute inset-0 z-10 transition duration-300 ease-in-out transform translate-y-10 bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
            <div class="shadow-[inset_0px_40px_30px_10px_rgba(15,15,15,0.9)] relative z-10 px-4 pt-16 space-y-6 cursor-pointer group movie_info" data-lity="">
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
                                ${movie__card.Rating}
                              </span>
                            </a>
                            <div class="relative flex items-center flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full w-min group hover:bg-red-700" data-unsp-sanitized="clean">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z" clip-rule="evenodd"></path>
                                </svg>
                                <a class="absolute ml-4 text-xl font-bold text-white transition duration-500 ease-in-out transform opacity-0 group-hover::no-underline group-hover:opacity-100 group-hover:text-2xl group-hover:translate-x-16 group-hover:pr-2 group-active:absolute group-active:translate-x-16 group-active:pr-2"
                                 href="https://www.youtube.com/results?search_query=Guardians+of+the+galaxy+trailer"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 >
                                 Trailer
                                </a>
                              </div> 
                            <div class="flex items-top">
                              <h3 class="text-2xl font-bold text-white text-shadow-lg shadow-white" data-unsp-sanitized="clean">Guardians of the Galaxy Vol. 2</h3>
                              <span class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2 h-fit mt-1 bg-white/30 ring-2 ring-white/5 backdrop-blur-xs flex">
                                <i class="pr-1 text-yellow-400 fas fa-star"></i></i>
                                8
                              </span>
                            </div>
                            <div class="mb-0 text-lg text-white/85">
                              <span class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                                Action
                              </span>
                              <span class="text-[0.75rem] m-2 leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                                Adventure
                              </span>
                              <span class="text-[0.75rem] leading-[0.75rem] rounded-lg  py-1 px-2  bg-white/30 ring-2 ring-white/5 backdrop-blur-xs">
                                Comedy
                              </span>
                            </div>
                        </div>
                        <div class="flex flex-row justify-between datos">
                            <div class="flex flex-col datos_col">
                                <div class="text-sm text-gray-400">Release date:</div>
                                <div class="release">01 Aug 2014</div>
                            </div>
                            <div class="flex flex-col datos_col">
                              <div class="text-sm text-gray-400">Runtime:</div>
                              <div class="release">121 min</div>
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

    `)
    .join("")
 console.log(movieDetailsData)
}

