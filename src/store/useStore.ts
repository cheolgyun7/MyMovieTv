import create from 'zustand';

type MovieStore = {
  favoriteMovies: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isToggle: boolean;
  toggleCategory: () => void;
};

const useMovieStore = create<MovieStore>((set) => ({
  favoriteMovies: [],
  addFavorite: (id) =>
    set((state) => ({ favoriteMovies: [...state.favoriteMovies, id] })),
  removeFavorite: (id) =>
    set((state) => ({
      favoriteMovies: state.favoriteMovies.filter((movieId) => movieId !== id)
    })),
  isToggle: true,
  toggleCategory: () => set((state) => ({ isToggle: !state.isToggle }))
}));

export default useMovieStore;
