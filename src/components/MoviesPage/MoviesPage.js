import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Route, Link, useHistory, useLocation } from 'react-router-dom';
export default function MoviesPage({ API_KEY}) {
  const [requestValue, setRequestValue] = useState('');
  const [requestMovies, setRequestMovies] = useState('');
  const [resultRequestMovies, setResultRequestMovies] = useState(null);
  const [stopRequest, setStopRequest] = useState(true);

  const history = useHistory();
  const location = useLocation();

  // const URLSearchParamsGetAll = new URLSearchParams(document.location.state.substring(1));
  // console.log(`URLSearchParamsGetAll`, URLSearchParamsGetAll.get('from'));

  // console.log('history', history);
  // console.log('location', location);

  useEffect(() => {
    if (stopRequest) {
      return setStopRequest(false);
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${requestMovies}`,
    )
      .then(response => response.json())
      .then(res => [...res.results])
      .then(setResultRequestMovies)
      .catch(error => console.error(error));
    // .finally(() =>
    //   history.push({
    //     ...location,
    //     search: `query=${requestMovies}`,
    //     // search: `query=movie`,
    //   }),
    // );
    setRequestValue('');
  }, [requestMovies]);

  const handleRequestChange = evt =>
    setRequestValue(evt.target.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    if (requestValue.trim() === '') {
      return toast.error('измените запрос');
    }
    
    setRequestMovies(requestValue);
  };

  const onPushHistory = () =>
    history.push({
      ...location,
      search: `query=${requestValue}`,
      // search: `query=movie`,
    });

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

          <button
            onClick={onPushHistory}
            type="submit"
            className="SearchForm-button"
          >
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>
      </header>

      <ul>
        {resultRequestMovies &&
          resultRequestMovies.map(movie => {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: location ?? null },
                  }}
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
