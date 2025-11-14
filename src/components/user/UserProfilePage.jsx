import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserInfo from './UserInfo';
import api from '../../api';
import OrderHistoryItemContainer from './OrderHistoryItemContainer';

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orderitems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Function to fetch user data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await api.get('user_info');
      console.log('User info fetched:', response.data);
      setUserInfo(response.data);
      setOrderItems(response.data.items || []);
    } catch (err) {
      console.error('Error fetching user info:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and when coming from verification success
  useEffect(() => {
    fetchUserData();
  }, [location.pathname]); // Re-fetch when navigating to this page

  // Handle manual refresh
  const handleRefresh = () => {
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '400px' }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <UserInfo userInfo={userInfo} onRefresh={handleRefresh} />
      {/* Order History */}
      <OrderHistoryItemContainer orderitems={orderitems} />
    </div>
  );
};

export default UserProfilePage;
