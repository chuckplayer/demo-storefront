export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock_quantity: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  customer_email: string;
  created_at: string;
  status: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  product?: Product;
}
