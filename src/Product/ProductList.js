import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  },);

  const fetchProducts = () => {
    const params = {
      category: selectedCategory,
      search: searchText,
      limit: 5,
      offset: (currentPage - 1) * 5,
    };

    axios
      .get('http://localhost:8080/products', { params })
      .then((response) => {
        const data = response.data;
        setProducts(data.results);
        setTotalPages(Math.ceil(data.total / 5));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleProductDetails = (productId) => {
    if (selectedProductId === productId) {
      setSelectedProductId(null);
    } else {
      setSelectedProductId(productId);
    }
  };

  return (
    <div className="background">
      <h4 style={{ textAlign: 'center' }}>
        <Link to="/home">商品管理</Link>
      </h4>
      <h2 style={{ textAlign: 'center' }}>商品列表</h2>
      <div>
        <label htmlFor="category">類別：</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">全部</option>
          <option value="FOOD">FOOD</option>
          <option value="CAR">CAR</option>
        </select>
      </div>
      <div>
        <label htmlFor="searchText">搜尋：</label>
        <input type="text" id="searchText" value={searchText} onChange={handleSearchTextChange} />
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.productId} className="product-item">
            <div className="background-form">
              <img src={product.imageUrl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p style={{ marginLeft: '30px', color: 'red' }}>商品ID：{product.productId}</p>
              <p style={{ marginLeft: '30px' }}>類&nbsp;&nbsp;&nbsp;別：{product.category}</p>
              <p style={{ marginLeft: '30px' }}>價&nbsp;&nbsp;&nbsp;格：{product.price}</p>
              <p style={{ marginLeft: '30px', color: 'blue' }}>庫&nbsp;&nbsp;&nbsp;存：{product.stock}</p>
              <button onClick={() => handleToggleProductDetails(product.productId)}>
                {selectedProductId === product.productId ? '關閉詳細' : '展開詳細'}
              </button>
              {selectedProductId === product.productId && (
                <div className="product-details">
                  <p style={{ marginLeft: '10px', color: 'red' }}>商品ID：{product.productId}</p>
                  <p style={{ marginLeft: '10px' }}>商品名稱：{product.productName}</p>
                  <p style={{ marginLeft: '10px' }}>類&nbsp;&nbsp;&nbsp;別：{product.category}</p>
                  <p style={{ marginLeft: '10px' }}>圖片_URL：{product.imageUrl}</p>
                  <p style={{ marginLeft: '10px' }}>價&nbsp;&nbsp;&nbsp;格：{product.price}</p>
                  <p style={{ marginLeft: '10px', color: 'blue' }}>庫&nbsp;&nbsp;&nbsp;存：{product.stock}</p>
                  <p style={{ marginLeft: '10px' }}>描&nbsp;&nbsp;&nbsp;述：{product.description}</p>
                  <p style={{ marginLeft: '10px' }}>創建日期：{product.createdDate}</p>
                  <p style={{ marginLeft: '10px' }}>最後_修改日期：{product.lastModifiedDate}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
