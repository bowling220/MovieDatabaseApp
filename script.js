document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const trendingToday = document.getElementById('trending-today');
    const trendingWeek = document.getElementById('trending-week');
    const popularMovies = document.getElementById('popular-movies');
  
    searchButton.addEventListener('click', handleSearch);
  
    async function fetchMovies(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    function createMovieElement(movie) {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie');
      movieDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
        <p>${movie.title}</p>
      `;
      return movieDiv;
    }
  
    async function handleSearch() {
      const query = searchInput.value.trim();
      if (!query) return;
      searchResults.innerHTML = '<p>Loading...</p>';
      const results = await fetchMovies(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=161197b42eb3861adf04439f09bebe5f`);
      searchResults.innerHTML = '';
      if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
      } else {
        results.forEach(movie => {
          searchResults.appendChild(createMovieElement(movie));
        });
      }
    }
  
    async function loadInitialContent() {
      const popular = await fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=161197b42eb3861adf04439f09bebe5f`);
      const trendingTodayData = await fetchMovies(`https://api.themoviedb.org/3/trending/movie/day?api_key=161197b42eb3861adf04439f09bebe5f`);
      const trendingWeekData = await fetchMovies(`https://api.themoviedb.org/3/trending/movie/week?api_key=161197b42eb3861adf04439f09bebe5f`);
  
      popular.forEach(movie => {
        popularMovies.appendChild(createMovieElement(movie));
      });
  
      trendingTodayData.forEach(movie => {
        trendingToday.appendChild(createMovieElement(movie));
      });
  
      trendingWeekData.forEach(movie => {
        trendingWeek.appendChild(createMovieElement(movie));
      });
    }
  
    loadInitialContent();
  });
  