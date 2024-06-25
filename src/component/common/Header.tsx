import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import { FaRegUser } from 'react-icons/fa';

const Header = () => {
  const { isLoggedIn, userEmail, setIsLoggedIn, setUserEmail } = useAuthStore();
  const auth = getAuth(app);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false); // 로그아웃 시 isLoggedIn 상태 변경
        setUserEmail(''); // 사용자 이메일 초기화
        localStorage.removeItem('userLocalStorage'); // localStorage 초기화
      })
      .catch((error) => {
        console.error('로그아웃 에러:', error);
      });
  };
  return (
    <div>
      <p>{userEmail}</p>
      {isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <div>
          <FaRegUser />
          로그인
        </div>
      )}
    </div>
  );
};

export default Header;
