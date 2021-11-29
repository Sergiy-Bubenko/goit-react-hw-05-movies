import { Link, useLocation } from 'react-router-dom';
export default function HomePage({ movies }) {
  const location = useLocation();
  return (
    <>
      <h1>TRENDING TO DAY</h1>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location?.state?.from ?? null },
                }}
              >
                {movie.name || movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
