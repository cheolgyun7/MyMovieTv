import React, { useState } from 'react';
import useMovieStore from '../store/useStore';
import { useMovies, useTv } from '../hooks/useMovies';
import { Movie, TV } from '../types/Movie';
import './movie.css';

const MovieList: React.FC = () => {
  const [page, setPage] = useState(1);
  const {
    data: movies,
    isLoading: mIsLoading,
    isError: mIsError,
    isFetching: mIsFetching
  } = useMovies(page);
  const {
    data: tvshows,
    isLoading: tIsLoading,
    isError: tIsError,
    isFetching: tIsFetching
  } = useTv(page);
  const addFavorite = useMovieStore((state) => state.addFavorite);

  if (mIsLoading || mIsFetching || tIsLoading || tIsFetching)
    return <div>Loading...</div>;
  if (mIsError || tIsError) return <div>Error fetching movies</div>;

  return (
    <div className='all'>
      <div>
        <h2>All Movies</h2>
        <ul>
          {movies?.map((movie: Movie) => (
            <li key={movie.id}>
              {movie.title}
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              />
              <button onClick={() => addFavorite(movie.id)}>
                Add to Favorites
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </button>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div>
      <div>
        <h2>All TV</h2>
        <ul>
          {tvshows?.map((tv: TV) => (
            <li key={tv.id}>
              {tv.name}
              <img src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`} />
              <button onClick={() => addFavorite(tv.id)}>
                Add to Favorites
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </button>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
