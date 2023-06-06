import React, { useState } from 'react';
import axios from 'axios';
import './GetProduct.css';
import { Link } from 'react-router-dom';

function GetProduct() {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [notFound, setNotFound] = useState(false); // 追蹤是否找到商品

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://localhost:8080/products/${productId}`);
      setProduct(response.data);
      setNotFound(false); // 重置為找到商品的狀態
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
      setNotFound(true); // 設置為未找到商品的狀態
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="product-container">
      <h4 style={{ textAlign: 'center' }}>
        <Link to="/home">商品管理</Link>
      </h4>
      <h1>查詢產品資訊</h1>
      <form onSubmit={handleSubmit}>
        <label>
          產品ID:
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <button type="submit">查詢</button>
      </form>
      {isFetching ? (
        <p>Loading...</p>
      ) : notFound ? (
        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>沒有該ID的商品</p>
      ) : product ? (
        <div className="product-details">
          <p>產品ID: {product.productId}</p>
          <p>產品名稱: {product.productName}</p>
          <p>分類: {product.category}</p>
          <p>
            <img src={product.imageUrl} alt="" style={{ width: '200px', height: 'auto' }} />
          </p>
          <p>價格: {product.price}</p>
          <p>庫存數量: {product.stock}</p>
          <p>描述: {product.description}</p>
          <p>創建日期: {product.createdDate}</p>
          <p>最後修改日期: {product.lastModifiedDate}</p>
        </div>
      ) : (
        <p>請輸入產品ID以查詢</p>
      )}
    </div>
  );
}

export default GetProduct;
