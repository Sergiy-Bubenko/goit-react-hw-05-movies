import { Link, useLocation } from 'react-router-dom';
export default function HomePage({ movies }) {
  const location = useLocation();
  return (
    <>
      <h1>Trending to day</h1>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  // state: { from: location?.state?.from ?? null },
                  state: { from: location ?? null },
                }}
                // {movie.id}
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
