import { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import { MovieList } from '../components/MovieList';
import { Loader } from '../components/Loader';
import Notiflix from 'notiflix';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getTrendMovies() {
      try {
        setIsLoading(true);
        const { results } = await fetchMovies();
        setMovies(results);
      } catch (error) {
        Notiflix.Notify.failure(
          'Oops, something went wrong, try reloading the page'
        );
      } finally {
        setIsLoading(false);
      }
    }

    getTrendMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <MovieList movies={movies} link={'movies/'}/>
    </div>
  );
}
