import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    // Fetch movie details by ID from the TMDB API
    const apiKey = '2379ba0eff6a55ce45794c90a648db8b';
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  // Function to fetch the movie trailer URL from a source like YouTube
  const fetchTrailerUrl = async () => {
    try {
      // Use the movie's title to search for the trailer on YouTube
      const apiKey = 'AIzaSyBafVLlLAIhIbTDb9arYcNNoBeBVEQf4cs';
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${movie.title} trailer&key=${apiKey}`);
      const data = await response.json();

      // Extract the trailer URL from the response
      if (data.items && data.items.length > 0) {
        const trailerId = data.items[0].id.videoId;
        const trailerUrl = `https://www.youtube.com/watch?v=${trailerId}`;
        setTrailerUrl(trailerUrl);
      } else {
        // No trailer found
        setTrailerUrl(null);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setTrailerUrl(null);
    }
  };

  useEffect(() => {
    fetchTrailerUrl();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, movie]);

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
          <h2 data-testid="movie-title">{movie.title}</h2>
          <p className='font1' data-testid="movie-release-date">Release Date: {movie.release_date}</p>
          <p data-testid="movie-runtime">Runtime (minutes): {movie.runtime}</p>
          <p data-testid="movie-overview">{movie.overview}</p>

          {trailerUrl && (
            <div>
              <a href={trailerUrl} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
