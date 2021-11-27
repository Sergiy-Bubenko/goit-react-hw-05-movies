import { useEffect, useState } from 'react';

export default function Cast({ movieId, API_KEY }) {
  const [movieCast, setCast] = useState([]);

  useEffect(
    () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
      )
        .then(response => response.json())
        .then(res => res.cast)
        .then(setCast)
        .catch(err => console.error(err)),
    [API_KEY, movieId],
  );

  return (
    <div>
      {movieCast.length === 0 ? (
        <p>Информация об актерском составе не найдена.</p>
      ) : (
        <ul>
          {movieCast.map(actor => {
            const { id, profile_path, original_name, character } = actor;
            return (
              <li key={id}>
                {profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    width="180"
                    alt={profile_path}
                  />
                )}
                <h3>{original_name && original_name}</h3>
                <p>Character:{character && character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
