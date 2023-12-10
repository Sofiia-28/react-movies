import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'e1fe80951c2b97a426dc0cdfe1eff4f3';
const LANG = 'language=en-US';

export const fetchMovies = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMoviesBySearch = async (query, page) => {
  const response = await axios.get(
    `/search/movie?query=${query}&${LANG}&page=${page}&api_key=${API_KEY}`
  );
  return response.data;
};

export const fetchMovieDetails = async id => {
  const response = await axios.get(`/movie/${id}?${LANG}&api_key=${API_KEY}`);
  return response.data;
};

export const fetchCast = async id => {
  const response = await axios.get(
    `/movie/${id}/credits?${LANG}&api_key=${API_KEY}`
  );
  return response.data;
};

export const fetchReviews = async id => {
  const response = await axios.get(
    `/movie/${id}/reviews?${LANG}&page=1&api_key=${API_KEY}`
  );
  return response.data;
};
