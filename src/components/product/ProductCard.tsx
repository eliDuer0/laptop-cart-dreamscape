
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[3/2] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 text-lg font-semibold">{product.name}</div>
        <div className="text-2xl font-bold text-brand-blue">${product.price.toLocaleString()}</div>
        <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Details
        </Button>
        <Button 
          className="flex-1 bg-brand-blue hover:bg-opacity-90"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
