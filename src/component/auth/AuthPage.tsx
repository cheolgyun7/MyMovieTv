import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import './auth.css';

const AuthPage: React.FC = () => {
  const [authId, setAuthId] = useState('');
  const [authPwd, setAuthPwd] = useState('');

  const onSubmit = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword();
    } catch (error) {
      console.error(error);
    }
    console.log(authId);
    console.log(authPwd);
  };

  return (
    <div className='authDiv' onSubmit={onSubmit}>
      <p>로고</p>
      <div className='authInput'>
        <label htmlFor='id'>id</label>
        <input
          id='id'
          type='text'
          placeholder='아이디'
          value={authId}
          onChange={(e) => setAuthId(e.target.value)}
        />
      </div>
      <div className='authInput'>
        <label htmlFor='pwd'>pwd</label>
        <input
          id='pwd'
          type='password'
          placeholder='비밀번호'
          value={authPwd}
          onChange={(e) => setAuthPwd(e.target.value)}
        />
      </div>
      <button type='button'>로그인</button>
    </div>
  );
};

export default AuthPage;
