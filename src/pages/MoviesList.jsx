import { useEffect, useState } from "react";
import { getMovies, searchMovie } from "../api";

export const MoviesList = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovies().then((resultData) => {
      setPopularMovies(resultData);
    });
  }, []);

  // Mapping data movies from API
  const popularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg" key={i} style={{ width: "270px" }}>
          <img className="" src={`${import.meta.env.VITE_APP_BASEIMAGEURL}${movie.poster_path}`} style={{ width: "270px", height: "340px" }} />
          <div className="bg-white p-4 sm:p-6">
            <h3 className="mt-0.5 text-xl font-bold text-gray-900">{movie.original_title}</h3>
            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 mb-2">{movie.overview}</p>
            <hr />
            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">Release date: {movie.release_date}</p>
            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 italic">Vote Average: {movie.vote_average.toFixed(1)}</p>
          </div>
        </article>
      );
    });
  };

  // Search movies
  const search = async (q) => {
    if (q.length > 3) {
      // send paramater to API
      const query = await searchMovie(q);
      // set state
      setPopularMovies(query.results);
    }
  };

  // Render result
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-3 bg-slate-100 py-3 px-5 rounded text-slate-300 mt-5">Movies List</h1>
          <div className="w-3/4 mb-10">
            <input type="text" id="Search" placeholder="Search movie name..." className="w-full h-16 rounded-md border-gray-400 py-2.5 shadow-md sm:text-sm text-center" onChange={({ target }) => search(target.value)}/>
          </div>
          <div className="flex justify-center flex-wrap gap-10">{popularMoviesList()}</div>
          <h6 className="text-sm font-bold text-black italic my-10 opacity-25">API by: The Movie Database</h6>
        </div>
      </div>
    </>
  );
}