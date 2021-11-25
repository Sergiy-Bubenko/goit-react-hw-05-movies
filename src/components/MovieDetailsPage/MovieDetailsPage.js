import { useEffect, useState } from 'react';
import {
  NavLink,
  Route,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Cast from '../Cast/Cast.js';
import Reviews from '../Reviews/Reviews.js';

export default function MovieDetailsPage({ API_KEY }) {
  const { movieId } = useParams();
  const [thisMovie, setMovie] = useState(null);
  // console.log('movieId', movieId);
  // console.log(`thisMovie`, thisMovie);
  const history = useHistory();
  const location = useLocation();

  // console.log('history', history);
  // console.log('location', location);

  useEffect(
    () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
      )
        .then(response => response.json())
        .then(setMovie),
    [API_KEY, movieId],
  );

  const onBackHistory = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    thisMovie && (
      <>
        <button onClick={onBackHistory} type="button">
          <img
            width="10px"
            src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-left.png"
            alt=""
          />{' '}
          Go back
        </button>
        <br />
        {thisMovie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${thisMovie.poster_path}`}
            width="320"
            alt={thisMovie.title}
          />
        )}
        <h2>{thisMovie.title}</h2>
        {thisMovie.vote_average !== 0 && (
          <p>User Score: {thisMovie.vote_average}</p>
        )}
        <h2>Overview</h2>
        <p>{thisMovie.overview}</p>
        <h2>Genres</h2>
        {thisMovie.genres.map(genre => {
          return <span key={genre.id}>{genre.name}</span>;
        })}
        <hr />
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink
              className="link"
              activeClassName="activeLink"
              to={{
                pathname: `/movies/${movieId}/cast`,
                state: { from: location?.state?.from ?? null },
              }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link"
              activeClassName="activeLink"
              to={{
                pathname: `/movies/${movieId}/reviews`,
                state: { from: location?.state?.from ?? null },
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <hr />
        <Route path={`/movies/${movieId}/cast`}>
          <Cast movieId={movieId} API_KEY={API_KEY} />
        </Route>
        <Route path={`/movies/${movieId}/reviews`}>
          <Reviews movieId={movieId} API_KEY={API_KEY} />
        </Route>
      </>
    )
  );
}
