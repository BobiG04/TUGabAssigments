import React from 'react'
import { useState, useEffect } from 'react';
import { useDebounce  } from 'react-use';
import Search from './components/Search';
import HeroImg from '../public/hero.png';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'applicaton/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [seachTerm, setseachTerm] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [movies, setmovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(seachTerm), 750, [seachTerm]);

  const fetchMovies = async (query = '') => {
    setisLoading(true);
    setErrMsg('');

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      //alert(response);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      console.log(data);
      if (data.Response == 'False') {
        setErrMsg(data.Error || 'Failed to fetch movies');
        setmovies([]);
        return;
      }

      setmovies(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrMsg(`Error fetching movies! Try again later.`);
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>

      <div className='pattern'></div>

      <div className='wrapper'>
        <header style={{ margin: "0" }}>
          <img src={HeroImg} />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle!</h1>
          <Search seachTerm={seachTerm} setSearchTerm={setseachTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errMsg ? (
            <p className='text-red-600'>{errMsg}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>

    </main>
  );
}

export default App;