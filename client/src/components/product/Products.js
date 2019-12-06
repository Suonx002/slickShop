import React, { useContext, useEffect } from 'react';
import Spinner from '../layout/Spinner';

import ProductItem from './ProductItem';
import ProductContext from '../../context/product/productContext';

const Products = () => {
  const productContext = useContext(ProductContext);

  const { products, filtered, getProducts, loading } = productContext;

  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, []);

  if (products !== null && products.length === 0 && !loading) {
    return (
      <div className='ui container' style={{ marginTop: '2rem' }}>
        <div className='ui segment'>
          <h4 className='ui header'>Please create a post!</h4>
        </div>
      </div>
    );
  }

  return (
    <div className='ui container' style={{ marginTop: '2rem' }}>
      <h1 className='header'>Featured Deals</h1>
      {products !== null && !loading ? (
        <div className='ui centered grid segment'>
          {filtered !== null
            ? filtered.map(product => (
                <div
                  className='sixteen wide mobile five wide tablet four wide computer column'
                  key={product._id}>
                  <ProductItem product={product} />
                </div>
              ))
            : products.map(product => (
                <div
                  className='sixteen wide mobile eight wide tablet four wide computer column'
                  key={product._id}>
                  <ProductItem product={product} />
                </div>
              ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;
