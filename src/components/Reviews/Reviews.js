import { useEffect, useState } from 'react';

export default function Reviews({ movieId, API_KEY }) {
  const [movieReviews, setReviews] = useState(null);

  useEffect(
    () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
      )
        .then(response => response.json())
        .then(res => res.results)
        .then(setReviews),
    [API_KEY, movieId],
  );
  console.log(movieReviews);

  return (
    <ul>
      {!movieReviews ? (
        <p>Отзывы не найдены.</p>
      ) : (
        movieReviews.map(author => {
          return (
            <li key={author.id}>
              <h3>{author.author}</h3>
              <p>Character:{author.content}</p>
            </li>
          );
        })
      )}
    </ul>
  );
}
