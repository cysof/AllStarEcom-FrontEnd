import React, { useContext } from 'react';
import NavBar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';
import EmailVerificationBanner from '../components/user/EmailVerificationBanner';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ numCartItems }) => {
  const { isAuthenticated, username } = useContext(AuthContext);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(
            'https://allstarfashion-yb2ng.sevalla.app/account/profile/',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  return (
    <>
      <NavBar numCartItems={numCartItems} />
      <EmailVerificationBanner user={user} />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
