import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import styles from './NavBarLinks.module.css';

const NavBarLinks = ({ onLinkClick }) => {
  const { isAuthenticated, setIsAuthenticated, username, setUsername } =
    useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Handle link clicks for mobile
  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Optional: Call logout API if you have one
      // await api.post('logout/');

      // Clear tokens from localStorage (no longer storing username)
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      // Update auth context
      setIsAuthenticated(false);
      setUsername('');

      // Show toast notification
      toast.success('Logged out successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });

      // Close mobile navbar if function provided
      if (onLinkClick) onLinkClick();

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.navList}`}>
      {isAuthenticated ? (
        <>
          {/* Username Display - Using NavLink for active state */}
          <li className={`nav-item ${styles.navItem}`}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${styles.username} ${
                  isActive ? styles.active : ''
                }`
              }
              onClick={handleLinkClick}
              title={`Logged in as ${username}`}
              aria-label={`Logged in as ${username}`}
            >
              <span className={styles.usernameIcon}>👋</span>
              Hello, <span className={styles.usernameText}>{username}</span>
            </NavLink>
          </li>

          {/* Logout Button */}
          <li className={`nav-item ${styles.navItem}`}>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`nav-link btn btn-link ${styles.navLink} ${
                styles.logout
              } ${isLoggingOut ? styles.loading : ''}`}
              style={{
                border: 'none',
                background: 'none',
                cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                textDecoration: 'none',
              }}
              aria-label="Logout"
              aria-busy={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <span className={styles.spinner} aria-hidden="true"></span>
                  Logging out...
                </>
              ) : (
                <>
                  <span className={styles.logoutIcon}>🚪</span>
                  Logout
                </>
              )}
            </button>
          </li>
        </>
      ) : (
        <>
          {/* Login Link */}
          <li className={`nav-item ${styles.navItem}`}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={handleLinkClick}
              end
              aria-label="Login to your account"
            >
              <span className={styles.loginIcon}>🔑</span>
              Login
            </NavLink>
          </li>

          {/* Register Link */}
          <li className={`nav-item ${styles.navItem}`}>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={handleLinkClick}
              aria-label="Create new account"
            >
              <span className={styles.registerIcon}>📝</span>
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBarLinks;
