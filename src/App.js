import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import AddressNotFound from './components/AddressNotFound/AddressNotFound';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';

import './App.css';
const API_KEY = '1eb23ac83dec10d429defb0a8ad87385';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(
    () =>
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(res => setMovies(res.results)),
    [],
  );

  return (
    <div className="App">
      <nav>
        <NavLink className="link" activeClassName="activeLink" to="/" exact>
          Home
        </NavLink>
        <NavLink className="link" activeClassName="activeLink" to="/movies">
          Movies
        </NavLink>
      </nav>

      <hr />

      <Switch>
        <Route exact path="/">
          <HomePage movies={movies} />
        </Route>

        <Route exact path="/movies">
          {/* тут сделаем инпут для поиска фильма */}
          <MoviesPage API_KEY={API_KEY} />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage API_KEY={API_KEY} />
        </Route>
        <Route>
          <AddressNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
