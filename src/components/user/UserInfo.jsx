import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import styles from './UserInfo.module.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const UserInfo = ({ userInfo, onRefresh }) => {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    // ← Fixed: removed extra setIsRefreshing
    fullName: '',
    email: '',
    phone: '',
    memberSince: '',
    accountStatus: 'Active',
    emailVerified: false,
    lastLogin: '',
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/account/profile/');
      const userData = response.data;

      // Format member since date
      const memberSince = new Date(userData.created_at).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      );

      // Format last login if available
      const lastLogin = userData.last_login
        ? new Date(userData.last_login).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'Never';

      setUserProfile({
        fullName: `${userData.first_name} ${userData.last_name}`.trim(),
        email: userData.email,
        phone: userData.phone || 'Not provided',
        memberSince: memberSince,
        accountStatus: 'Active',
        emailVerified: userData.email_verified,
        lastLogin: lastLogin,
        profileImage: userData.profile_picture_url,
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load profile data');
      setIsLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Manual refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast.info('Refreshing profile data...');

    // Call parent's refresh to update userInfo
    if (onRefresh) {
      await onRefresh();
    }

    // Refresh local profile data
    await fetchUserProfile();

    setIsRefreshing(false);
    toast.success('Profile updated!');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleUpdateEmail = () => {
    toast.info('Update email functionality - Coming soon!');
  };

  const handlePrivacySettings = () => {
    toast.info('Privacy settings functionality - Coming soon!');
  };

  const handleDownloadData = () => {
    toast.info('Download data functionality - Coming soon!');
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="row mb-4">
      {/* User Profile Sidebar */}
      <div
        className={`col-md-3 py-4 card ${styles.userCard} ${styles.textCenter}`}
      >
        <img
          src={userProfile.profileImage || '/default-avatar.png'}
          alt={`${userProfile.fullName}'s Profile`}
          className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
        <h4 className={styles.userName}>
          {userInfo.first_name} {userInfo.last_name}
        </h4>
        <p className="text-muted">{userInfo.email}</p>

        {/* Refresh Button */}
        <button
          className="btn btn-outline-secondary btn-sm mb-2"
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh profile data"
        >
          {isRefreshing ? (
            <>
              <span className="spinner-border spinner-border-sm me-1"></span>
              Refreshing...
            </>
          ) : (
            <>
              <i className="bi bi-arrow-clockwise me-1"></i>
              Refresh
            </>
          )}
        </button>

        <button
          className={`btn mt-2 ${styles.editButton}`}
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>

      {/* Account Overview */}
      <div className="col-md-9">
        <div className="card h-100">
          <div className={`card-header ${styles.cardHeader}`}>
            <h5 className="mb-0">Account Overview</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Personal Information */}
              <div className="col-md-6 mb-4">
                <h6 className={styles.sectionTitle}>Personal Information</h6>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Full Name:</span>
                  <span className={styles.infoValue}>
                    {userInfo.first_name} {userInfo.last_name}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>{userProfile.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone:</span>
                  <span className={styles.infoValue}>{userProfile.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Member Since:</span>
                  <span className={styles.infoValue}>
                    {userProfile.memberSince}
                  </span>
                </div>
                {userInfo.date_of_birth && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Date of Birth:</span>
                    <span className={styles.infoValue}>
                      {new Date(userInfo.date_of_birth).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Account Details */}
              <div className="col-md-6 mb-4">
                <h6 className={styles.sectionTitle}>Account Details</h6>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Username:</span>
                  <span className={styles.infoValue}>{username}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Account Status:</span>
                  <span
                    className={`badge ${
                      userProfile.accountStatus === 'Active'
                        ? 'bg-success'
                        : 'bg-warning'
                    } ${styles.statusBadge}`}
                  >
                    {userProfile.accountStatus}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email Verified:</span>
                  <span
                    className={`badge ${
                      userProfile.emailVerified ? 'bg-success' : 'bg-danger'
                    } ${styles.statusBadge}`}
                  >
                    {userProfile.emailVerified ? (
                      <>
                        <i className="bi bi-check-circle me-1"></i>
                        Verified
                      </>
                    ) : (
                      <>
                        <i className="bi bi-x-circle me-1"></i>
                        Not Verified
                      </>
                    )}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Last Login:</span>
                  <span className={styles.infoValue}>
                    {userProfile.lastLogin}
                  </span>
                </div>
                {userInfo.age && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Age:</span>
                    <span className={styles.infoValue}>
                      {userInfo.age} years
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            {(userInfo.address || userInfo.city || userInfo.state) && (
              <div className="row mt-3">
                <div className="col-12">
                  <h6 className={styles.sectionTitle}>Address Information</h6>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Full Address:</span>
                    <span className={styles.infoValue}>
                      {userInfo.get_full_address || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Sections */}
            <div className="row mt-3">
              <div className="col-12">
                <h6 className={styles.sectionTitle}>Quick Actions</h6>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className={`btn btn-outline-primary btn-sm ${styles.actionButton}`}
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                  <button
                    className={`btn btn-outline-secondary btn-sm ${styles.actionButton}`}
                    onClick={handleUpdateEmail}
                  >
                    Update Email
                  </button>
                  <button
                    className={`btn btn-outline-info btn-sm ${styles.actionButton}`}
                    onClick={handlePrivacySettings}
                  >
                    Privacy Settings
                  </button>
                  <button
                    className={`btn btn-outline-warning btn-sm ${styles.actionButton}`}
                    onClick={handleDownloadData}
                  >
                    Download Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
