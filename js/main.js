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
// let movies = null;

// ================FUNCTION'S================

const searchMovieBtnHandler = (event) => {
    event.preventDefault();

    if (!moviesInputNode.value) {
        alert('Введите название фильма');
        return;
    };

    movieName = getMovieName();
    clearInput();
    console.log(movieName);

    // fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`)
    // .then(response => response.json())
    // .then(json => movies = json.Search) 

    fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
        console.log(json.Response)
        if (json.Response === 'False') {
            alert('Error')
            return;
        }
        const movies = json.Search;
        console.log(movies)
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
        movieType.innerText = movie.Type;

        movieItem.addEventListener('click', (event) => {
            if (event.target.classList.contains("movies__item")) {
                const movieID = movie.imdbID;
                console.log(movieID);
                fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    openPopup();
                    renderDetailMovie(json);
                })
            };
        });

        });
};

// Рендер подробной информации
const renderDetailMovie = (json) => {
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

    popupPoster.setAttribute("src", json.Poster);

    popupTitle.innerText = json.Title;
    popupYear.innerText = json.Year;
    popupRating.innerText = json.Rated;
    popupData.innerText = json.Released;
    popupDuration.innerText = json.Runtime;
    popupGenre.innerText = json.Genre;
    popupDirector.innerText = json.Director;
    popupScen.innerText = json.Writer;
    popupActor.innerText = json.Actors;
}

// Появление popup с информацией о фильме
const openPopup = () => {
    popupNode.classList.toggle("popup__open");
    bodyFixedNode.classList.toggle("body__fixed");
}

// Исчезновение popup
const closePopup = () => {
    popupNode.classList.toggle("popup__open");
    bodyFixedNode.classList.toggle("body__fixed");
}

// Обработчики событий
moviesBtnNode.addEventListener("click", searchMovieBtnHandler);
popupCloseNode.addEventListener("click", closePopup);