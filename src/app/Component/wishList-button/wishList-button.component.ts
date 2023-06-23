import { Component, Input } from '@angular/core';

import { Product } from 'src/app/Interfaces/interface';
import { WishListService } from 'src/app/Service/wishList/wishList.service';

@Component({
  selector: 'app-wishList-button',
  templateUrl: './wishList-button.component.html',
  styleUrls: ['./wishList-button.component.css'],
})
export class WishListButtonComponent {
  @Input() product: Product;
  isLoading: boolean = false;

  constructor(private wishListService: WishListService) {}

  // Function to add a product to the wishlist
  addToWishList(item: Product): void {
    this.wishListService.addToWishList(item);
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  
  // Function checks if an item is already in the wish list and returns a boolean value
  isAddedToWishList(item: any): boolean {
    return this.wishListService.isItemInWishList(item);
  }
}
