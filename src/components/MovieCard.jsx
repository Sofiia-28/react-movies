import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { Arrow } from '../components/Arrow';

const BASE_URL = 'https://image.tmdb.org/t/p/';

export const MovieCard = ({ movie }) => {
  const location = useLocation();
  const backLinkRef = useRef(location);

  const { genres, overview, poster_path, release_date, title, vote_average } =
    movie;

  const score = () => {
    return (vote_average * 10).toFixed(1);
  };

  const year = () => {
    return release_date.split('-')[0];
  };

  return (
    <div className="card-wrapper">
      <Link
        className="card-back-arrow"
        to={backLinkRef.current.state?.from ?? '/'}
      >
        <Arrow />
        Go back
      </Link>
      <div className="card-details-wrapper">
        {movie?.release_date && (
          <>
            <img
              src={`${BASE_URL}w300${poster_path}`}
              alt={`${title} movie poster`}
            />
            <div>
              <h1>
                {title} <span>({year()})</span>
              </h1>
              <p>User score: {score()}%</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h3>Genres</h3>
              {!!genres && genres.length === 0 && (
                <>
                  <p>Unfortunately, there is no information about genres</p>
                </>
              )}
              {!!genres && genres.length > 0 && (
                <>
                  <ul className="card-genres-list">
                    {genres.map(genre => {
                      return <li key={genre.id}>{genre.name}</li>;
                    })}
                  </ul>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
