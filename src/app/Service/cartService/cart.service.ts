import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from 'src/app/Interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemList: Product[] = [];
  productList = new BehaviorSubject<Product[]>([]);
  search = new BehaviorSubject<string>('');

  // Function to return productList
  getProducts() {
    return this.productList.asObservable();
  }

  // The function adds a list of products to the cart item list and updates the product list.
  setProduct(product: Product[]) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  // This function adds a product to the cart and updates the cart item list and total price.
  addToCart(product: Product): void {
    const existingItem = this.cartItemList.find(
      (existingItem: Product) => existingItem.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = { ...product, quantity: 1 };
      this.cartItemList.push(newItem);
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  // This function calculates the total price of all items in a shopping cart.
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.forEach((item: any) => {
      grandTotal += item.price * item.quantity;
    });
    grandTotal = Number(grandTotal.toFixed(2));
    return grandTotal;
  }

  // This function removes a specific product from a cart item list
  removeCartItem(product: Product): void {
    this.cartItemList.map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  // The function removes all items from the cart and updates the product list.
  removeAllCart(): void {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
