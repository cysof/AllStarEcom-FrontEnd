import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import styles from './UserInfo.module.css';
import pic from '../../assets/profilepicture.jpeg';

const UserInfo = ({ userInfo }) => {
  const { username } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    memberSince: '',
    accountStatus: 'Active',
    emailVerified: true,
    lastLogin: '',
    profileImage: '/api/placeholder/150/150',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await api.get('/user/profile/');
        // const data = response.data;

        // Mock data for demonstration - replace with actual API call
        const mockData = {
          fullName: username || 'User',
          email: 'user@example.com',
          phone: '+1 (555) 123-4567',
          memberSince: 'January 2024',
          accountStatus: 'Active',
          emailVerified: true,
          lastLogin: '2 hours ago',
          profileImage: '/api/placeholder/150/150',
        };

        setUserProfile(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile data');
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleEditProfile = () => {
    // Navigate to edit profile page or open modal
    toast.info('Edit profile functionality - Coming soon!');
  };

  const handleChangePassword = () => {
    toast.info('Change password functionality - Coming soon!');
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
          src={pic}
          alt={`${userProfile.fullName}'s Profile`}
          className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
        />
        <h4 className={styles.userName}>{userInfo.first_name}</h4>
        <p className="text-muted">{userInfo.email}</p>
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
                    {userInfo.first_name}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>{userInfo.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone:</span>
                  <span className={styles.infoValue}>{userInfo.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Member Since:</span>
                  <span className={styles.infoValue}>
                    {userProfile.memberSince}
                  </span>
                </div>
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
                    {userProfile.emailVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Last Login:</span>
                  <span className={styles.infoValue}>
                    {userProfile.lastLogin}
                  </span>
                </div>
              </div>
            </div>

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
