import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import api from '../../api';
import OrderHistoryItemContainer from './OrderHistoryItemContainer';

const UserProfilePage = () => {
  // Changed variable name from UserInfo to userInfo (lowercase)
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('user_info')
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

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
      {/* Profile Header */}
      <UserInfo userInfo={userInfo} />

      {/* Order History */}
      <OrderHistoryItemContainer />
    </div>
  );
};

export default UserProfilePage;
