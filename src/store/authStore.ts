import create from 'zustand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import { persist } from 'zustand/middleware';
type AuthState = {
  isLoggedIn: boolean;
  userEmail: string;
  userNickname: string | null;
  setIsLoggedIn: (loggedIn: boolean) => void; //isLoggedIn의 상태를 업데이트
  setUserEmail: (email: string) => void;
  setUserNickname: (nickname: string | null) => void;
  chkAuthState: () => void; //해당함수가 마운트될때 현재 사용자의 인증상태(로그인여부) 확인
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      userEmail: '',
      userNickname: null,
      setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setUserEmail: (email) => set({ userEmail: email }),
      setUserNickname: (nickname) => set({ userNickname: nickname }),
      chkAuthState: () => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            set({ isLoggedIn: true, userEmail: user.email || '' });
          } else {
            set({ isLoggedIn: false, userEmail: '' });
          }
        });
      }
    }),
    {
      name: 'userLocalStorage'
    }
  )
);
