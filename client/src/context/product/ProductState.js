import React, { useReducer } from 'react';
import axios from 'axios';

import ProductContext from './productContext';
import productReducer from './productReducer';

import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PRODUCT,
  FILTER_PRODUCT,
  CLEAR_FILTER,
  PRODUCT_ERROR,
  GET_ONE_PRODUCT,
  GET_PRODUCTS,
  CLEAR_PRODUCTS
} from '../types';

const ProductState = props => {
  const initialState = {
    product: null,
    products: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get one product
  const getOneProduct = async id => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      dispatch({ type: GET_ONE_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Get products
  const getProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Add product
  const addProduct = async product => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/products', product, config);
      dispatch({ type: ADD_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Update Product
  const updateProduct = async product => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );
      dispatch({ type: UPDATE_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Delete product
  const deleteProduct = async id => {
    try {
      await axios.delete(`/api/products/${id}`);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Edit Product
  // Set current product
  const setCurrent = product => {
    dispatch({ type: SET_CURRENT, payload: product });
  };

  // Clear current product
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Product
  const filterProduct = text => {
    dispatch({ type: FILTER_PRODUCT, payload: text });
  };

  // Clear Filter Product
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //Clear Products
  const clearProducts = () => {
    dispatch({ type: CLEAR_PRODUCTS });
  };
  return (
    <ProductContext.Provider
      value={{
        product: state.product,
        products: state.products,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addProduct,
        deleteProduct,
        updateProduct,
        setCurrent,
        clearCurrent,
        filterProduct,
        clearFilter,
        clearProducts,
        getProducts,
        getOneProduct
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
