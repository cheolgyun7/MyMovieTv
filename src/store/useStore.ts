import create from 'zustand';

type MovieStore = {
  favoriteMovies: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isToggle: boolean;
  setIsToggle: (id: boolean) => void;
};

type SearchStore = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useMovieStore = create<MovieStore>((set) => ({
  favoriteMovies: [],
  addFavorite: (id) =>
    set((state) => ({ favoriteMovies: [...state.favoriteMovies, id] })),
  removeFavorite: (id) =>
    set((state) => ({
      favoriteMovies: state.favoriteMovies.filter((movieId) => movieId !== id)
    })),
  isToggle: true,
  setIsToggle: (toggle) => set({ isToggle: toggle })
}));

export const useStore = create<SearchStore>((set) => ({
  searchQuery: '', //초기 검색어 상태
  setSearchQuery: (query) => set({ searchQuery: query }) // 검색어 설정 함수
}));
