
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from '@/types';
import CartItem from './CartItem';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-foreground mb-1">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button 
                className="mt-6 bg-brand-blue hover:bg-opacity-90"
                onClick={() => {
                  onClose();
                  navigate('/');
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.product.id} 
                    item={item} 
                    onUpdateQuantity={onUpdateQuantity} 
                    onRemove={onRemoveItem} 
                  />
                ))}
              </div>
              
              <div className="border-t mt-6 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-auto">
            <Button 
              className="w-full bg-brand-blue hover:bg-opacity-90 h-12"
              onClick={handleCheckout}
            >
              Checkout (${subtotal.toLocaleString()})
            </Button>
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
