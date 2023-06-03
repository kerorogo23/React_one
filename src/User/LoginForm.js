import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // 引入自定義的 CSS 樣式表
import { Link, useNavigate } from 'react-router-dom';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password
      });

      console.log(response.data); // 登入成功後的使用者資訊
      navigate('/home'); // 導向 Home.js
    } catch (error) {
      console.error(error);
      // 在此處處理登入失敗的情況，例如顯示錯誤訊息
    }
  };



  return (

    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <h4><Link to="/">首頁</Link></h4>
        <h1>登入</h1>
        <label>Email:</label>
        <input type="email" placeholder="輸入您的信箱" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" placeholder="輸入您的密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="submit-button">登入</button>
    </form>
  );
}

export default LoginForm;
