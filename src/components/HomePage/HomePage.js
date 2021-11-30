import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import s from './HomePage.module.css';
import { useLocation } from 'react-router-dom';

const MoveList = lazy(() => import('../MoveList/MoveList'));
export default function HomePage({ movies }) {
  const location = useLocation();
  return (
    <>
      <h1 className={s.homeTitle}>TRENDING TO DAY</h1>
      <Suspense fallback={<h1>Загрузжается результат...</h1>}>
        <MoveList movies={movies} location={location} />
      </Suspense>
    </>
  );
}

HomePage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};
