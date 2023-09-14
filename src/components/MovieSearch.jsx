import  { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = '2379ba0eff6a55ce45794c90a648db8b';

  const handleSearch = () => {
    // Make an API request to search for movies
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
      .then((response) => {
        // Update the searchResults state with the fetched data
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.id} className="search-result-card">
            <a href={`/movies/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>{movie.release_date}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
