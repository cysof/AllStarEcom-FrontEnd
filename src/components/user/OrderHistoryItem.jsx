import React from 'react';
import styles from './OrderHistoryItem.module.css';

const OrderHistoryItem = ({ order }) => {
  // Default/fallback values if no order prop is passed
  const {
    productName = 'Product Name',
    productImage = 'assets/laptop.jpg',
    orderDate = 'N/A',
    orderId = 'N/A',
    quantity = 1,
    price = 0,
    status = 'Pending',
  } = order || {};

  // Format price
  const formattedPrice = `$${parseFloat(price).toFixed(2)}`;

  // Format date if it's a valid date string
  const formattedDate =
    orderDate !== 'N/A'
      ? new Date(orderDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : orderDate;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className={`order-item ${styles.orderItem}`}>
          <div className="row align-items-center">
            {/* Product Image */}
            <div className="col-md-2 col-sm-3 mb-3 mb-md-0">
              <img
                src={productImage}
                alt={productName}
                className={`img-fluid ${styles.productImage}`}
              />
            </div>

            {/* Product Details */}
            <div className="col-md-4 col-sm-9 mb-3 mb-md-0">
              <h6 className={styles.productName}>{productName}</h6>
              <p className="text-muted mb-1">
                <small>Order Date: {formattedDate}</small>
              </p>
              <p className="text-muted mb-1">
                <small>Order ID: {orderId}</small>
              </p>
              <span
                className={`badge ${styles.statusBadge} ${
                  styles[status.toLowerCase()]
                }`}
              >
                {status}
              </span>
            </div>

            {/* Quantity */}
            <div className="col-md-2 col-4 text-center mb-2 mb-md-0">
              <p className="text-muted mb-0">
                <small>Quantity</small>
              </p>
              <h6 className={styles.quantity}>{quantity}</h6>
            </div>

            {/* Price */}
            <div className="col-md-2 col-4 text-center mb-2 mb-md-0">
              <p className="text-muted mb-0">
                <small>Price</small>
              </p>
              <h6 className={styles.price}>{formattedPrice}</h6>
            </div>

            {/* Actions */}
            <div className="col-md-2 col-4 text-center">
              <button
                className={`btn btn-sm btn-outline-primary ${styles.actionBtn}`}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
