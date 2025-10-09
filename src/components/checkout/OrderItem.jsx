import React from 'react';
import { BASE_URL } from '../../api';

const OrderItem = ({ item }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3"
      style={{ padding: '10px' }}
    >
      <div className="d-flex align-items-center">
        <img
          src={`${BASE_URL}/${item?.product?.image}`}
          alt={item?.product?.name || 'Product'}
          className="img-fluid"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '5px',
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
