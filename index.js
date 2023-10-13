const moviesContainer = document.getElementById("movieContainer");
const movieInput = document.getElementById("movieInput");

document.getElementById("searchBtn").addEventListener("click", function (e) {
  e.preventDefault();
  fetchMovies();
  console.log(movieInput.value);
  movieInput.value = "";
});

async function fetchMovies() {
  const url = "http://www.omdbapi.com/";
  const resp = await fetch(`${url}?s="${movieInput.value}"&apikey=2070d45f`);
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
  const resp = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=2070d45f`);
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
              <div class="watchlist-btn" id="${data.imdbID}">
                <i class="fa-solid fa-circle-plus"></i>
                <p>Watchlist</p>
              </div>
            </div>
            <div class="movie-description">
              <p class="movie-description-text">${data.Plot}</p>
            </div>
          </div>
        </div>
        <hr />
  `;
}
