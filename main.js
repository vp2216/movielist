const movies = [
  { title: "The Shawshank Redemption", genre: "Drama" },
  { title: "The Godfather", genre: "Crime" },
  { title: "The Godfather: Part II", genre: "Crime" },
  { title: "The Dark Knight", genre: "Action" },
  { title: "12 Angry Men", genre: "Drama" },
  { title: "Schindler's List", genre: "Drama" },
  {
    title: "The Lord of the Rings: The Return of the King",
    genre: "Adventure",
  },
  { title: "Pulp Fiction", genre: "Crime" },
  { title: "The Good, the Bad and the Ugly", genre: "Western" },
  { title: "Fight Club", genre: "Drama" },
  { title: "Forrest Gump", genre: "Drama" },
  { title: "Inception", genre: "Action" },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Adventure",
  },
  { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
  { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
  { title: "The Matrix", genre: "Action" },
  { title: "Goodfellas", genre: "Crime" },
  { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
  { title: "Seven Samurai", genre: "Adventure" },
  { title: "Se7en", genre: "Crime" },
  { title: "City of God", genre: "Crime" },
  { title: "The Silence of the Lambs", genre: "Thriller" },
  { title: "It's a Wonderful Life", genre: "Drama" },
  { title: "Life is Beautiful", genre: "Comedy" },
  { title: "The Usual Suspects", genre: "Crime" },
  { title: "Léon: The Professional", genre: "Action" },
  { title: "Spirited Away", genre: "Animation" },
  { title: "Saving Private Ryan", genre: "Drama" },
  { title: "Interstellar", genre: "Adventure" },
  { title: "The Green Mile", genre: "Drama" },
  { title: "The Prestige", genre: "Drama" },
  { title: "The Intouchables", genre: "Comedy" },
  { title: "The Lion King", genre: "Animation" },
  { title: "The Pianist", genre: "Drama" },
  { title: "The Departed", genre: "Crime" },
  { title: "Whiplash", genre: "Drama" },
  { title: "Gladiator", genre: "Action" },
];

function searchByTitleAndGenre(movieName, movieGenre) {
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(movieName.toLowerCase().trim()) &&
      movie.genre.toLowerCase().includes(movieGenre.toLowerCase().trim())
  );
}

function searchByTitle(movieName) {
    return movies.filter(movie => movie.title.toLowerCase().includes(movieName.toLowerCase().trim()));
}

function searchByGenre(movieGenre) {
    return movies.filter(movie => movie.genre.toLowerCase().includes(movieGenre.toLowerCase().trim()));
}

function displayResults(movieList) {
    list.innerHTML = "";
    movieList.map(data => {
        list.innerHTML += `<li>${data.title} (${data.genre})</li>`;
    });
    countByGenre(movieList);
    localStorage.setItem("movieList", JSON.stringify(movieList));
}

function sortByTitle() {
    movieList.sort((a, b) => a.title.localeCompare(b.title));
    list.innerHTML = ""; 
    displayResults(movieList);
}

function sortByGenre() {
    movieList.sort((a, b) => a.genre.localeCompare(b.genre));
    list.innerHTML = "";
    displayResults(movieList);
}

function onReload() {
    movieList = JSON.parse(localStorage.getItem("movieList"));
    displayResults(movieList);
    inputChange();
}

function countByGenre(movieList) {
    let countList = {};
    movieList.map(data => {
        if (countList[data.genre]) countList[data.genre]++;
        else countList[data.genre] = 1;
    });
    count.innerHTML = "";
    for (key in countList) {
        count.innerHTML += `<span>${key} : ${countList[key]}</span>`
    }
}

function inputChange() {
    console.log(select.value)
    if (select.value == "title") {
        title.style.display = "block";
        genre.style.display = "none";
    } else if (select.value == "genre") {
        title.style.display = "none";
        genre.style.display = "block";
    } else {
        title.style.display = "block";
        genre.style.display = "block";
    }
}

let title = document.getElementById("titleInput");
let genre = document.getElementById("genreInput");
let btn = document.getElementById("searchBtn");
let list = document.getElementById("list");
let count = document.getElementById("count");
let select = document.getElementById("select");

let movieList = [];

btn.addEventListener("click", () => {
    if (title.value && genre.value) {
        movieList = searchByTitleAndGenre(title.value, genre.value);
        title.value = "";
        genre.value = "";
    } else if (title.value) {
        movieList = searchByTitle(title.value);
        title.value = "";
    } else if (genre.value) {
        movieList = searchByGenre(genre.value);
        genre.value = "";
    } else {
        movieList = movies;
    }
    displayResults(movieList);
});