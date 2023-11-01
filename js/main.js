// Button's
const moviesBtnNode = document.getElementById("moviesBtn");

// Input's
const moviesInputNode = document.getElementById("moviesInput");

// HTML List result
const resultListNode = document.getElementById('moviesResultWrap');
const movieListNode = document.getElementById("moviesList")

// Popup
const popupNode = document.querySelector(".popup");
const popupContentNode = document.querySelector(".popup__content");
const popupCloseNode = document.querySelector(".popup__close");
const bodyFixedNode = document.querySelector("body");

// Global Variables
const API_KEY = "dc00a1a5";
let movieName = null;

// ================FUNCTION'S================

const searchMovieBtnHandler = (event) => {
    event.preventDefault();

    if (!moviesInputNode.value) {
        alert('Введите название фильма');
        return;
    };

    movieName = getMovieName();
    clearInput();
    getMoviesArray();
};

// Получение массива объектов со списком фильмов
const getMoviesArray = () => {
    fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(arrMovies => {
        console.log(arrMovies.Response)
        if (arrMovies.Response === 'False') {
            alert('Фильм не найден или неккоректный запрос!')
            return;
        };
        const movies = arrMovies.Search;
        renderResponseMovies(movies)
    });
};

// Получение значения из поля ввода
const getMovieName = () => moviesInputNode.value;

// Очистка поля ввода
const clearInput = () => moviesInputNode.value = null;

// Рендер списка фильмов
const renderResponseMovies = (movies) => {
    movieListNode.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement("li");
        const moviePoster = document.createElement("img");
        const movieInner = document.createElement("div");
        const movieTitle = document.createElement("h2");
        const movieYear = document.createElement("p");
        const movieType = document.createElement("p");

        movieListNode.appendChild(movieItem);
        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieInner);
        movieInner.appendChild(movieTitle);
        movieInner.appendChild(movieYear);
        movieInner.appendChild(movieType);

        movieItem.className = "movies__item";
        moviePoster.className = "movies__poster";
        movieInner.className = "movies__inner";
        movieTitle.className = "movies__title";
        movieYear.className = "movies__years";
        movieType.className = "movies__type";

        moviePoster.setAttribute('src', movie.Poster);

        movieTitle.innerText = movie.Title;
        movieYear.innerText = movie.Year;
        translateMovieType(movie, movieType)

        movieItem.addEventListener("click", () => getDetailInfoMovie(movie));

        });
};

// Получение информации о фильме
const getDetailInfoMovie = (movie) => {
    const movieID = movie.imdbID;

    fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(detailMovie => {
        togglePopup();
        renderDetailMovie(detailMovie);
    });
};

// Рендер подробной информации
const renderDetailMovie = (detailMovie) => {
    const popupPoster = document.querySelector(".popup__poster");
    const popupTitle = document.querySelector(".popup__title");

    const popupYear = document.getElementById("spanYear");
    const popupRating = document.getElementById("spanRating");
    const popupData = document.getElementById("spanData");
    const popupDuration = document.getElementById("spanDuration");
    const popupGenre = document.getElementById("spanGenre");
    const popupDirector = document.getElementById("spanDirector");
    const popupScen = document.getElementById("spanScen");
    const popupActor = document.getElementById("spanActor");

    popupPoster.setAttribute("src", detailMovie.Poster);

    popupTitle.innerText = detailMovie.Title;
    popupYear.innerText = detailMovie.Year;
    popupRating.innerText = detailMovie.Rated;
    popupData.innerText = detailMovie.Released;
    popupDuration.innerText = detailMovie.Runtime;
    popupGenre.innerText = detailMovie.Genre;
    popupDirector.innerText = detailMovie.Director;
    popupScen.innerText = detailMovie.Writer;
    popupActor.innerText = detailMovie.Actors;
};

// Перевод типа фильма на русский
const translateMovieType = (movie, movieType) => {
    switch (movie.Type) {
        case 'movie':
            movieType.innerText = "Фильм";
            break;
        case "series":
            movieType.innerText = "Сериал";
            break;
        case "game":
            movieType.innerText = "Игра";
            break;
        default:
            movieType.innerText = movie.Type;
            break;
    }
}; 

// Появление/исчезновение popup
const togglePopup = () => {
    popupNode.classList.toggle("popup__open");
    bodyFixedNode.classList.toggle("body__fixed");
};

// Обработчики событий
moviesBtnNode.addEventListener("click", searchMovieBtnHandler);
popupCloseNode.addEventListener("click", togglePopup);

// Исчезвовение popup при клике вне области контента
popupNode.addEventListener("click", (event) => {
    if (!event.composedPath().includes(popupContentNode)) {
        togglePopup();
    };
});