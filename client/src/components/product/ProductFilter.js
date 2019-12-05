import React, { useContext, useRef, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';

const ProductFilter = () => {
  const productContext = useContext(ProductContext);

  const { filterProduct, clearFilter, filtered } = productContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  }, [filtered]);

  const onChange = e => {
    if (text.current.value !== null) {
      filterProduct(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className='ui container' style={{ marginTop: '2rem' }}>
      <div className='ui grid centered'>
        <form className='ui form thirteen wide mobile fourteen wide tablet sixteen wide computer column centered'>
          <div className='ui fluid icon input'>
            <input
              type='text'
              ref={text}
              name='title'
              placeholder='Search Products...'
              onChange={onChange}
            />
            <i className='search icon' />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductFilter;
