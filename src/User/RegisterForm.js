import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css'; // 引入自定義的CSS樣式
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/register', {
        email,
        password
      });

      console.log(response.data); // 已註冊使用者的資訊
      navigate('/login'); // 導向登入頁面
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setError('注意：該信箱已經被註冊過');
      } else {
        setError('註冊失敗');
      }
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div>
        <h4><Link to="/">首頁</Link></h4>
        <h1>管理員註冊</h1>
        <p className="text">填寫信箱、密碼</p>
        <label>Email:</label>
        <input className="register-input" placeholder="ex：test100@gmail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input className="register-input" placeholder="密碼" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="register-button" type="submit">註冊</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default RegisterForm;
