import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { CartService } from 'src/app/Service/cartService/cart.service';
import { WishListService } from 'src/app/Service/wishList/wishList.service';
import { SharedService } from 'src/app/Service/shared/shared.service';
import { Product } from 'src/app/Interfaces/interface';
import { DialogComponent } from 'src/app/Component/dialog/dialog.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishList.component.html',
  styleUrls: ['./wishList.component.css'],
})
export class WishListComponent {
  wishList: any[] = [];
  buttonStates: boolean[] = [];
  filterCategory: any = [];
  searchKey: string = '';

  constructor(
    private wishListService: WishListService,
    private sharedService: SharedService,
    private cartService: CartService,
    private location: Location,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  // Function to get the wishlist from the wishlist service and get the search from the cart service
  ngOnInit(): void {
    this.wishList = this.wishListService.getWishList();
    this.cartService.search.subscribe((value: any) => {
      this.searchKey = value;
    });

    this.sharedService.isInputVisible = false;
  }

  //  This function opens a dialog box to confirm the removal of a product from the user's wishlist and removes it if confirmed.
  removeFromWishlist(product: Product): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        message:
          'Are you sure you want to remove this item from your wish list?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.wishListService.removeFromWishList(product);
        this.showDeleteToast();
      }
    });
  }

  // Function to show the delete toast
  showDeleteToast() {
    this.toastr.success('Item deleted successfully!', 'Delete', {
      closeButton: true,
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
  }
}