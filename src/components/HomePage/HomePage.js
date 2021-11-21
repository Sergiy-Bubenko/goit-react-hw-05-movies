import {
  Link,
  // useRouteMatch
  useParams
} from 'react-router-dom';
export default function HomePage({ movies }) {
  // const { url } = useRouteMatch();
  const a = useParams()
  console.log(a);
  return (
    <>
      <h1>Trending to day</h1>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
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
