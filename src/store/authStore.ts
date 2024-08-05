import create from 'zustand';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app, db } from '../firebase';
import { persist } from 'zustand/middleware';
import { doc, getDoc } from 'firebase/firestore';
type AuthState = {
  isLoggedIn: boolean;
  userEmail: string;
  userNickname: string;
  user: User | null;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUserEmail: (email: string) => void;
  setUserNickname: (nickname: string) => void;
  setUser: (user: User | null) => void;
  chkAuthState: () => void; //해당함수가 마운트될때 현재 사용자의 인증상태(로그인여부) 확인
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      userEmail: '',
      userNickname: '',
      user: null,
      setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setUserEmail: (email) => set({ userEmail: email }),
      setUserNickname: (nickname) => set({ userNickname: nickname }),
      setUser: (user) => set({ user }),
      chkAuthState: () => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              set({
                isLoggedIn: true,
                userEmail: user.email || '',
                userNickname: userData.nickname || '',
                user: user
              });
            } else {
              set({
                isLoggedIn: true,
                userEmail: user.email || '',
                userNickname: '',
                user: user
              });
            }
          } else {
            set({ isLoggedIn: false, userEmail: '', user: null });
          }
        });
      }
    }),
    {
      name: 'userLocalStorage'
    }
  )
);
