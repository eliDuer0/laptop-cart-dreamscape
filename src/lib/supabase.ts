
import { createClient } from '@supabase/supabase-js';
import { supabase as configuredSupabase } from '@/integrations/supabase/client';

// Use the properly configured Supabase client from the integration
export const supabase = configuredSupabase;

// Define the Product interface to fix type errors
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
}

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data;
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select();
  
  if (error) {
    console.error('Error adding product:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  
  return data?.[0] || null;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  
  return true;
};
