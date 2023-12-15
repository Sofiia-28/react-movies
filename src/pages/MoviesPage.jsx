import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesBySearch } from '../api';
import { SearchBar } from '../components/SearchBar';
import { MovieList } from '../components/MovieList';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import Notiflix from 'notiflix';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState();
  const [id, setId] = useState(null);

  const [params, setParams] = useSearchParams('');
  const query = params.get('query') ?? '';

  useEffect(() => {
    async function getMovie() {
      if (query !== '') {
        try {
          setIsLoading(true);
          const { results, total_pages } = await fetchMoviesBySearch(
            query,
            page
          );
          if (results.length === 0) {
            Notiflix.Notify.failure(
              `Oops, no movie with the title "${query}" was found.`
            );
          }
          setShowBtn(page < Math.ceil(total_pages / 20));
          setMovies(prevState => [...prevState.concat(results)]);
        } catch (error) {
          Notiflix.Notify.failure(
            'Oops, something went wrong, try reloading the page'
          );
        } finally {
          setIsLoading(false);
        }
      }
    }
    getMovie();
  }, [query, page, id]);

  const handleSubmit = newQuery => {
    setParams({ query: newQuery });
    setPage(1);
    setMovies([]);
    setId(Date.now());
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />

      {movies.length > 0 && (
        <>
          <MovieList movies={movies} link={''}/>
        </>
      )}
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {showBtn && (
        <>
          <Button nextPage={handleLoadMore} />
        </>
      )}
    </div>
  );
}
