import create from 'zustand';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '../firebase';
import { persist } from 'zustand/middleware';
import { doc, getDoc } from 'firebase/firestore';
type AuthState = {
  isLoggedIn: boolean;
  userEmail: string;
  userNickname: string;
  setIsLoggedIn: (loggedIn: boolean) => void; //isLoggedIn의 상태를 업데이트
  setUserEmail: (email: string) => void;
  setUserNickname: (nickname: string) => void;
  chkAuthState: () => void; //해당함수가 마운트될때 현재 사용자의 인증상태(로그인여부) 확인
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      userEmail: '',
      userNickname: '',
      setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setUserEmail: (email) => set({ userEmail: email }),
      setUserNickname: (nickname) => set({ userNickname: nickname }),
      chkAuthState: () => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, async (user) => {
          //getDoc이 비동기 함수기 때문에 async await사용
          if (user) {
            // Firestore에서 사용자 문서를 비동기적으로 가져옴
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              set({
                isLoggedIn: true,
                userEmail: user.email || '',
                userNickname: userData.nickname || ''
              });
            } else {
              set({
                isLoggedIn: true,
                userEmail: user.email || '',
                userNickname: ''
              });
            }
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
