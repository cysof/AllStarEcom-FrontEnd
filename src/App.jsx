import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './api'; // ADD THIS IMPORT
import MainLayout from './layout/MainLayout';
import HomePage from './components/home/HomePage';
import NotFoundPage from './components/ui/NotFoundPage';
import ProductPage from './components/product/ProductPage';
import CartPage from './components/cart/CartPage';
import CheckOutPage from './components/checkout/CheckOutPage';


const App = () => {
  const [numCartItems, setNumCartItems] = useState(0);
  const cart_code = localStorage.getItem('cart_code');

  useEffect(() => {
    const fetchCartStats = async () => {
      if (!cart_code) {
        console.log('No cart code found');
        return;
      }

      try {
        const response = await api.get(`get_cart_stat?cart_code=${cart_code}`);
        console.log('Cart stats:', response.data);

        // Update cart items count if available in response
        if (response.data.num_of_items !== undefined) {
          setNumCartItems(response.data.num_of_items);
        } else if (response.data.items) {
          // If items array is returned instead
          setNumCartItems(response.data.items.length);
        }
      } catch (err) {
        console.error('Error fetching cart stats:', err.message);
        // Don't break the app if cart fetch fails
        setNumCartItems(0);
      }
    };

    fetchCartStats();
  }, [cart_code]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
          <Route index element={<HomePage />} />
          <Route
            path="products/:slug"
            element={<ProductPage setNumCartItems={setNumCartItems} />}
          />
          <Route
            path="cart"
            element={<CartPage setNumCartItems={setNumCartItems} />}
          />
          <Route path='checkout' element={<CheckOutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
