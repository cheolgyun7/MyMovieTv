import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import './header.css';
import { useNavigate } from 'react-router-dom';

import { FaRegUser } from 'react-icons/fa';
import { TbTriangleInvertedFilled, TbTriangleFilled } from 'react-icons/tb';

const Header = () => {
  const { isLoggedIn, userNickname, setIsLoggedIn, setUserEmail } =
    useAuthStore();
  const auth = getAuth(app);
  const [myInfoToggle, setMyInfoToggle] = useState(false);

  const handleMyInfoToggle = () => {
    setMyInfoToggle(!myInfoToggle);
  };

  const navigate = useNavigate();
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
  const handleLogin = () => {
    navigate('/auth');
  };
  return (
    <header>
      {isLoggedIn ? (
        <>
          <span>{userNickname}님, 환영합니다</span>{' '}
          {myInfoToggle ? (
            <TbTriangleFilled onClick={handleMyInfoToggle} />
          ) : (
            <TbTriangleInvertedFilled onClick={handleMyInfoToggle} />
          )}
          {myInfoToggle && (
            <ul>
              <li>내 달력 보기</li>
              <li>내 정보 수정</li>
              <li>
                <a onClick={handleLogout}>로그아웃</a>
              </li>
            </ul>
          )}
        </>
      ) : (
        <div onClick={handleLogin}>
          <FaRegUser />
          로그인
        </div>
      )}
    </header>
  );
};

export default Header;
