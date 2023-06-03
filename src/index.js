import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import RegisterForm from './User/RegisterForm';
import LoginForm from './User/LoginForm';

import Home from './Home';

import CreateProduct from './Product/CreateProduct';
import GetProduct from './Product/GetProduct';
import UpdateProduct from './Product/UpdateProduct';
import DeleteProduct from './Product/DeleteProduct';

import ProductList from './Product/ProductList';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/home" element={<Home />} />

        <Route path="/p-getProduct" element={<GetProduct />} />
        <Route path="/p-createProduct" element={<CreateProduct />} />
        <Route path="/p-updateProduct" element={<UpdateProduct />} />
        <Route path="/p-deleteProduct" element={<DeleteProduct />} />

        <Route path="/p-getProductList" element={<ProductList />} />
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();