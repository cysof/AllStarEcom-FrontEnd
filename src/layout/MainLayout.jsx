import React, { useContext } from 'react';
import NavBar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';
import EmailVerificationBanner from '../components/user/EmailVerificationBanner';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ numCartItems }) => {
  // ✅ Get user from AuthContext (which now includes email_verified)
  const { isAuthenticated, username, user } = useContext(AuthContext);

  console.log('🔍 MainLayout - Current user:', user);
  console.log('📧 MainLayout - Email verified:', user?.email_verified);
  console.log(
    '⚠️ MainLayout - Should show banner:',
    user && !user.email_verified
  );

  return (
    <>
      <NavBar numCartItems={numCartItems} />

      {/* ✅ Banner will show if user exists and email_verified is false */}
      <EmailVerificationBanner user={user} />

      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
