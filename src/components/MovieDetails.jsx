import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie details by ID from the TMDB API
    const apiKey = '2379ba0eff6a55ce45794c90a648db8b';
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='description'>
        <h2 className="logo">
          <Link to="/">SnacksNChill</Link>
        </h2>
      </div>
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className='font'>
          <h2  data-testid="movie-title">{movie.title}</h2>
          <p className='font1' data-testid="movie-release-date">Release Date (UTC): {movie.release_date}</p>
          <p data-testid="movie-runtime">Runtime (minutes): {movie.runtime}</p>
          <p data-testid="movie-overview">{movie.overview}</p>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
