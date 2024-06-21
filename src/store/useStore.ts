import create from 'zustand';

interface MovieStore {
  favoriteMovies: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  favoriteMovies: [],
  addFavorite: (id) => set((state) => ({ favoriteMovies: [...state.favoriteMovies, id] })),
  removeFavorite: (id) => set((state) => ({ favoriteMovies: state.favoriteMovies.filter((movieId) => movieId !== id) })),
}));

export default useMovieStore;
