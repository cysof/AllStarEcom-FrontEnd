import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import Spinner from '../ui/Spinner';
import {
  FaCheckCircle,
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaHome,
} from 'react-icons/fa';
import { TbPackage } from 'react-icons/tb';
import './OrderPage.css';

const OrderPage = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState(null);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`orders/${orderNumber}/`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order:', err);
        const errorMsg =
          err.response?.data?.error || 'Failed to load order details';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  // Handle payment initiation
  const handlePayment = async () => {
    try {
      setProcessingPayment(true);

      const response = await api.post(`orders/${orderNumber}/pay/`);

      if (response.data && response.data.data && response.data.data.link) {
        // Redirect to Flutterwave payment page
        window.location.href = response.data.data.link;
      } else {
        throw new Error('No payment link received');
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      const errorMsg =
        err.response?.data?.error ||
        'Failed to initiate payment. Please try again.';
      toast.error(errorMsg);
    } finally {
      setProcessingPayment(false);
    }
  };

  // Handle order cancellation
  const handleCancelOrder = async () => {
    if (
      !window.confirm(
        'Are you sure you want to cancel this order? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      const response = await api.post(`orders/${orderNumber}/cancel/`);

      toast.success(response.data.message || 'Order cancelled successfully');
      setOrder((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
    } catch (err) {
      console.error('Error cancelling order:', err);
      const errorMsg = err.response?.data?.error || 'Failed to cancel order';
      toast.error(errorMsg);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Status badges
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: 'warning',
        text: 'Pending Payment',
        icon: <FaCreditCard className="me-1" />,
      },
      processing: {
        color: 'info',
        text: 'Processing',
        icon: <TbPackage className="me-1" />,
      },
      shipped: {
        color: 'primary',
        text: 'Shipped',
        icon: <FaTruck className="me-1" />,
      },
      delivered: {
        color: 'success',
        text: 'Delivered',
        icon: <FaCheckCircle className="me-1" />,
      },
      cancelled: {
        color: 'danger',
        text: 'Cancelled',
        icon: <FaCheckCircle className="me-1" />,
      },
      payment_failed: {
        color: 'danger',
        text: 'Payment Failed',
        icon: <FaCreditCard className="me-1" />,
      },
    };

    const config = statusConfig[status] || {
      color: 'secondary',
      text: status,
      icon: null,
    };

    return (
      <span
        className={`badge bg-${config.color} d-inline-flex align-items-center`}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  // Payment status badges
  const getPaymentBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending' },
      completed: { color: 'success', text: 'Paid' },
      failed: { color: 'danger', text: 'Failed' },
    };

    const config = statusConfig[status] || { color: 'secondary', text: status };

    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

  // Loading state
  if (loading) {
    return <Spinner loading={loading} />;
  }

  // Error state
  if (error || !order) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Order Not Found</h4>
          <p>
            {error ||
              'The order you are looking for does not exist or you do not have permission to view it.'}
          </p>
          <div className="mt-3">
            <button
              onClick={() => navigate('/profile')}
              className="btn btn-primary me-2"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline-secondary"
            >
              <FaHome className="me-1" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4 py-4">
      {/* Order Header */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2 className="mb-1">
                <FaShoppingBag className="me-2 text-primary" />
                Order #{order.order_number}
              </h2>
              <p className="text-muted mb-0">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <div className="d-flex gap-2">
              {getStatusBadge(order.status)}
              {getPaymentBadge(order.payment_status)}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Order Details */}
        <div className="col-lg-8">
          {/* Order Summary Card */}
          <div className="card mb-4 border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <thead className="border-bottom">
                    <tr>
                      <th scope="col" className="text-secondary">
                        Product
                      </th>
                      <th scope="col" className="text-secondary text-center">
                        Price
                      </th>
                      <th scope="col" className="text-secondary text-center">
                        Quantity
                      </th>
                      <th scope="col" className="text-secondary text-end">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index < order.items.length - 1 ? 'border-bottom' : ''
                        }
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            {item.product_image && (
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="rounded me-3"
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                            <div>
                              <h6 className="mb-1">{item.product_name}</h6>
                              {item.variant && (
                                <small className="text-muted">
                                  Variant: {item.variant.display_name}
                                </small>
                              )}
                              <div>
                                <small className="text-muted">
                                  SKU: {item.product_sku || 'N/A'}
                                </small>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center align-middle">
                          {formatCurrency(item.product_price)}
                        </td>
                        <td className="text-center align-middle">
                          {item.quantity}
                        </td>
                        <td className="text-end align-middle fw-semibold">
                          {formatCurrency(item.subtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Shipping Information Card */}
          <div className="card mb-4 border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">
                <FaTruck className="me-2 text-primary" />
                Shipping Information
              </h5>
            </div>
            <div className="card-body">
              {order.shipping_address ? (
                <div className="row">
                  <div className="col-md-6">
                    <h6>Shipping Address</h6>
                    <address className="mb-0">
                      <strong>{order.shipping_address.full_name}</strong>
                      <br />
                      {order.shipping_address.address_line1}
                      <br />
                      {order.shipping_address.address_line2 && (
                        <>
                          {order.shipping_address.address_line2}
                          <br />
                        </>
                      )}
                      {order.shipping_address.city},{' '}
                      {order.shipping_address.state}
                      <br />
                      {order.shipping_address.postal_code && (
                        <>
                          {order.shipping_address.postal_code}
                          <br />
                        </>
                      )}
                      {order.shipping_address.country || 'Nigeria'}
                    </address>
                    {order.shipping_address.phone && (
                      <p className="mt-2 mb-0">
                        <strong>Phone:</strong> {order.shipping_address.phone}
                      </p>
                    )}
                    {order.shipping_address.email && (
                      <p className="mb-0">
                        <strong>Email:</strong> {order.shipping_address.email}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h6>Shipping Method</h6>
                    <p className="mb-1">
                      <strong>
                        {order.shipping_method?.name || 'Standard Shipping'}
                      </strong>
                    </p>
                    {order.shipping_method?.description && (
                      <p className="text-muted small mb-2">
                        {order.shipping_method.description}
                      </p>
                    )}
                    {order.shipping_method?.estimated_days && (
                      <p className="mb-1">
                        <strong>Estimated Delivery:</strong>{' '}
                        {order.shipping_method.estimated_days}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted mb-0">
                  No shipping information available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Actions & Totals Sidebar */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm sticky-top"
            style={{ top: '20px' }}
          >
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">Order Totals</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span>{formatCurrency(order.shipping_fee)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax (VAT)</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5 text-primary">
                  {formatCurrency(order.total)}
                </span>
              </div>

              {/* Payment Status */}
              <div className="alert alert-light border mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Payment Status:</span>
                  {getPaymentBadge(order.payment_status)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                {order.status === 'pending' &&
                  order.payment_status === 'pending' && (
                    <button
                      onClick={handlePayment}
                      disabled={processingPayment}
                      className="btn btn-primary btn-lg"
                    >
                      {processingPayment ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaCreditCard className="me-2" />
                          Pay Now
                        </>
                      )}
                    </button>
                  )}

                {(order.status === 'pending' ||
                  order.status === 'payment_failed') && (
                  <button
                    onClick={handleCancelOrder}
                    className="btn btn-outline-danger"
                  >
                    Cancel Order
                  </button>
                )}

                {order.status === 'processing' && (
                  <div className="alert alert-info mb-0 text-center">
                    <TbPackage className="fs-4 mb-2" />
                    <p className="mb-0">
                      Your order is being processed. We'll notify you when it
                      ships.
                    </p>
                  </div>
                )}

                {order.status === 'shipped' && (
                  <div className="alert alert-primary mb-0 text-center">
                    <FaTruck className="fs-4 mb-2" />
                    <p className="mb-0">
                      Your order is on the way! Track your shipment for updates.
                    </p>
                  </div>
                )}

                {order.status === 'delivered' && (
                  <div className="alert alert-success mb-0 text-center">
                    <FaCheckCircle className="fs-4 mb-2" />
                    <p className="mb-0">
                      Order delivered! Thank you for shopping with us.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => navigate('/profile')}
                  className="btn btn-outline-secondary"
                >
                  View All Orders
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="btn btn-outline-secondary"
                >
                  <FaHome className="me-1" />
                  Continue Shopping
                </button>
              </div>

              {/* Order Timeline */}
              <div className="mt-4">
                <h6 className="mb-3">Order Timeline</h6>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker bg-primary"></div>
                    <div className="timeline-content">
                      <h6 className="mb-1">Order Placed</h6>
                      <p className="text-muted small mb-0">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                  </div>

                  {order.paid_at && (
                    <div className="timeline-item">
                      <div className="timeline-marker bg-success"></div>
                      <div className="timeline-content">
                        <h6 className="mb-1">Payment Completed</h6>
                        <p className="text-muted small mb-0">
                          {formatDate(order.paid_at)}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.shipped_at && (
                    <div className="timeline-item">
                      <div className="timeline-marker bg-info"></div>
                      <div className="timeline-content">
                        <h6 className="mb-1">Shipped</h6>
                        <p className="text-muted small mb-0">
                          {formatDate(order.shipped_at)}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.delivered_at && (
                    <div className="timeline-item">
                      <div className="timeline-marker bg-success"></div>
                      <div className="timeline-content">
                        <h6 className="mb-1">Delivered</h6>
                        <p className="text-muted small mb-0">
                          {formatDate(order.delivered_at)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="mt-4 text-center">
        <p className="text-muted">
          Need help with your order?{' '}
          <a href="/contact" className="text-decoration-none">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderPage;
