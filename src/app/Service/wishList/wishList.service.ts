import { Injectable } from '@angular/core';

import { Product } from 'src/app/Interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  wishList: Product[] = [];

  // The function adds a product to a wishlist if it is not already included.
  addToWishList(product: Product): void {
    if (!this.wishList.includes(product)) {
      this.wishList.push(product);
    }
  }

  // This function removes a product from a wishlist array based on its ID.
  removeFromWishList(product: Product): void {
    const index = this.wishList.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.wishList.splice(index, 1);
    }
  }

  // This function returns the wishlist array
  getWishList(): Product[] {
    return this.wishList;
  }

  // This function checks if a given product is present in the wishlist or not.
  isItemInWishList(product: Product): boolean {
    return this.wishList.some(
      (wishListItem: Product) => wishListItem.id === product.id
    );
  }
}
