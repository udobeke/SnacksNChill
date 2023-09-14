import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '2379ba0eff6a55ce45794c90a648db8b';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.release_date}</p>
      <p>{movie.runtime} minutes</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
