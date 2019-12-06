import React, { useContext, useEffect } from 'react';

import Products from '../product/Products';
import ProductFilter from '../product/ProductFilter';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { products, loading } = productContext;

  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {products !== null && products.length !== 0 && !loading ? (
        <>
          <ProductFilter />
          <Products />
        </>
      ) : (
        <Products />
      )}
    </>
  );
};

export default Home;
