// import Navigation from './components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { NavLink, Link, Route, Routes, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import './App.css';
const API_KYI = '1eb23ac83dec10d429defb0a8ad87385';

function App() {
  const [movies, setMovies] = useState([]);
  // setTimeout(() => console.log(movies), 1000);
  console.log(movies);
  useEffect(
    () =>
      fetch(
        // 'https://api.themoviedb.org/3/movie/550?api_key=1eb23ac83dec10d429defb0a8ad87385',
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KYI}`,
      )
        .then(response => response.json())
        .then(
          res => setMovies(res.results),
          // console.log(res)
        ),
    [],
  );

  return (
    <div className="App">
      <nav>
        <NavLink
          // className=""
          // activeClassName=""
          to="/"
          // exact
        >
          Home
        </NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      {/* <hr /> */}
      {/* <Routes> */}
      <Route exact path="/" element={<HomePage movies={movies} />} />
      <Route path="/movies" element={<MoviesPage />} />
      {/* </Routes> */}
    </div>
  );
}

export default App;
