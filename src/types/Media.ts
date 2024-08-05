export type Media = {
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows
  overview: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  // 필요한 다른 필드들을 추가하세요
  vote_average: number;
  userId?: string;
};
