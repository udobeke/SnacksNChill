import { useEffect, useState } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import * as Unicons from '@iconscout/react-unicons';

export default function Landing() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the top 10 movies from TMDB API when the component mounts
    const apiKey = '2379ba0eff6a55ce45794c90a648db8b';
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results.slice(0, 10)))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to get the background image URL from TMDb API
  const getBackgroundImage = () => {
    if (movies.length > 0) {
      return `https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`;
    }
    return ''; // Return a default or placeholder image URL if there are no movies
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // Handle empty search query if needed
      return;
    }

    setIsLoading(true);

    // Fetch movies based on the search query
    const apiKey = '2379ba0eff6a55ce45794c90a648db8b';
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <h2 className="logo">
            <Link to="/">SnacksNChill</Link>
          </h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for movies by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {isLoading && <div className="loading-indicator">Loading...</div>}
        </nav>
      </header>

      <section className="homepage" id="home" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
        <div className="content">
          {movies.length > 0 && (
            <div className="text">
              <h1>{movies[0].title}</h1>
              <p className="overview">{movies[0].overview}</p>
            </div>
          )}
          {movies.length > 0 && (
            <Link to={`/movies/${movies[0].id}`}>Watch Trailer</Link>
          )}
        </div>
      </section>

      <section className="movie-list" id="movie-list">
        <h2>Top Movies</h2>
        <ul className="cards">
          {movies.map((movie) => (
            <li key={movie.id} className="card" data-testid="movie-card">
              <Link to={`/movies/${movie.id}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                  data-testid="movie-poster"
                />
                <h3 className="movie-title" data-testid="movie-title">{movie.title}</h3>
                <p className="movie-release-date" data-testid="movie-release-date">{movie.release_date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <div>
          <span>© 2023 SnacksNChill by Peace Chinagwam</span>
          <span className="link">
            <Link className="icon" to="/"><Unicons.UilLinkedin /></Link>
            <Link className="link" to="/"><Unicons.UilGithub /></Link>
          </span>
        </div>
      </footer>
    </>
  );
}
