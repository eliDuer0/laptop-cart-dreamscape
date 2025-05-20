
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { getProducts, deleteProduct } from '@/lib/supabase';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdminProductListProps {
  onEdit: (product: Product) => void;
  onRefresh: () => void;
  refreshTrigger: number;
}

const AdminProductList: React.FC<AdminProductListProps> = ({ 
  onEdit, 
  onRefresh,
  refreshTrigger
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsData = await getProducts();
        setProducts(productsData as Product[]);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast, refreshTrigger]);

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    try {
      const success = await deleteProduct(productToDelete.id);
      
      if (success) {
        setProducts(products.filter(p => p.id !== productToDelete.id));
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setProductToDelete(null);
      onRefresh();
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-muted-foreground">No products available.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add your first product using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <div className="mt-1 text-sm text-muted-foreground">
              ${product.price.toLocaleString()} &bull; Stock: {product.stock}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onEdit(product)}
            >
              <Edit size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="text-destructive border-destructive"
              onClick={() => setProductToDelete(product)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}

      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProductList;
