import create from 'zustand';

type MovieStore = {
  favoriteMovies: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isToggle: boolean;
  setIsToggle: (id: boolean) => void;
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
  setIsToggle: (toggle) => set({ isToggle: toggle })
}));

export default useMovieStore;
