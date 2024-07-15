import axios from "axios";

// GET popular movies
export const getMovies = async() => {
  const movie = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/movie/popular?page=1&api_key=${import.meta.env.VITE_APP_APIKEY}`)
  return movie.data.results
} 

// Search movies
export const searchMovie = async(q) => {
  const search = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/search/movie?page=1&query=${q}&api_key=${import.meta.env.VITE_APP_APIKEY}`)
  return search.data
}