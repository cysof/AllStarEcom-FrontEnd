import React from 'react'
import UserInfo from './UserInfo'
import OrderHistoryItemContainer from './OrderHistoryItemContainer'

const UserProfilePage = () => {
  return (
    <div className='container my-5'>
        {/* Profile Header */}

        <UserInfo />

        {/* Order History */}
        <OrderHistoryItemContainer />
    </div>
  )
}

export default UserProfilePage