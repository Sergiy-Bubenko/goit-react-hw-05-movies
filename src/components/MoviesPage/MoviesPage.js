import s from './MoviesPage.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const MoveList = lazy(() => import('../MoveList/MoveList'));
export default function MoviesPage({ API_KEY }) {
  const [requestValue, setRequestValue] = useState('');
  const [requestMovies, setRequestMovies] = useState('');
  const [resultRequestMovies, setResultRequestMovies] = useState(null);
  const [stopRequest, setStopRequest] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (stopRequest) {
      return setStopRequest(false);
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${requestMovies}`,
    )
      .then(response => response.json())
      .then(res => res.results)
      .then(setResultRequestMovies)
      .catch(error => console.error(error));

    setRequestValue('');
  }, [requestMovies]);

  useEffect(() => {
    if (!location.request) return;
    setRequestMovies(location.request);
  }, []);

  const handleRequestChange = evt =>
    setRequestValue(evt.target.value.toLowerCase());

    const handleSubmit = event => {
      event.preventDefault();
      
    setRequestMovies(requestValue);
  };
  
  const onPushHistory = () => {
    if (requestValue.trim() === '') {
      return toast.error('Измените запрос');
    }
    return history.push({
      ...location,
      search: `query=${requestValue}`,
    });
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
          <input
            className={s.SearchFormInput}
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
            className={s.SearchFormButton}
          >
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
      <Suspense fallback={<h1>Загрузжается результат...</h1>}>
        <MoveList
          movies={resultRequestMovies}
          location={location}
          requestMovies={requestMovies}
        />
      </Suspense>
    </>
  );
}

MoviesPage.propTypes = {
  API_KEY: PropTypes.string,
};
