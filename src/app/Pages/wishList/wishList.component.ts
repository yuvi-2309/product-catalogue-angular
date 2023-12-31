import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { DialogComponent } from 'src/app/Component/dialog/dialog.component';
import { Product } from 'src/app/Interfaces/interface';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { SharedService } from 'src/app/Service/shared/shared.service';
import { WishlistService } from 'src/app/Service/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishlist: Product[] = [];
  buttonStates: boolean[] = [];
  filterCategory: Product[] = [];
  searchKey: string = '';
  private subscription: Subscription;

  constructor(
    private wishlistService: WishlistService,
    private sharedService: SharedService,
    private cartService: CartService,
    private location: Location,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  // Function to get the wishlist from the wishlist service and get the search from the cart service
  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
    this.subscription = this.cartService.search.subscribe((value: string) => {
      this.searchKey = value;
    });

    this.sharedService.isInputVisible = false;
  }

  //  This function opens a dialog box to confirm the removal of a product from the user's wishlist and removes it if confirmed.
  removeFromWishlist(product: Product): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '300px',
      data: {
        message:
          'Are you sure you want to remove this item from your wish list?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.wishlistService.removeFromWishlist(product);
        this.sharedService.showDeleteToast();
      }
    });
  }

  // Function to navigate to the product page with the current product object
  navigateToProduct(product: Product): void {
    this.sharedService.navigateToProduct(product);
  }

  // Function to add a product to the cart service and set the state of a button to true
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.buttonStates[this.filterCategory.indexOf(product)] = true;
  }

  // Function to navigate to the previous route
  navigateToPreviousRoute(): void {
    this.location.back();
  }

  // Function to make isInputVisible true once the component gets destroyed
  ngOnDestroy() {
    this.sharedService.isInputVisible = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
