import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchReviews } from '../api';
import { Loader } from '../components/Loader';
import Notiflix from 'notiflix';

export default function ReviewsPage() {
  const params = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        const initialReviews = await fetchReviews(params.movieId);
        setReviews(initialReviews.results);
      } catch (error) {
        Notiflix.Notify.failure(
          'Oops, something went wrong, try reloading the page'
        );
      } finally {
        setIsLoading(false);
      }
    }

    getReviews();
  }, [params.movieId]);

  return (
    <div>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {reviews.length === 0 && (
        <>
          <p>Unfortunately, there are no reviews</p>
        </>
      )}
      <ul>
        {reviews.length > 0 && (
          <>
            {reviews.map(review => {
              const { author, id, content } = review;
              return (
                <li key={id}>
                  {' '}
                  <b>{author}</b>
                  <p>{content}</p>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
}
