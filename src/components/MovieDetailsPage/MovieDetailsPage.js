import PropTypes from 'prop-types';
import s from './MovieDetailsPage.module.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailsPage({ API_KEY }) {
  const { movieId } = useParams();
  const [thisMovie, setMovie] = useState(null);
  const history = useHistory();
  const location = useLocation();

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
        <button onClick={onBackHistory} type="button" className={s.btn}>
          <img
            className={s.arrow}
            width="18px"
            src="https://static7.depositphotos.com/1000335/700/i/600/depositphotos_7008775-stock-photo-arrow-left-icon-grey.jpg"
            alt="Go back"
          />
          <span className={s.btnText}>Go back</span>
        </button>
        <br />
        <div className={s.MovieDetailsPageContainer}>
          <div>
            {thisMovie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${thisMovie.poster_path}`}
                width="320"
                style={{ display: 'block' }}
                alt={thisMovie.title}
              />
            )}
          </div>
          <div className={s.MovieInfo}>
            <h2>{thisMovie.title && thisMovie.title}</h2>
            {thisMovie.vote_average && (
              <p>User Score: {thisMovie.vote_average}</p>
            )}
            {thisMovie.overview && (
              <>
                <h2>Overview</h2>
                <p>{thisMovie.overview}</p>
              </>
            )}
            {thisMovie.genres && (
              <>
                <h2 className={s.MovieDetails__genre}>Genres</h2>
                {thisMovie.genres.map(genre => {
                  return (
                    <span className={s.MovieDetails__genreItem} key={genre.id}>
                      {genre.name}
                    </span>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className={s.AdditionalInformation}>
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
        </div>

        <Suspense fallback={<h1>Загрузка...</h1>}>
          <Switch>
            <Route path={`/movies/${movieId}/cast`}>
              <Cast movieId={movieId} API_KEY={API_KEY} />
            </Route>
            <Route path={`/movies/${movieId}/reviews`}>
              <Reviews movieId={movieId} API_KEY={API_KEY} />
            </Route>
          </Switch>
        </Suspense>
      </>
    )
  );
}

MovieDetailsPage.propTypes = {
  API_KEY: PropTypes.string,
};
