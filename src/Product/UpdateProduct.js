import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './UpdateProduct.css';
import { Link } from 'react-router-dom';

function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchProduct = useCallback(async () => {
    setIsFetching(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/products/${productId}`);
      const product = response.data;
      setProductName(product.productName);
      setCategory(product.category);
      setImageUrl(product.imageUrl);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(<p style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>商品查詢失敗，請重試。</p>);
    } finally {
      setIsFetching(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.put(`http://localhost:8080/products/${productId}`, {
        productName,
        category,
        imageUrl,
        price,
        stock,
        description
      });
      console.log('Product updated:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error updating product:', error);
      setError(<p style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>商品修改失敗，請重試。</p>);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="a">
      <h4 style={{ textAlign: 'center' }}><Link to="/home">商品管理</Link></h4>
      <h1>修改商品</h1>
      <form onSubmit={handleSubmit}>
        <label>
          商品&nbsp;&nbsp;I&nbsp;D：
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <>
            <label>
              商品名稱：
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </label>
            <label>
              分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;類：
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </label>
            <label>
              圖片網址：
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
              價&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
              庫存數量：
              <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
            </label>
            <label>
              描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：
              <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '提交中...' : '確認修改'}
            </button>
            {error && <p>{error}</p>}
            {success && <p style={{ color: 'green', fontWeight: 'bold', fontSize: '30px' }}>修改成功!!</p>}
          </>
        )}
      </form>
    </div>
  );
}

export default UpdateProduct;
