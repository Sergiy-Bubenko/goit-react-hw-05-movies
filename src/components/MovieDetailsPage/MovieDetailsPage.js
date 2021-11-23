import { NavLink, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Cast from '../Cast/Cast.js';
import Reviews from '../Reviews/Reviews.js';

export default function MovieDetailsPage({ API_KEY }) {
  const { movieId } = useParams();
  const [thisMovie, setId] = useState(null);

  // console.log('thisMovie', thisMovie);
  useEffect(
    () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
      )
        .then(response => response.json())
        .then(setId),
    [API_KEY, movieId],
  );

  return (
    thisMovie && (
      <>
        <button type="button">
          <img
            width="10px"
            src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-left.png"
            alt=""
          />{' '}
          Go back
        </button>
        <br />
        <img
          src={`https://image.tmdb.org/t/p/w500${thisMovie.poster_path}`}
          width="320"
          alt={thisMovie.title}
        />
        <h2>{thisMovie.title}</h2>
        <p>User Score:</p>
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
              to={`/movies/${movieId}/cast`}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link"
              activeClassName="activeLink"
              to={`/movies/${movieId}/reviews`}
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
