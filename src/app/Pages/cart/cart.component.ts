import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/Interfaces/interface';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { SharedService } from 'src/app/Service/shared/shared.service';
import { DialogComponent } from 'src/app/Component/dialog/dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products: Product[] = [];
  grandTotal!: number;
  constructor(
    public cartService: CartService,
    public sharedService: SharedService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  // Function to get the products and grandTotal from the cart Service
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
    this.sharedService.isInputVisible = false;
  }

  // This function opens a dialog box to confirm the removal of a product from the cart and removes it if confirmed.
  removeItem(product: Product): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '300px',
      data: {
        message: 'Are you sure you want to remove this item from your cart?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.removeCartItem(product);
        this.showDeleteToast();
      }
    });
  }

  // This function opens a dialog box to confirm the removal of all products from the cart and removes it if confirmed.
  emptyCart(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '300px',
      data: {
        message:
          'Are you sure you want to remove all the items from your cart?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.removeAllCart();
        this.showDeleteToast();
      }
    });
  }

  // Function to show the toast message
  showDeleteToast(): void {
    this.toastr.success('Item deleted successfully!', 'Delete', {
      closeButton: true,
    });
  }

  // Function to decrease a quantity of a product if it is greater than 1 or remove the product based on a confirmation popup
  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
      product.total = product.price * product.quantity;
      this.grandTotal = this.cartService.getTotalPrice();
    } else {
      this.removeItem(product);
    }
  }

  // Function to increase a quantity of a product and get the grandTotal 
  increaseQuantity(product: Product): void {
    product.quantity++;
    product.total = product.price * product.quantity;
    this.grandTotal = this.cartService.getTotalPrice();
  }

  // Function to navigate to the product page
  navigateToProduct(product: Product): void {
    this.sharedService.navigateToProduct(product);
  }

  // Function to reset the inputVisible to true once the component gets destroyed
  ngOnDestroy() {
    this.sharedService.isInputVisible = true;
  }
}
