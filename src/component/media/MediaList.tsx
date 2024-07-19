import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMovieStore, useStore } from '../../store/useStore';
import { useInfiniteMovies, useInfiniteTv } from '../../hooks/useMovies';
import { Media } from '../../types/Media';
import MediaItem from './MediaItem';
import './mediaList.css';

const MediaList: React.FC = () => {
  const queryClient = useQueryClient();
  const { searchQuery } = useStore();
  const { isToggle, setIsToggle } = useMovieStore();

  const {
    data: moviesData,
    isLoading: mIsLoading,
    isError: mIsError,
    fetchNextPage: fetchNextMoviesPage,
    hasNextPage: hasNextMoviesPage,
    isFetchingNextPage: isFetchingNextMoviesPage
  } = useInfiniteMovies();

  const {
    data: tvData,
    isLoading: tIsLoading,
    isError: tIsError,
    fetchNextPage: fetchNextTvPage,
    hasNextPage: hasNextTvPage,
    isFetchingNextPage: isFetchingNextTvPage
  } = useInfiniteTv();

  const handleToggleBtn = (id: boolean) => {
    setIsToggle(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 2
      ) {
        if (isToggle && hasNextMoviesPage) {
          fetchNextMoviesPage();
        } else if (!isToggle && hasNextTvPage) {
          fetchNextTvPage();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    isToggle,
    hasNextMoviesPage,
    fetchNextMoviesPage,
    hasNextTvPage,
    fetchNextTvPage
  ]);

  if (mIsLoading || tIsLoading) return <div>Loading...</div>;
  if (mIsError || tIsError) return <div>Error fetching media</div>;

  const allMovies = moviesData?.pages.flatMap((page) => page.results) ?? [];
  const allTvShows = tvData?.pages.flatMap((page) => page.results) ?? [];

  const filteredMovies = allMovies.filter((movie: Media) =>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTvShows = allTvShows.filter((tv: Media) =>
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
          filteredMovies.map((movie: Media) => (
            <MediaItem key={movie.id} item={movie} />
          ))}
        {!isToggle &&
          filteredTvShows.map((tv: Media) => (
            <MediaItem key={tv.id} item={tv} />
          ))}
      </div>
      <div className='loading'>
        {(isToggle && isFetchingNextMoviesPage) ||
        (!isToggle && isFetchingNextTvPage) ? (
          <div>Loading more...</div>
        ) : null}
      </div>
    </div>
  );
};

export default MediaList;
