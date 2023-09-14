import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import MovieSearch from './MovieSearch';

const API_KEY = '2379ba0eff6a55ce45794c90a648db8b';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((response) => {
        setMovies(response.data.results.slice(0, 10));
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div>
      <div>
        <MovieSearch/>
      </div>
      <h1>Top 10 Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
