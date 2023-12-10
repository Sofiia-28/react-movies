import { useParams, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../api';
import { MovieCard } from '../components/MovieCard';
import { Loader } from '../components/Loader';
import Notiflix from 'notiflix';

export default function MoviesDetailsPage() {
  const params = useParams();

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const initialDetails = await fetchMovieDetails(params.movieId);
        setMovie(initialDetails);
      } catch (error) {
        Notiflix.Notify.failure(
          'Oops, something went wrong, try reloading the page'
        );
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [params.movieId]);

  return (
    <div>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <MovieCard movie={movie} />
      <div className="card-add-info">
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
