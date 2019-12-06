import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { isAuthenticated, logoutUser, user } = authContext;
  const { clearProducts } = productContext;

  const onLogout = () => {
    logoutUser();
    clearProducts();
  };

  const authLinks = (
    <>
      <p className='ui teal' style={{ margin: 'auto 1rem' }}>
        Hello, {user && user.name}
      </p>
      <Link to='/create' className='item' style={{ color: '#2185d0' }}>
        Post a Deal
      </Link>
      <Link to='/' className='item' onClick={onLogout}>
        Logout
      </Link>
    </>
  );

  const guestLinks = (
    <>
      <Link to='/signup' className='item'>
        Sign Up
      </Link>
      <Link to='/signin' className='item'>
        Sign In
      </Link>
    </>
  );

  return (
    <div className='ui menu '>
      <Link to='/' className='item '>
        slickShop
      </Link>

      <div className='right menu'>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
};

export default Navbar;

// <div className='right menu'>
// <Link to='/detail' className='item'>
//   Product Details
// </Link>
// <Link to='/create' className='item' style={{ color: '#2185d0' }}>
//   Post a Deal
// </Link>
// <Link to='/signup' className='item'>
//   Sign Up
// </Link>
// <Link to='/signin' className='item'>
//   Sign In
// </Link>
// </div>
