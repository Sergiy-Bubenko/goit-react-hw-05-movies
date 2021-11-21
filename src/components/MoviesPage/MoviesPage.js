import { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage.js';
import Cast from '../Cast/Cast.js';
import Reviews from '../Reviews/Reviews.js';

export default function MoviesPage({ API_KEY }) {
  const { movieId } = useParams();

  const [thisMovie, setId] = useState(null);
  console.log('thisMovie', thisMovie);
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
        <MovieDetailsPage thisMovie={thisMovie} movieId={movieId} />

        <Route path={`/movies/${movieId}/cast`}>
          <Cast movieId={movieId} API_KEY={ API_KEY }/>
        </Route>
        <Route path={`/movies/${movieId}/reviews`}>
          <Reviews movieId={movieId} API_KEY={ API_KEY } />
        </Route>
      </>
    )
  );
  // return <div>MoviesPage{thisMovie}</div>;
  // <img src={}></img>;
}

// thisMovie.homepage +

// https://image.tmdb.org/t/p/w500
