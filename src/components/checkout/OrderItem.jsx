import React from 'react';

const OrderItem = ({ item }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3"
      style={{ padding: '10px' }}
    >
      <div className="d-flex align-items-center">
        <img
          src={
            item?.product?.thumbnail_url ||
            item?.product?.image_url ||
            'https://dummyimage.com/60x60/dee2e6/6c757d.jpg'
          }
          alt={item?.product?.name || 'Product'}
          className="img-fluid"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://dummyimage.com/60x60/dee2e6/6c757d.jpg';
          }}
        />
        <div className="ms-3">
          <h6 className="mb-0">{item?.product?.name || 'Product Name'}</h6>
          <small>Quantity: {item?.quantity || 1}</small>
        </div>
      </div>
      <h6>${item?.total?.toFixed(2) || '0.00'}</h6>
    </div>
  );
};

export default OrderItem;
