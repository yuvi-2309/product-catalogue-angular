import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../Service/authentication/authentication.service';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { SharedService } from 'src/app/Service/shared/shared.service';
import { Product } from 'src/app/Interfaces/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];
  filterCategory: Product[] = [];
  searchKey: string = '';
  productButtonStates: boolean[] = [];
  selectedFilter: string = '';
  showSpinner: boolean = true

  constructor(
    private products: AuthenticationService,
    private cartService: CartService,
    private sharedService: SharedService,
  ) {}

  // Function to get the products from the authentication Service and to get the search key from the cart service
  ngOnInit(): void {

    setTimeout(() => {
      this.showSpinner = false;
    }, 1500);

    this.products.getProduct().subscribe((response) => {
      this.filterCategory = response;
      this.productList = response;
      this.shuffleItems();

      this.productList.forEach((product: Product) => {
        product.quantity = 1;
        product.total = product.price;
      });
    });

    this.cartService.search.subscribe((value: string) => {
      this.searchKey = value;
    });
  }

  // Function to add a product to cart
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.productButtonStates[this.filterCategory.indexOf(product)] = true;
  }

  // Function to shuffle all the products
  shuffleItems(): void {
    for (let i = this.productList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.productList[i], this.productList[j]] = [
        this.productList[j],
        this.productList[i],
      ];
    }
  }

  // Function to navigate to the product page
  navigateToProduct(product: Product): void {
    this.sharedService.navigateToProduct(product);
  }

  // Function to filter the products based on the category
  filterProducts(category: string) {
    this.selectedFilter = category;
    this.filterCategory = this.productList.filter((product: any) => {
      if (product.category == category || category == '') {
        return product;
      }
    });
  }
}
