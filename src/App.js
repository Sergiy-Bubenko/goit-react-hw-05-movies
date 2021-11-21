// import Navigation from './components/Navigation/Navigation';
import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import AddressNotFound from './components/AddressNotFound/AddressNotFound';
import './App.css';
const API_KEY = '1eb23ac83dec10d429defb0a8ad87385';

function App() {
  const [movies, setMovies] = useState([]);
  // setTimeout(() => console.log(movies), 1000);
  // console.log(movies);
  useEffect(
    () =>
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(
          res => 
          setMovies(res.results),
          // console.log(res)
        ),
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
          {/* <MoviesPage /> */}
        </Route>

        <Route path="/movies/:movieId">
          <MoviesPage API_KEY={API_KEY} />
        </Route>
        <Route>
          <AddressNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
