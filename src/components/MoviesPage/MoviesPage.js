import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function MoviesPage({ API_KEY }) {
  const [requestValue, setRequestValue] = useState('');
  const [requestMovies, setRequestMovies] = useState('');
  const [resultRequestMovies, setResultRequestMovies] = useState(null);
  const [stopRequest, setStopRequest] = useState(true);
  console.log(resultRequestMovies);

  useEffect(() => {
    if (stopRequest) {
      return setStopRequest(false);
    }

    // eslint-disable-next-line no-unused-expressions
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${requestMovies}`,
    )
      .then(response => response.json())
      .then(res => [...res.results])
      .then(setResultRequestMovies)
      
  }, [API_KEY, requestMovies]);

  const handleRequestChange = evt =>
    setRequestValue(evt.target.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    if (requestValue.trim() === '') {
      return toast.error('измените запрос');
    }
    setRequestMovies(requestValue);
  };
  return (
    <>
      <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <input
            className="SearchForm-input"
            type="text"
            name="requestValue"
            value={requestValue}
            onChange={handleRequestChange}
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />

          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>
      </header>
      <ul>
        {resultRequestMovies &&
          resultRequestMovies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  {movie.name || movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
