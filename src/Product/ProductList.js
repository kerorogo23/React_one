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

  const handleShowProductDetails = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <div>
      <h4 style={{ textAlign: 'center' }}><Link to="/home">商品管理</Link></h4>
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
            <div>
              <img src={product.imageUrl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>類別：{product.category}</p>
              <p>價格：{product.price}</p>
              <p>庫存：{product.stock}</p>git status
              <button onClick={() => handleShowProductDetails(product.productId)}>
                商品詳細
              </button>
              {selectedProductId === product.productId && (
                <div className="product-details">
                  <p>商品ID：{product.productId}</p>
                  <p>商品名稱：{product.productName}</p>
                  <p>類別：{product.category}</p>
                  <p>圖片URL：{product.imageUrl}</p>
                  <p>價格：{product.price}</p>
                  <p>庫存：{product.stock}</p>
                  <p>描述：{product.description}</p>
                  <p>創建日期：{product.createdDate}</p>
                  <p>最後修改日期：{product.lastModifiedDate}</p>
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
