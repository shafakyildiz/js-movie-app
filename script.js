// The movie database API Key

const API_KEY = "api_key=1b5484d18124e1c0063908920ff16f12";
const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER = "/discover/movie?sort_by=revenue.desc&";
const API_URL = BASE_URL + DISCOVER + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

// Fetching the data from API

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      console.log(data.results);
    });
}

// Show movies by appending main element

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img
          src="${IMG_URL + poster_path}"
          alt="${title}"
        />

        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
     

        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        <button class="details">View Details...</button>
        <br/>
        </div>


       
        `;
    main.appendChild(movieEl);
    const detailsButtons = document.querySelectorAll(".details");
    detailsButtons.forEach((detailButton, index) => {
      console.log(index, data[index]);
      detailButton.addEventListener("click", (e) => {
        main.innerHTML = `<img
        src="${IMG_URL + data[index].poster_path}"
        alt="${data[index].title}"
      />
      <div class="overview">
      <figcaption><h3>${data[index].title}<br/> <br/>Overview</h3>
          <p>${data[index].overview} <br/><br/>Release Date: ${data[index].release_date}</p></figcaption>
          </div>`;
      });
    });
  });
}

// Colorizing the rating according to vote_average

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Search function

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
