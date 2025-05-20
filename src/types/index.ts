
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
  };
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
