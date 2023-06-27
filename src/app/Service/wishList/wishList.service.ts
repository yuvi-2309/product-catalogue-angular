import { Injectable } from '@angular/core';

import { Product } from 'src/app/Interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: Product[] = [];

  // The function adds a product to a wishlist if it is not already included.
  addToWishlist(product: Product): void {
    if (!this.wishlist.includes(product)) {
      this.wishlist.push(product);
    }
  }

  // This function removes a product from a wishlist array based on its ID.
  removeFromWishlist(product: Product): void {
    const index = this.wishlist.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    }
  }

  // This function returns the wishlist array
  getWishlist(): Product[] {
    return this.wishlist;
  }

  // This function checks if a given product is present in the wishlist or not.
  isItemInWishlist(product: Product): boolean {
    return this.wishlist.some(
      (wishlistItem: Product) => wishlistItem.id === product.id
    );
  }
}
