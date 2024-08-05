import create from 'zustand';
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { Media } from '../types/Media';
import { useAuthStore } from './authStore';

type MovieStore = {
  isToggle: boolean;
  setIsToggle: (id: boolean) => void;
  cart: Media[];
  addToCart: (movie: Media) => void;
  removeFromCart: (id: number) => void;
};

type SearchStore = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useMovieStore = create<MovieStore & SearchStore>((set) => ({
  isToggle: true,
  setIsToggle: (toggle) => set({ isToggle: toggle }),
  searchQuery: '', // 추가된 부분
  setSearchQuery: (query) => set({ searchQuery: query }), // 추가된 부분
  cart: [],
  addToCart: async (movie) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      console.error('User not logged in');
      alert('로그인해야 장바구니에 추가할 수 있습니다.');
      return;
    }

    set((state) => ({ cart: [...state.cart, { ...movie, userId: user.uid }] }));
    try {
      await addDoc(collection(db, 'cart'), { ...movie, userId: user.uid });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  },
  removeFromCart: async (id) => {
    set((state) => ({ cart: state.cart.filter((movie) => movie.id !== id) }));
    try {
      const q = query(collection(db, 'cart'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  }
}));

export const useStore = create<SearchStore>((set) => ({
  searchQuery: '', //초기 검색어 상태
  setSearchQuery: (query) => set({ searchQuery: query }) // 검색어 설정 함수
}));
