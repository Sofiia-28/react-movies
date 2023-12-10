import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCast } from '../api';
import { Loader } from '../components/Loader';
import Notiflix from 'notiflix';

const BASE_URL = 'https://image.tmdb.org/t/p/';

export default function CastPage() {
  const params = useParams();

  const [cast, setCast] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        const { cast } = await fetchCast(params.movieId);
        setCast(cast);
      } catch (error) {
        Notiflix.Notify.failure(
          'Oops, something went wrong, try reloading the page'
        );
      } finally {
        setIsLoading(false);
      }
    }

    getCast();
  }, [params.movieId]);

  return (
    <div>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {cast.length === 0 && (
        <>
          <p>Unfortunately, there is no information about cast</p>
        </>
      )}
      <ul className="cast-list">
        {cast.length > 0 && (
          <>
            {cast.map(actor => {
              const { character, id, name, profile_path } = actor;
              return (
                <li key={id}>
                  <img
                    src={`${BASE_URL}w200${profile_path}`}
                    alt={`${name} portrait`}
                  />
                  <b>{name}</b>
                  {character !== '' && (
                    <>
                      <p>Character: {character}</p>
                    </>
                  )}
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
}
