import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { app, db } from '../../firebase';
import './auth.css';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [authId, setAuthId] = useState('');
  const [authPwd, setAuthPwd] = useState('');
  const [authchkPwd, setAuthchkPwd] = useState('');
  const [isRegister, setIsRegister] = useState(false); //false면 로그인 true면 회원가입

  const { isLoggedIn, userEmail, setUserEmail, setIsLoggedIn, chkAuthState } =
    useAuthStore();
  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    chkAuthState();
  }, [chkAuthState]);

  const handleToggleRegister = () => {
    setIsRegister(!isRegister);
  };

  console.log(chkAuthState);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (authPwd !== authchkPwd) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      try {
        const newUser = await createUserWithEmailAndPassword(
          auth,
          authId,
          authPwd
        );
        console.log('회원가입성공', newUser);
        await setDoc(doc(db, 'users', newUser.user.uid), {
          email: authId,
          createdAt: new Date().toISOString()
        });
        alert('회원가입성공');
      } catch (error) {
        console.log('11!!');
        console.error(error);
      }
    } else {
      try {
        const newUser = await signInWithEmailAndPassword(auth, authId, authPwd);
        console.log('로그인성공', newUser);
        setIsLoggedIn(true);
        setUserEmail(authId);
        navigate('/');
      } catch (error) {
        console.log('????');
        console.error(error);
      }
    }
  };

  return (
    <form className='authDiv' onSubmit={onSubmit}>
      <p>로고</p>
      <div className='authInput'>
        <label htmlFor='id'>아이디</label>
        <input
          id='id'
          type='text'
          placeholder='아이디'
          value={authId}
          onChange={(e) => setAuthId(e.target.value)}
        />
      </div>
      <div className='authInput'>
        <label htmlFor='pwd'>비밀번호</label>
        <input
          id='pwd'
          type='password'
          placeholder='비밀번호'
          value={authPwd}
          onChange={(e) => setAuthPwd(e.target.value)}
        />
      </div>
      {isRegister && (
        <div className='authInput'>
          <label htmlFor='pwdchk'>비밀번호확인</label>
          <input
            id='pwdchk'
            type='password'
            placeholder='비밀번호확인'
            value={authchkPwd}
            onChange={(e) => setAuthchkPwd(e.target.value)}
          />
        </div>
      )}
      <button className='loginBtn' type='submit'>
        {isRegister === false ? '로그인' : '회원가입'}
      </button>
      <span onClick={handleToggleRegister}>
        {isRegister === false ? '회원가입으로' : '로그인으로'}
      </span>
    </form>
  );
};

export default AuthPage;
