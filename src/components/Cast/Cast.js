import { useEffect, useState } from 'react';

export default function Cast({ movieId, API_KEY }) {
  const [movieCast, setCast] = useState(null);
  
  useEffect(
    () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
      )
        .then(response => response.json())
        .then(res => res.cast)
        .then(setCast),
    [API_KEY, movieId],
  );
  console.log(movieCast);

  return (
    <ul>
      {!movieCast ? (
        <p>Информация об актерском составе не найдена.</p>
      ) : (
        movieCast.map(actor => {
          return (
            <li key={actor.id}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  width="180"
                  alt={actor.profile_path}
                />
              )}
              <h3>{actor.original_name}</h3>
              <p>Character:{actor.character}</p>
            </li>
          );
        })
      )}
    </ul>
  );
}
