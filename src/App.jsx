import './App.css'
import { useState } from 'react'
import { useEffect} from 'react'
import { getMovies, searchMovie } from './api';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovies().then((resultData) => {
      setPopularMovies(resultData)
    })
  }, [])

  // Mapping data movies from API
  const popularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return(
        <div className="bg-slate-400 h-auto d-flex flex-col mb-3 rounded" key={i} style={{width: '250px'}}>
          <div className="movie-title my-3 text-xs font-bold">{movie.original_title}</div>
          <img className="" src={`${import.meta.env.VITE_APP_BASEIMAGEURL}${movie.poster_path}`} style={{width: '250px', height: '300px'}}/>
          <div className="movie-date mt-3 italic">Release: {movie.release_date}</div>
          <div className="movie-rate mb-4 text-slate-600 font-bold underline">Rate: {movie.vote_average}</div>
        </div>
      )
    })
  }

  // Search movies
  const search = async (q) => {
    if (q.length > 3){
      // send paramater to API
      const query = await searchMovie(q)
      // set state
      setPopularMovies(query.results)
    }
  }

  // Render result
  return (
    <>
    <div className="container flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className='text-3xl font-bold mb-3 bg-slate-400 p-3 rounded text-white'>Movies List</h1>
        <h6 className='text-sm font-bold text-black italic mb-3 opacity-25'>API by: The Movie Database</h6>
        <input type="text" placeholder='Search movie name here' autoFocus className='w-2/3 h-16 bg-slate-400 text-center placeholder-white rounded-md mb-10' onChange={({target}) => search(target.value)}/>
        <div className='flex justify-center flex-wrap gap-10'>
          {popularMoviesList()}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
