import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import './header.css';
import { useNavigate } from 'react-router-dom';

import { TbTriangleInvertedFilled, TbTriangleFilled } from 'react-icons/tb';
import SearchInput from './SearchInput';

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
    const confirmLogout = window.confirm('로그아웃을 진행하시겠습니까?');
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          setIsLoggedIn(false); // 로그아웃 시 isLoggedIn 상태 변경
          setUserEmail(''); // 사용자 이메일 초기화
          localStorage.removeItem('userLocalStorage'); // localStorage 초기화
        })
        .catch((error) => {
          console.error('로그아웃 에러:', error);
        });
    }
  };
  const handleLogin = () => {
    navigate('/auth');
  };
  const handleMypage = (menu: string) => {
    if (menu === 'mycalendar') {
      navigate('/mycalendar');
    } else {
      navigate('/mypage');
    }
    setMyInfoToggle(!myInfoToggle);
  };
  return (
    <header>
      <div className='logoDiv'>
        <div>로고</div>
      </div>
      <SearchInput />
      {isLoggedIn ? (
        <div className='user_Info'>
          <span>{userNickname}님, 환영합니다</span>{' '}
          {myInfoToggle ? (
            <TbTriangleFilled onClick={handleMyInfoToggle} />
          ) : (
            <TbTriangleInvertedFilled onClick={handleMyInfoToggle} />
          )}
          {myInfoToggle && (
            <ul className='dropdown-menu'>
              <li
                className='link_Button'
                onClick={() => handleMypage('mycalendar')}>
                내 달력 보기
              </li>
              <li
                className='link_Button'
                onClick={() => handleMypage('mypage')}>
                내 정보 수정
              </li>
              <li onClick={handleLogout} className='link_Button'>
                로그아웃
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className='user_Info' onClick={handleLogin}>
          <span className='loginBtn'>로그인</span>
        </div>
      )}
    </header>
  );
};

export default Header;
