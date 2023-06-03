import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // 引入自定義的 CSS 樣式表

function App() {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <ul className="app-nav-list">

          <li className="app-nav-item">
            <Link to="/" className="app-nav-link">後台畫面</Link>
          </li>

          <li className="app-nav-item">
            <Link to="/login" className="app-nav-link">登入</Link>
          </li>
          <li className="app-nav-item">
            <Link to="/register" className="app-nav-link">註冊</Link>
          </li>
        </ul>
      </nav>
      <h1 className="app-heading">101書城後台</h1>
      {/* 在此加入其他頁面內容或元件 */}
    </div>
  );
}

export default App;
