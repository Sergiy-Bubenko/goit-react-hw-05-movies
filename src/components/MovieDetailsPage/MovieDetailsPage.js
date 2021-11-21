import { Link } from 'react-router-dom';

export default function MovieDetailsPage({ thisMovie, movieId }) {
  return (
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
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <hr />
    </>
  );
}
