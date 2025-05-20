
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from '@/types';
import { getProductById } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Minus, Plus } from 'lucide-react';

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      const productData = await getProductById(id);
      
      if (productData) {
        setProduct(productData);
      } else {
        toast({
          title: "Error",
          description: "Product not found",
          variant: "destructive",
        });
        navigate('/');
      }
      
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart`,
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 aspect-square bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <ChevronLeft size={16} />
        Back to products
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="aspect-square overflow-hidden rounded-lg border bg-white">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 text-3xl font-bold text-brand-blue">${product.price.toLocaleString()}</div>
          
          <p className="mt-4 text-gray-600">{product.description}</p>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Processor:</span>
                <span>{product.specs.processor}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">RAM:</span>
                <span>{product.specs.ram}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Storage:</span>
                <span>{product.specs.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Display:</span>
                <span>{product.specs.display}</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decreaseQuantity} 
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {product.stock} available
            </div>
          </div>
          
          <Button 
            className="mt-6 w-full bg-brand-blue hover:bg-opacity-90 h-12"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
