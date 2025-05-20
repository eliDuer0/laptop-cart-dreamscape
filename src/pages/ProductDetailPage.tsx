
import React from 'react';
import ProductDetail from '@/components/product/ProductDetail';
import { useCart } from '@/contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { addToCart } = useCart();
  
  return (
    <ProductDetail onAddToCart={addToCart} />
  );
};

export default ProductDetailPage;
