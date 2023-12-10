import { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import { TrendMovieList } from '../components/TrendMovieList';
import { Loader } from '../components/Loader';
import Notiflix from 'notiflix';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getTrendMovies() {
      try {
        setIsLoading(true);
        const initialMovies = await fetchMovies();
        setMovies(initialMovies.results);
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
      <TrendMovieList movies={movies} />
    </div>
  );
}
