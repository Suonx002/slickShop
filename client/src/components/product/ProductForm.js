import React, { useState, useContext, useEffect } from 'react';

import ProductContext from '../../context/product/productContext';
import AlertContext from '../../context/alert/alertContext';

const ProductForm = props => {
  const productContext = useContext(ProductContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { addProduct, updateProduct, current, clearCurrent } = productContext;

  useEffect(() => {
    if (current !== null) {
      setProduct(current);
    } else {
      //clear product
      setProduct({
        title: '',
        description: '',
        imageUrl: '',
        brand: '',
        website: '',
        originalPrice: '',
        discountPrice: ''
      });
    }
  }, [productContext, current]);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    imageUrl: '',
    brand: '',
    website: '',
    originalPrice: '',
    discountPrice: ''
  });

  const {
    title,
    description,
    imageUrl,
    brand,
    website,
    originalPrice,
    discountPrice
  } = product;

  const clearAll = () => {
    clearCurrent();
  };

  const onChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (
      title !== '' &&
      description !== '' &&
      imageUrl !== '' &&
      brand !== '' &&
      website !== '' &&
      originalPrice !== '' &&
      discountPrice !== ''
    ) {
      if (current === null) {
        //replace https://www. to nothing
        website.replace(/[https://www.]/gi, '');

        addProduct(product);
        props.history.push('/');
      } else {
        updateProduct(product);
        props.history.push('/');
      }
      //clear product
      clearAll();
    } else {
      setAlert('Please fill all fields', 'red');
    }
  };

  const onClear = () => {
    clearAll();
    props.history.push('/');
  };

  return (
    <div className='ui container '>
      <h3
        className='ui header center aligned blue'
        style={{ margin: '2rem 0' }}>
        {current === null ? 'Create Product' : 'Edit Product'}
      </h3>
      <div className='ui grid centered'>
        <form
          className='ui form fourteen wide mobile twelve wide tablet eight wide computer column centered segment'
          onSubmit={onSubmit}>
          <div className='field'>
            <input
              type='text'
              name='title'
              placeholder='Product Title'
              value={title}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='text'
              name='description'
              placeholder='Product Description'
              value={description}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='text'
              name='imageUrl'
              placeholder='Product Image Url'
              value={imageUrl}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='text'
              name='brand'
              placeholder='Website Title'
              value={brand}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='text'
              name='website'
              placeholder='Website Product Link'
              value={website}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='text'
              name='originalPrice'
              placeholder='Original Price'
              value={originalPrice}
              onChange={onChange}
            />
          </div>
          <div className='field'>
            <input
              type='text'
              name='discountPrice'
              placeholder='Discount Price'
              value={discountPrice}
              onChange={onChange}
            />
          </div>

          <button type='submit' className='ui blue fluid button'>
            {current === null ? 'Add Product' : 'Update Product'}
          </button>

          {current && (
            <button
              className='ui fluid yellow button'
              style={{ marginTop: '1rem' }}
              onClick={onClear}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
