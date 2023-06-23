import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Product } from 'src/app/Interfaces/interface';
import { CartService } from 'src/app/Service/cartService/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product;

  constructor(private cartService: CartService, private location: Location) {}

  // Function to get the product details from the previous route
  ngOnInit(): void {
    this.product = history.state.item;
  }

  // Function to add a product to the cart
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  // Function to navigate to the previous route 
  navigateToPreviousRoute(): void {
    this.location.back();
  }
}
