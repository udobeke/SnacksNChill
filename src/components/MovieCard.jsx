import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
      </Link>
    </div>
  );
}

export default MovieCard;
