import React from 'react';
import styles from './OrderHistoryItem.module.css';
import { FormatDate } from '../../FormatDate';

const OrderHistoryItem = ({ item }) => {
  return (
    <div className="card-body">
      <div className={`order-item mb-3 ${styles.orderItem}`}>
        <div className="row">
          <div className="col-md-2">
            <img
              src={
                item.product.medium_image_url ||
                item.product.thumbnail_url ||
                item.product.image_url ||
                'https://dummyimage.com/200x200/dee2e6/6c757d.jpg'
              }
              alt={item.product.name || 'Order Item'}
              className="img-fluid"
              style={{ borderRadius: '5px' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://dummyimage.com/200x200/dee2e6/6c757d.jpg';
              }}
            />
          </div>
          <div className="col-md-6">
            <h6>{item.product.name}</h6>
            <p>{`Order Date: ${FormatDate(item.order_date)}`}</p>
            <p>{`Order ID: ${item.order_id}`}</p>
          </div>
          <div className="col-md-2 text-center">
            <h6 className="text-muted">{`Quantity: ${item.quantity}`}</h6>
          </div>
          <div className="col-md-2 text-center">
            <h6 className="text-muted">{`Price: $${item.product.price}`}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
