import React, { useState } from 'react';
import useMovieStore from '../store/useStore';
import { useMovies, useTv } from '../hooks/useMovies';
import { Movie, TV } from '../types/Movie';
import './movie.css';

const MovieList: React.FC = () => {
  const [page, setPage] = useState(1);
  // const [selectCategory, setSelectCategory] = useState(true);
  // const toggleButton = (isToggle: boolean) => {
  //   setSelectCategory(isToggle);
  // };
  const { isToggle, toggleCategory } = useMovieStore();
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
  const favoriteMovies = useMovieStore((state) => state.favoriteMovies);
  console.log(addFavorite);
  console.log(favoriteMovies);

  if (mIsLoading || mIsFetching || tIsLoading || tIsFetching)
    return <div>Loading...</div>;
  if (mIsError || tIsError) return <div>Error fetching movies</div>;

  return (
    <div className='all'>
      <div>
        <span
          className={`toggleBtn ${isToggle ? 'active' : ''}`}
          onClick={toggleCategory}>
          Movie
        </span>
        <span
          className={`toggleBtn ${!isToggle ? 'active' : ''}`}
          onClick={toggleCategory}>
          TV
        </span>
      </div>
      {isToggle &&
        movies?.map((movie: Movie) => (
          <li key={movie.id}>
            {movie.title}
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
            <button onClick={() => addFavorite(movie.id)}>
              Add to Favorites
            </button>
          </li>
        ))}
      {/* <div>
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </button>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div> */}
      {!isToggle &&
        tvshows?.map((tv: TV) => (
          <li key={tv.id}>
            {tv.name}
            <img src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`} />
            <button onClick={() => addFavorite(tv.id)}>Add to Favorites</button>
          </li>
        ))}
      <div>
        <h2>All TV</h2>
        <ul></ul>
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
