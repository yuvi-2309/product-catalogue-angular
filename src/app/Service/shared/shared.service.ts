import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import users from '../../../../local-db/user';
import { Product, User } from 'src/app/Interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isInputVisible = true;
  users = users;
  loggedInUser: User;

  constructor(private router: Router, private toastr: ToastrService) {}

  // This function navigates to a product page and passes the product object as state.
  navigateToProduct(product: Product) {
    this.router.navigate([`/product/${product.id}`], {
      state: { item: product },
    });
  }

  // The function shows a success toast message indicating that an item has been deleted successfully.

  showDeleteToast() {
    this.toastr.success('Item deleted successfully!', 'Delete', {
      closeButton: true,
    });
  }

  // The function finds a user by their email and sets the logged-in user in local storage.

  findUserByEmail(email: string) {
    this.loggedInUser = users.find((user) => user.email === email);
    localStorage.setItem('user', this.loggedInUser.name);
  }
}
