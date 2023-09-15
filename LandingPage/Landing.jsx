import { useEffect, useState } from 'react';
import './Landing.css'
import { Link } from 'react-router-dom';
import * as Unicons from '@iconscout/react-unicons';

export default function Landing() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the top 10 movies from TMDB API when the component mounts
    const apiKey = '2379ba0eff6a55ce45794c90a648db8b';
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results.slice(0, 10)))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
          <input type="checkbox" id="menu-toggler" />
          <label htmlFor="menu-toggler" id="hamburger-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="24px"
              height="24px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18V11H3v2zm0-7v2h18V6H3z" />
            </svg>
          </label>
          <ul className="all-links">
           
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
          </ul>
        </nav>
      </header>

      <section className="homepage" id="home">
        <div className="content">
          <div className="text">
            <h1>John Wick 3 : Parabellum</h1>
            <p>
              John Wick is on the run after killing a member of the international assassins guild, <br /> and with a $14 million price tag on his head, he is the target of hit men and women everywhere 
            </p>
          </div>
          <Link to="/">Watch Trailer</Link>
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
                />
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-release-date">Release Date: {movie.release_date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <div>
          <span>© 2021 MovieBox by Peace Chinagwam</span>
          <span className="link">
            <Link to="/"><Unicons.UilLinkedin />Linkedin</Link>
            <Link to="/"><Unicons.UilGithub />Github</Link> 
          </span>
        </div>
      </footer>
    </>
  )
}