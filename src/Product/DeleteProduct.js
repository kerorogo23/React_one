import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DeleteProduct() {
  const [productId, setProductId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const checkProductExistence = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${productId}`);
      return response.data ? true : false;
    } catch (error) {
      console.error('Error fetching product:', error);
      return false;
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    setSuccess(false);
    setNotFound(false);

    const productExists = await checkProductExistence();

    if (!productExists) {
      setNotFound(true);
      setIsDeleting(false);
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/products/${productId}`);
      console.log('Product deleted:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('刪除失敗，請重試。');  //未輸入東西(空值)。
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h4 style={{ textAlign: 'center' }}><Link to="/home">商品管理</Link></h4>
      <h2>刪除商品</h2>
      <label>
        商品ID：
        <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </label>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? '刪除中...' : '確認刪除'}
      </button>
      {notFound && <p style={{ color: 'red' }}>沒有該ID的商品</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>刪除成功！</p>}
    </div>
  );
}

export default DeleteProduct;
