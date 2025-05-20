
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from '@/types';
import { addProduct, updateProduct } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AdminProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    imageUrl: product?.imageUrl || '',
    stock: product?.stock?.toString() || '',
    processor: product?.specs?.processor || '',
    ram: product?.specs?.ram || '',
    storage: product?.specs?.storage || '',
    display: product?.specs?.display || '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isEditing = !!product;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        stock: parseInt(formData.stock, 10),
        specs: {
          processor: formData.processor,
          ram: formData.ram,
          storage: formData.storage,
          display: formData.display,
        },
      };

      let result;
      if (isEditing && product) {
        result = await updateProduct(product.id, productData);
        if (result) {
          toast({
            title: "Success",
            description: "Product updated successfully",
          });
        }
      } else {
        result = await addProduct(productData);
        if (result) {
          toast({
            title: "Success",
            description: "Product added successfully",
          });
          
          // Reset form after adding
          setFormData({
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            stock: '',
            processor: '',
            ram: '',
            storage: '',
            display: '',
          });
        }
      }

      if (result) {
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: "Failed to save product",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input 
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input 
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="text-lg font-medium pt-2">Specifications</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="processor">Processor</Label>
              <Input 
                id="processor"
                name="processor"
                value={formData.processor}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ram">RAM</Label>
              <Input 
                id="ram"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storage">Storage</Label>
              <Input 
                id="storage"
                name="storage"
                value={formData.storage}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="display">Display</Label>
              <Input 
                id="display"
                name="display"
                value={formData.display}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-opacity-90"
            disabled={isLoading}
          >
            {isLoading 
              ? (isEditing ? "Updating..." : "Adding...")
              : (isEditing ? "Update Product" : "Add Product")
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminProductForm;
