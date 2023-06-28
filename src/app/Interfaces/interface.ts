export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  total: number;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
