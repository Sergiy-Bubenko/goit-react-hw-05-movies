import PropTypes from 'prop-types';
import s from './MoveList.module.css';
import {
  Link,
  // useLocation
} from 'react-router-dom';
export default function MoveList({ movies, location, requestMovies }) {
  return (
    <div className={s.homeListContainer}>
      {movies && (
        <ul>
          {movies.map(movie => {
            return (
              <li className={s.homeItem} key={movie.id}>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from:
                        {
                          ...location,
                          request: requestMovies ? requestMovies : null,
                        } ?? null,
                    },
                  }}
                >
                  {movie.name || movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

MoveList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};
