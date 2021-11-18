import { Link } from "react-router-dom";
export default function HomePage({ movies }) {
  return (
    <ul>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link
              to="/movies/id"
              // {movie.id}
            >
              {movie.name || movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
