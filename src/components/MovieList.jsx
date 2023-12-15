import { Link, useLocation } from 'react-router-dom';

export const MovieList = ({ movies, link }) => {
  const location = useLocation();

  return (
    <ul className="movies-list">
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`${link}${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
