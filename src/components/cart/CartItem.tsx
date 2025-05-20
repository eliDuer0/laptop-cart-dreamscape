
import React from 'react';
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from '@/types';
import { Minus, Plus, Trash } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;
  
  const handleIncrease = () => {
    if (quantity < product.stock) {
      onUpdateQuantity(product.id, quantity + 1);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const subtotal = product.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="font-medium text-foreground">{product.name}</h3>
          <p className="font-medium text-foreground">${subtotal.toLocaleString()}</p>
        </div>
        
        <p className="mt-1 text-sm text-muted-foreground">${product.price.toLocaleString()}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8" 
              onClick={handleDecrease} 
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8" 
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive" 
            onClick={() => onRemove(product.id)}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
