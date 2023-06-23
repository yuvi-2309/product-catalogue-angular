import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Product } from 'src/app/Interfaces/interface';

describe('CartService', () => {
  let service: CartService;
  const products: Product[] = [
    {
      id: 1,
      title: 'Fjallraven',
      price: 109.95,
      description: 'Your perfect pack',
      category: 'men',
      image: 'img',
      rating: { rate: 3.9, count: 120 },
      quantity: 1,
      total: 109.95,
    },
    {
      id: 2,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add products to the cartItemList and emit productList', () => {
    service.setProduct(products);

    expect(service.cartItemList).toEqual(products);
  });

  it('should increment quantity if product already exists in cartItemList', () => {
    const existingProduct: Product = {
      id: 2,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    };
    service.cartItemList = [existingProduct];

    service.addToCart(existingProduct);

    expect(existingProduct.quantity).toBe(2);
  });

  it('should add new item to cartItemList if product does not exist', () => {
    const product: Product = {
      id: 2,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    };

    service.addToCart(product);

    expect(service.cartItemList.length).toBe(1);
    expect(service.cartItemList[0]).toEqual({ ...product, quantity: 1 });
  });

  it('should calculate the total price of items in cartItemList', () => {
    const products: Product[] = [
      {
        id: 1,
        title: 'Fjallraven',
        price: 109.95,
        description: 'Your perfect pack',
        category: 'men',
        image: 'img',
        rating: { rate: 3.9, count: 120 },
        quantity: 1,
        total: 109.95,
      },
      {
        id: 2,
        title: 'Mens',
        price: 22.3,
        description: 'Slim-fitting style',
        category: 'men',
        image: 'img',
        rating: { rate: 4.1, count: 259 },
        quantity: 1,
        total: 22.3,
      },
    ];
    service.cartItemList = products;

    const totalPrice = service.getTotalPrice();

    expect(totalPrice).toBe(132.25);
  });

  it('should return 0 if cartItemList is empty', () => {
    const totalPrice = service.getTotalPrice();

    expect(totalPrice).toBe(0);
  });

  it('should remove the specified product from cartItemList', () => {
    const productToRemove: Product = {
      id: 2,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    };
    service.cartItemList = products;

    service.removeCartItem(productToRemove);

    expect(service.cartItemList.length).toBe(1);
  });

  it('should remove all items from cartItemList', () => {
    service.removeAllCart();
    expect(service.cartItemList.length).toBe(0);
  });
});
