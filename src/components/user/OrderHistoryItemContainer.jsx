import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';

const OrderHistoryItemContainer = ({ orderitems }) => {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-12">
          {/* Header Card */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-0">Order History</h5>
            </div>
          </div>
          {/* scrollable  */}
          <div
            style={{
              maxHeight: '600px',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {orderitems.map((item) => (
              <OrderHistoryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;
