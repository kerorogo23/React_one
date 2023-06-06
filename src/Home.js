import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {

    const navigate = useNavigate(); // 建立 navigate 函式

    const handleLogout = () => {
        // 執行登出相關的邏輯，例如清除用戶資訊、驗證狀態等

        // 轉換至登入頁面
        navigate('/');
    };

    return (
        <div className="app-container">
            <h1 className="app-heading">101書城後台</h1>
            <nav className="app-nav">
                <ul className="app-nav-list">

                    <li className="app-nav-item">
                        <button onClick={handleLogout} className="app-nav-link">登出</button> {/* 修改：使用 button 元素處理登出事件 */}
                    </li>

                    <li className="app-nav-item">
                        <Link to="/p-createProduct" className="app-nav-link">創建商品</Link>
                    </li>
                    <li className="app-nav-item">
                        <Link to="/p-getProduct" className="app-nav-link">查詢商品</Link>
                    </li>

                    <li className="app-nav-item">
                        <Link to="/p-updateProduct" className="app-nav-link">修改商品</Link>
                    </li>
                    <li className="app-nav-item">
                        <Link to="/p-deleteProduct" className="app-nav-link">刪除商品</Link>
                    </li>

                    <li className="app-nav-item">
                        <Link to="/p-getProductList" className="app-nav-links">商品列表</Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}

export default Home;
