import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProductContext from '../../context/product/productContext';
import Spinner from '../layout/Spinner';

const ProductDetail = props => {
  const productContext = useContext(ProductContext);

  const { product, getOneProduct, loading, clearProducts } = productContext;

  useEffect(() => {
    clearProducts();
    getOneProduct(props.match.params.id);
    //eslint-disable-next-line
  }, []);

  return (
    <div className='ui container ' style={{ marginTop: '4rem' }}>
      {product !== null && !loading ? (
        product.map(p => (
          <div className='ui grid centered segment' key={p._id}>
            <div className='fourteen wide mobile eight six tablet eight wide computer column centered '>
              <h2 className='ui header center aligned'>{p.title}</h2>
              <h4 className='ui sub header center aligned'>{p.brand}</h4>
              <h5 className='ui sub header center aligned'>{p.description}</h5>
            </div>
            <div className='fourteen wide mobile eight six tablet eight wide computer column centered'>
              <div className='ui card centered '>
                <div className='image'>
                  <img
                    className='ui centered small image'
                    src={p.imageUrl}
                    alt={p.title}
                    style={{
                      width: '291px',
                      height: '200px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                <Link
                  to={`//${p.website}`}
                  target='_blank'
                  className='ui blue fluid button'>
                  See Deals
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProductDetail;
