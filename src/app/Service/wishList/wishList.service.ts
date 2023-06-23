import { Injectable } from '@angular/core';

import { Product } from 'src/app/Interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  wishList: Product[] = [];

  addToWishList(product: Product): void {
    if (!this.wishList.includes(product)) {
      this.wishList.push(product);
    }
  }

  removeFromWishList(product: Product): void {
    const index = this.wishList.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.wishList.splice(index, 1);
    }
  }

  getWishList(): Product[] {
    return this.wishList;
  }

  isItemInWishList(product: Product): boolean {
    return this.wishList.some(
      (wishListItem: any) => wishListItem.id === product.id
    );
  }
}
