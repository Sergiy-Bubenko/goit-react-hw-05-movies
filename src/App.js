import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./components/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./components/MovieDetailsPage/MovieDetailsPage'),
);
const AddressNotFound = lazy(() =>
  import('./components/AddressNotFound/AddressNotFound'),
);

const API_KEY = '1eb23ac83dec10d429defb0a8ad87385';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(
    () =>
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(res => setMovies(res.results))
        .catch(err => console.error(err)),
    [],
  );

  return (
    <div className="App">
      <nav className="App__nav">
        <NavLink className="link" activeClassName="activeLink" to="/" exact>
          Home
        </NavLink>
        <NavLink className="link" activeClassName="activeLink" to="/movies">
          Movies
        </NavLink>
      </nav>

      <Suspense fallback={<h1>Загрузжается результат...</h1>}>
        <Switch>
          <Route exact path="/">
            <HomePage movies={movies} />
          </Route>

          <Route exact path="/movies">
            <MoviesPage API_KEY={API_KEY} />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage API_KEY={API_KEY} />
          </Route>
          <Route>
            <AddressNotFound />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
