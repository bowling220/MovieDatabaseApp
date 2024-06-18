// api.js
import axios from 'axios';

const API_KEY = '161197b42eb3861adf04439f09bebe5f';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = (query) => {
  return api.get('/search/movie', {
    params: {
      query,
    },
  });
};

export const getMovieDetails = (id) => {
  return api.get(`/movie/${id}`);
};

export const getMovieCast = (id) => {
    return api.get(`/movie/${id}/credits`);
  };

export const getCastDetails = (id) => {
    return api.get(`/person/${id}`);
};
export const getPopularMovies = () => {
    return api.get('/movie/popular');
  };

  
  export const getTrendingMovies = (timeWindow) => {
    return api.get(`/trending/movie/${timeWindow}`);
  };