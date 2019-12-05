import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProductContext from '../../context/product/productContext';

const ProductItem = ({ product }) => {
  const productContext = useContext(ProductContext);

  const {
    getOneProduct,
    setCurrent,
    clearCurrent,
    deleteProduct
  } = productContext;

  const {
    _id,
    imageUrl,
    title,
    brand,
    description,
    originalPrice,
    discountPrice
  } = product;

  const onEdit = () => {
    setCurrent(product);
  };
  const viewDetail = () => {
    getOneProduct(_id);
  };

  const onDelete = () => {
    deleteProduct(_id);
    clearCurrent();
  };

  return (
    <div className='ui card centered '>
      <div className='image'>
        <img
          className='ui centered small image'
          src={imageUrl}
          alt={title}
          style={{ width: '200px', height: '200px', objectFit: 'contain' }}
        />
      </div>
      <div className='content' style={{ height: '200px' }}>
        <h3 className='header'>{title}</h3>
        <div className='meta'>
          <span className='date'>{brand}</span>
        </div>
        <div
          className='description'
          style={{ height: '100px', overflow: 'hidden' }}>
          {description}
        </div>
      </div>
      <div className='extra content'>
        <span>
          <span style={{ textDecoration: 'line-through' }}>
            {`$${originalPrice}`}
          </span>{' '}
          <span style={{ color: '#db2828' }}>{`$${discountPrice}`}</span>
        </span>
      </div>
      <div className='extra content'>
        <Link to='/create'>
          <button
            className='ui basic yellow button left floated mini'
            onClick={onEdit}>
            <i className='edit icon' /> Edit
          </button>
        </Link>
        <button
          className='ui basic red button right floated mini'
          onClick={onDelete}>
          <i className='trash icon' /> Delete
        </button>
      </div>
      <div className='extra content'>
        <Link to={`/products/${_id}`}>
          <button onClick={viewDetail} className='ui fluid blue button'>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductItem;
