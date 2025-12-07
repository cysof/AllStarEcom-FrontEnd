// ============================================================================
// CheckoutPage.jsx - IMPROVED
// Coordinates Steps 2-4: Shipping Address, Calculate Shipping, Review & Create Order
// ============================================================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import Spinner from '../ui/Spinner';
import ShippingAddressForm from './ShippingAddressForm';
import ShippingMethodForm from './ShippingMethodForm';
import OrderReview from './OrderReview';
import OrderSummarySidebar from './OrderSummarySidebar';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Shipping, 3: Review
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Cart data
  const [cart, setCart] = useState(null);
  const [cartCode, setCartCode] = useState(null);

  // User data
  const [userEmail, setUserEmail] = useState('');

  // Form data
  const [shippingAddress, setShippingAddress] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  // Shipping methods & selection (with calculated fees)
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [calculatingShipping, setCalculatingShipping] = useState(false);

  // Initialize checkout on mount
  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get cart code from localStorage
        const savedCartCode = localStorage.getItem('cart_code');
        if (!savedCartCode) {
          setError('No cart found. Please add items to your cart first.');
          setLoading(false);
          return;
        }
        setCartCode(savedCartCode);

        // Fetch cart data
        const cartResponse = await api.get(
          `get_cart/?cart_code=${savedCartCode}`
        );
        if (!cartResponse.data.items || cartResponse.data.items.length === 0) {
          setError('Your cart is empty. Please add items before checking out.');
          setLoading(false);
          return;
        }
        setCart(cartResponse.data);

        // Fetch user data (pre-fill address form)
        const userResponse = await api.get('user_info/');
        setUserEmail(userResponse.data.email || '');

        // Pre-fill shipping address with user data if available
        setShippingAddress({
          first_name: userResponse.data.first_name || '',
          last_name: userResponse.data.last_name || '',
          phone: userResponse.data.phone || '',
          address: userResponse.data.address || '',
          city: userResponse.data.city || '',
          state: userResponse.data.state || '',
        });
      } catch (err) {
        console.error('Checkout initialization error:', err);
        const errorMsg =
          err.response?.data?.error ||
          'Failed to load checkout. Please try again.';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    initializeCheckout();
  }, []);

  // Handle address form submission (Step 1 -> Step 2)
  const handleAddressSubmit = async (addressData) => {
    try {
      setShippingAddress(addressData);
      setCalculatingShipping(true);

      // Calculate shipping based on address
      const shippingResponse = await api.post('calculate-shipping/', {
        cart_code: cartCode,
        state: addressData.state,
        city: addressData.city,
      });

      console.log('🚚 Shipping calculation response:', shippingResponse.data);
      console.log(
        '🚚 Shipping options:',
        shippingResponse.data.shipping_options
      );

      setShippingMethods(shippingResponse.data.shipping_options || []);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error calculating shipping:', err);
      const errorMsg =
        err.response?.data?.error ||
        'Failed to calculate shipping. Please try again.';
      toast.error(errorMsg);
    } finally {
      setCalculatingShipping(false);
    }
  };

  // Handle shipping method selection (Step 2 -> Step 3)
  const handleShippingMethodSelect = (methodId) => {
    const method = shippingMethods.find((m) => m.id === methodId);
    if (method) {
      setSelectedShippingMethod(method);
      setShippingFee(method.total_fee || 0);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Go back to previous step
  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle order creation (Step 3 -> Step 4: Create Order)
  const handleCheckoutSubmit = async () => {
    try {
      setSubmitting(true);

      // Validate all required data
      if (!cartCode) {
        toast.error('Cart not found');
        return;
      }

      if (!selectedShippingMethod) {
        toast.error('Please select a shipping method');
        return;
      }

      // Build shipping address with correct field names for backend
      const shippingAddressPayload = {
        full_name: `${shippingAddress.first_name} ${shippingAddress.last_name}`,
        email: userEmail, // User's email
        phone: shippingAddress.phone,
        address_line1: shippingAddress.address,
        address_line2: '', // Optional
        city: shippingAddress.city,
        state: shippingAddress.state,
        postal_code: '', // Optional
        country: 'Nigeria',
        delivery_notes: '',
      };

      // Create order
      const orderPayload = {
        cart_code: cartCode,
        shipping_address: shippingAddressPayload,
        shipping_method_id: selectedShippingMethod.id,
      };

      const response = await api.post('checkout/', orderPayload);

      if (response.data && response.data.order_number) {
        toast.success('Order created successfully!');

        // Clear cart from localStorage
        localStorage.removeItem('cart_code');

        // Redirect to payment page with order number
        navigate(`/order/${response.data.order_number}`);
      } else {
        throw new Error('No order number received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMsg =
        err.response?.data?.error ||
        'Failed to create order. Please try again.';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return <Spinner loading={loading} />;
  }

  // Error state
  if (error) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Checkout Error</h4>
          <p>{error}</p>
          <div className="mt-3">
            <button
              onClick={() => navigate('/cart')}
              className="btn btn-primary"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No cart data
  if (!cart) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Cart Data</h4>
          <p>Unable to load your cart. Please try again.</p>
          <button
            onClick={() => navigate('/cart')}
            className="btn btn-primary mt-2"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4 py-4">
      {/* Checkout Header */}
      <div className="mb-4">
        <h2 className="mb-3">Checkout</h2>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex gap-2">
            <div
              className={`badge ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`}
            >
              1. Address
            </div>
            <div
              className={`badge ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`}
            >
              2. Shipping
            </div>
            <div
              className={`badge ${step >= 3 ? 'bg-primary' : 'bg-secondary'}`}
            >
              3. Review
            </div>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back to Cart
          </button>
        </div>
      </div>

      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <ShippingAddressForm
              initialData={shippingAddress}
              onSubmit={handleAddressSubmit}
              loading={calculatingShipping}
            />
          )}

          {/* Step 2: Shipping Method */}
          {step === 2 && (
            <ShippingMethodForm
              methods={shippingMethods}
              address={shippingAddress}
              selectedMethod={selectedShippingMethod}
              onSelect={handleShippingMethodSelect}
              onBack={handleBackStep}
              loading={submitting}
            />
          )}

          {/* Step 3: Review Order */}
          {step === 3 && (
            <OrderReview
              cart={cart}
              shippingAddress={shippingAddress}
              shippingMethod={selectedShippingMethod}
              shippingFee={shippingFee}
              onSubmit={handleCheckoutSubmit}
              onBack={handleBackStep}
              loading={submitting}
            />
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-lg-4">
          <OrderSummarySidebar
            cart={cart}
            shippingFee={shippingFee}
            currentStep={step}
            shippingAddress={shippingAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
