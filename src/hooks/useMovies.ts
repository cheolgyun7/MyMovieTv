import { useInfiniteQuery } from '@tanstack/react-query';
import tmdbApi from '../api/tmdb';
import { Media } from '../types/Media';

const fetchMovies = async ({
  pageParam = 1
}: {
  pageParam?: number;
}): Promise<{ results: Media[]; nextPage: number | null }> => {
  const { data } = await tmdbApi.get('/discover/movie', {
    params: {
      page: pageParam
    }
  });
  return {
    results: data.results,
    nextPage: data.page < data.total_pages ? pageParam + 1 : null
  };
};

const fetchTV = async ({
  pageParam = 1
}: {
  pageParam?: number;
}): Promise<{ results: Media[]; nextPage: number | null }> => {
  const { data } = await tmdbApi.get('/discover/tv', {
    params: {
      page: pageParam,
      language: 'ko-KR',
      sort_by: 'popularity.desc',
      with_watch_providers: '337,8', // Netflix and Disney+
      watch_region: 'KR' // Korea region
    }
  });
  return {
    results: data.results,
    nextPage: data.page < data.total_pages ? pageParam + 1 : null
  };
};

export const useInfiniteMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1 // 추가된 부분
  });
};

export const useInfiniteTv = () => {
  return useInfiniteQuery({
    queryKey: ['tv'],
    queryFn: fetchTV,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1 // 추가된 부분
  });
};
