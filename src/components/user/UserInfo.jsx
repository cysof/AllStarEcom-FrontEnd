import React from 'react';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  return (
    <div className="row mb-4">
      {/* User Profile Sidebar */}
      <div
        className={`col-md-3 py-4 card ${styles.userCard} ${styles.textCenter}`}
      >
        <img
          src="/api/placeholder/150/150"
          alt="User Profile"
          className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
        />
        <h4 className={styles.userName}>John Doe</h4>
        <p className="text-muted">john.doe@example.com</p>
        <button className={`btn mt-2 ${styles.editButton}`}>
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
                  <span className={styles.infoValue}>John Doe</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>john.doe@example.com</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone:</span>
                  <span className={styles.infoValue}>+1 (555) 123-4567</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Member Since:</span>
                  <span className={styles.infoValue}>January 2024</span>
                </div>
              </div>

              {/* Account Details */}
              <div className="col-md-6 mb-4">
                <h6 className={styles.sectionTitle}>Account Details</h6>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Username:</span>
                  <span className={styles.infoValue}>johndoe</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Account Status:</span>
                  <span className={`badge bg-success ${styles.statusBadge}`}>
                    Active
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email Verified:</span>
                  <span className={`badge bg-success ${styles.statusBadge}`}>
                    Verified
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Last Login:</span>
                  <span className={styles.infoValue}>2 hours ago</span>
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
                  >
                    Change Password
                  </button>
                  <button
                    className={`btn btn-outline-secondary btn-sm ${styles.actionButton}`}
                  >
                    Update Email
                  </button>
                  <button
                    className={`btn btn-outline-info btn-sm ${styles.actionButton}`}
                  >
                    Privacy Settings
                  </button>
                  <button
                    className={`btn btn-outline-warning btn-sm ${styles.actionButton}`}
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
