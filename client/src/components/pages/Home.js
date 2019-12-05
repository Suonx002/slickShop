import React, { useContext, useEffect } from 'react';

import Products from '../product/Products';
import ProductFilter from '../product/ProductFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <ProductFilter />
      <Products />
    </div>
  );
};

export default Home;
