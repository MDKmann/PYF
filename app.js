const searchTitle = document.querySelector("#search");

function onSearchChange(event) {
  const searchValue = event.target.value;
  renderMovies(event);
}

async function renderMovies(Title) {
    const moviesContainer = document.querySelector(".movies");
    const movies = await fetch(`https://www.omdbapi.com/?t=avengers&apikey=fd7c8c4e`);
    const moviesData = movies.json();
    console.log(moviesData);
}


console.log(renderMovies());

const moviesHtml = moviesData.map(movies => {
    return `
                <div class="h-auto bg-gray-200 rounded-lg movie">
                    <a href="#" class="block p-4 rounded-lg shadow-sm shadow-indigo-100">
                        <img
                          alt="Movie Poster"
                          src="${movies.Poster}<"
                          class="object-cover w-full h-56 rounded-md"
                        />
                      
                        <div class="mt-2">
                          <dl>
                            <div class="flex justify-between">
                              <dt class="sr-only">Genre</dt>
                              <dd class="text-sm text-gray-500">${movies.Genre}<</dd>
                              <dt class="sr-only">Year</dt>
                              <dd class="text-sm text-gray-500">${movies.Year}<</dd>
                            </div>
                      
                            <div>
                              <dt class="sr-only">Title</dt>
                      
                              <dd class="font-medium">${movies.title}</dd>
                            </div>
                          </dl>
                      
                          <div class="flex items-center gap-8 mt-6 text-xs">
                            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <i class="text-indigo-500 far fa-hand-point-down"></i>
                              <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">RATED</p>
                      
                                <p class="font-medium">${movies.Rated}<</p>
                              </div>
                            </div>
                      
                            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <i class="text-indigo-500 far fa-star "></i>
                              <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">IMDb RATING</p>
                      
                                <p class="font-medium">${movies.imdbRating}</p>
                              </div>
                            </div>
                      
                            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <i class="text-indigo-500 far fa-clock"></i>
                              <div class="mt-1.5 sm:mt-0">
                                <p class="text-gray-500">WATCH TIME</p>
                      
                                <p class="font-medium">${movies.Runtime}<</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                </div>          
    `
}
)
