import React, { useState } from 'react';
import axios from 'axios';
import './CreateProduct.css';
import { Link } from 'react-router-dom';

function CreateProduct() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [creationStatus, setCreationStatus] = useState(null); // 追蹤創建的結果

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      category,
      imageUrl,
      price,
      stock,
      description,
    };

    try {
      const response = await axios.post('http://localhost:8080/products/', newProduct);
      console.log('Product created:', response.data);
      // 清空輸入欄位
      setProductName('');
      setCategory('');
      setImageUrl('');
      setPrice(0);
      setStock(0);
      setDescription('');
      setCreationStatus('success'); // 更新創建結果狀態為成功
    } catch (error) {
      console.error('Error creating product:', error);
      setCreationStatus('failure'); // 更新創建結果狀態為失敗
    }
  };

  return (
    <div className="container">
      <h4 style={{ textAlign: 'center' }}>
        <Link to="/home">商品管理</Link>
      </h4>
      <h1>創建商品</h1>
      {creationStatus === 'success' && <p style={{ color: 'green', fontWeight: 'bold', fontSize: '20px' }}>創建成功！</p>}
      {creationStatus === 'failure' && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>創建失敗！</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>商品名稱:</label>
          <input
            type="text"
            placeholder="必填"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>分類:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">選擇分類</option>
            <option value="FOOD">FOOD</option>
            <option value="CAR">CAR</option>
          </select>
        </div>
        <div>
          <label>圖片網址:</label>
          <input
            type="text"
            placeholder="必填"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label>價格:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label>庫存數量:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <div>
          <label>描述:</label>
          <textarea
            placeholder="可空白"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
}

export default CreateProduct;
