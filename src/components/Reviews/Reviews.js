import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import s from './Reviews.module.css';
export default function Reviews({ movieId, API_KEY }) {
  const [movieReviews, setReviews] = useState([]);

  useEffect(
    () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
      )
        .then(response => response.json())
        .then(res => res.results)
        .then(setReviews)
        .catch(err => console.error(err)),
    [API_KEY, movieId],
  );

  return (
    <div>
      {movieReviews.length === 0 ? (
        <p>Отзывы не найдены.</p>
      ) : (
        <ul>
          {movieReviews.map(authorReviews => {
            const { id, author, content } = authorReviews;
            return (
              <li className={s.reviewsDetails} key={id}>
                <h3>{author}</h3>
                <p>Character: {content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

Reviews.propTypes = {
  API_KEY: PropTypes.string,
  movieId: PropTypes.string,
};
