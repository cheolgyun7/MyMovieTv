import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMovieStore, useStore } from '../../store/useStore';
import { useMovies, useTv } from '../../hooks/useMovies';
import { Media } from '../../types/Media';
import MediaItem from './MediaItem';

import './mediaList.css';

const MediaList: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  // Extract searchQuery directly from useStore()
  const { searchQuery } = useStore();

  const { isToggle, setIsToggle } = useMovieStore();
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
  const handleToggleBtn = (id: boolean) => {
    setIsToggle(id);
    setPage(1);
  };

  if (mIsLoading || mIsFetching || tIsLoading || tIsFetching)
    return <div>Loading...</div>;
  if (mIsError || tIsError) return <div>Error fetching movies</div>;

  // Ensure searchQuery is treated as a string
  const filteredMovies = movies?.filter((movie: Media) =>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTvShows = tvshows?.filter((tv: Media) =>
    tv.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='all'>
      <div>
        <span
          className={`toggleBtn ${isToggle ? 'active' : ''}`}
          onClick={() => handleToggleBtn(true)}>
          Movie
        </span>
        <span
          className={`toggleBtn ${!isToggle ? 'active' : ''}`}
          onClick={() => handleToggleBtn(false)}>
          TV
        </span>
      </div>
      <div className='CardList'>
        {isToggle &&
          filteredMovies?.map((movie: Media) => (
            <MediaItem key={movie.id} item={movie} />
          ))}
        {!isToggle &&
          filteredTvShows?.map((tv: Media) => (
            <MediaItem key={tv.id} item={tv} />
          ))}
      </div>

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

export default MediaList;
