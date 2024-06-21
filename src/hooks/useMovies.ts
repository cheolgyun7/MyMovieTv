// src/hooks/useMovies.ts
import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../api/tmdb';
import { Movie, TV } from '../types/Movie';

const fetchMovies = async (page: number): Promise<Movie[]> => {
  const { data } = await tmdbApi.get('/discover/movie', {
    params: {
      page: page,
    },
  });
  return data.results;
};

const fetchTV = async (page: number): Promise<TV[]> => {
  const { data } = await tmdbApi.get('/discover/tv', {
    params: {
      page: page,
      language: 'ko-KR',
      sort_by: 'popularity.desc',
      with_watch_providers: '337,8', // Netflix and Disney+
      watch_region: 'KR', // Korea region
    },
  });
  return data.results;
};

export const useMovies = (page: number) => {
  return useQuery<Movie[], Error>({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page)
  });
};

export const useTv = (page: number) => {
  return useQuery<TV[], Error>({
    queryKey: ['tv', page],
    queryFn: () => fetchTV(page)
  });
};