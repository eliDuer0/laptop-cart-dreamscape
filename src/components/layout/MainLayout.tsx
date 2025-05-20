
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import CartDrawer from '../cart/CartDrawer';
import { useCart } from '@/contexts/CartContext';

const MainLayout: React.FC = () => {
  const { 
    cartItems,
    isCartOpen,
    openCart,
    closeCart, 
    updateQuantity, 
    removeFromCart 
  } = useCart();
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={openCart} cartItemCount={cartItemCount} />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="bg-brand-darkGray text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 LaptopStore. This is a demo app.
          </p>
        </div>
      </footer>
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};

export default MainLayout;
