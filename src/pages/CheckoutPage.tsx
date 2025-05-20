import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);
  
  // Removed shipping and tax calculations
  const total = subtotal;
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-brand-blue hover:bg-opacity-90"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <ChevronLeft size={16} />
        Continue Shopping
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This is a demo checkout page. No actual purchase will be made.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Placeholder form fields */}
              <div>Form fields would go here in a real app</div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <p className="text-sm text-muted-foreground">
              Payment integration would be added here in a production app.
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 bg-brand-blue hover:bg-opacity-90 h-12"
              onClick={() => alert('Thank you for your purchase!')}
            >
              Complete Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
