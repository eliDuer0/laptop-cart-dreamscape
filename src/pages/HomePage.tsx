
import React from 'react';
import ProductList from '@/components/product/ProductList';
import { useCart } from '@/contexts/CartContext';

const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  
  return (
    <div>
      <div className="bg-brand-blue text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Find Your Perfect Laptop</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Browse our collection of premium laptops for work, gaming, and creativity.
            Powerful performance at competitive prices.
          </p>
        </div>
      </div>
      
      <ProductList onAddToCart={addToCart} />
    </div>
  );
};

export default HomePage;
