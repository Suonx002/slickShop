import React from 'react';

const Spinner = () => {
  return (
    <div className='ui icon message'>
      <i className='notched circle loading icon'></i>
      <div className='content'>
        <div className='header'>Just one second</div>
        <p>We're fetching that content for you.</p>
      </div>
    </div>
  );
};

export default Spinner;
