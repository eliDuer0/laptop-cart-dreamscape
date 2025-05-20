
import { createClient } from '@supabase/supabase-js';
import { supabase as configuredSupabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

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

  // Transform DB format to our application format
  return (data || []).map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageurl,
    specs: {
      processor: product.processor,
      ram: product.ram,
      storage: product.storage,
      display: product.display
    }
  }));
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
  
  if (!data) return null;
  
  // Transform DB format to our application format
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    imageUrl: data.imageurl,
    specs: {
      processor: data.processor,
      ram: data.ram,
      storage: data.storage,
      display: data.display
    }
  };
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  // Transform our application format to DB format
  const dbProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageurl: product.imageUrl,
    processor: product.specs.processor,
    ram: product.specs.ram,
    storage: product.specs.storage,
    display: product.specs.display
  };
  
  const { data, error } = await supabase
    .from('products')
    .insert(dbProduct)
    .select();
  
  if (error) {
    console.error('Error adding product:', error);
    return null;
  }
  
  if (!data || data.length === 0) return null;
  
  // Transform DB format back to our application format
  return {
    id: data[0].id,
    name: data[0].name,
    description: data[0].description,
    price: data[0].price,
    stock: data[0].stock,
    imageUrl: data[0].imageurl,
    specs: {
      processor: data[0].processor,
      ram: data[0].ram,
      storage: data[0].storage,
      display: data[0].display
    }
  };
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  // Transform our application format to DB format
  const dbProduct: any = {};
  
  if (product.name !== undefined) dbProduct.name = product.name;
  if (product.description !== undefined) dbProduct.description = product.description;
  if (product.price !== undefined) dbProduct.price = product.price;
  if (product.stock !== undefined) dbProduct.stock = product.stock;
  if (product.imageUrl !== undefined) dbProduct.imageurl = product.imageUrl;
  
  if (product.specs) {
    if (product.specs.processor !== undefined) dbProduct.processor = product.specs.processor;
    if (product.specs.ram !== undefined) dbProduct.ram = product.specs.ram;
    if (product.specs.storage !== undefined) dbProduct.storage = product.specs.storage;
    if (product.specs.display !== undefined) dbProduct.display = product.specs.display;
  }
  
  const { data, error } = await supabase
    .from('products')
    .update(dbProduct)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  
  if (!data || data.length === 0) return null;
  
  // Transform DB format back to our application format
  return {
    id: data[0].id,
    name: data[0].name,
    description: data[0].description,
    price: data[0].price,
    stock: data[0].stock,
    imageUrl: data[0].imageurl,
    specs: {
      processor: data[0].processor,
      ram: data[0].ram,
      storage: data[0].storage,
      display: data[0].display
    }
  };
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
