import { Link, useLocation } from 'react-router-dom';

export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className='movies-list'>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`${movie.id}`} state={{from: location}}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
