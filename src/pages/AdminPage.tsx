
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminProductForm from '@/components/admin/AdminProductForm';
import AdminProductList from '@/components/admin/AdminProductList';
import { Product } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Redirect non-admins
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };
  
  const handleFormSuccess = () => {
    setEditingProduct(undefined);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="add">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-6">
          <AdminProductList 
            onEdit={handleEditProduct} 
            onRefresh={() => setRefreshTrigger(prev => prev + 1)}
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>
        
        <TabsContent value="add">
          <AdminProductForm 
            product={editingProduct} 
            onSuccess={handleFormSuccess} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
