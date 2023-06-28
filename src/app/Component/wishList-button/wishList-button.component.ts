import { Component, Input } from '@angular/core';

import { Product } from 'src/app/Interfaces/interface';
import { WishlistService } from 'src/app/Service/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.css'],
})
export class WishlistButtonComponent {
  @Input() product: Product;
  isLoading: boolean = false;
  timeout: any;

  constructor(private wishlistService: WishlistService) {}

  // Function to add a product to the wishlist
  addToWishlist(item: Product): void {
    this.wishlistService.addToWishlist(item);
    this.isLoading = true;

    this.timeout = setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // Function checks if an item is already in the wish list and returns a boolean value
  isAddedToWishlist(item: Product): boolean {
    return this.wishlistService.isItemInWishlist(item);
  }

  ngOnDestroy() {
    if (this.timeout) clearTimeout(this.timeout);
  }
}
