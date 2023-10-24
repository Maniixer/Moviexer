const apiKey = "2070d45f";
const moviesContainer = document.getElementById("movieContainer");
const movieInput = document.getElementById("movieInput");

document.getElementById("searchBtn").addEventListener("click", function (e) {
  e.preventDefault();
  fetchMovies();
  /* console.log(movieInput.value); */
  movieInput.value = "";
});
/* Fetch movies from the API  using the input value of the search input */
async function fetchMovies() {
  const url = "https://www.omdbapi.com/";
  const resp = await fetch(`${url}?s="${movieInput.value}"&apikey=${apiKey}`);
  const data = await resp.json();
  renderMovies(data);
}

async function renderMovies(movieData) {
  let movieHtml = "";
  for (let movie of movieData.Search) {
    movieHtml += await getMovieHtml(movie.imdbID);
  }
  moviesContainer.innerHTML = movieHtml;
}

async function getMovieHtml(id) {
  const resp = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
  const data = await resp.json();

  return `
  <div class="movie">
          <div class="movie-hero">
            <img class="movie-img" src=${data.Poster}" alt="" />
          </div>
          <div class="movie-content">
            <div class="title-rating">
              <h3 class="movie-title">${data.Title}</h3>
              <div class="rating">
                <i class="fa-solid fa-star" style="color: #fec654"></i>
                <p class="movie-rate">${data.imdbRating}</p>
              </div>
            </div>
            <div class="information">
              <p class="p-information">${data.Runtime}</p>
              <p class="p-information">${data.Genre}</p>
              <button class="watchlist-btn" data-imdb="${data.imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
            </div>
            <div class="movie-description">
              <p class="movie-description-text">${data.Plot}</p>
            </div>
          </div>
        </div>
        <hr />
  `;
}

/* MY WATCHLIST - LOCAL STORAGE */

/* 
- Get the id of the selected movie when pressing the watchlist btn ✅
- Use the id of the selected movie to fetch the movie from the api  ✅  and save it to local storage, probably use JSON.stringify 
- add the selected movie to the watchlist ARRAY! .push()
- Loop trough eacht object in the ARRAY and render it to the DOM
*/

document.addEventListener("click", (e) => {
  if (e.target.dataset.imdb) {
    getMyWatchlist(e.target.dataset.imdb);
  }
});

async function getMyWatchlist(id) {
  const resp = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
  const data = await resp.json();
  const myWatchlist = [];
  myWatchlist.push(data);
  localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
  console.log(localStorage.getItem("watchlist"));
}
