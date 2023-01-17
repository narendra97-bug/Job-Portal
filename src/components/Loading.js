import React from 'react';
import GIF from './loading.gif'
function Loading() {
  return <div className='text-center my-3'>
      <img src={GIF} alt="loading..." />
  </div>;
}

export default Loading;
