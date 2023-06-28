import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/Service/cartService/cart.service';
import { SharedService } from 'src/app/Service/shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  totalItem: number = 0;
  searchTerm!: string;
  private subscription: Subscription;
  user: string;

  constructor(
    private cartService: CartService,
    private router: Router,
    public sharedService: SharedService
  ) {}

  // ngOnInit method to get the products from the cartService
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.subscription = this.cartService.getProducts().subscribe((response) => {
      this.totalItem = response.length;
    });
  }

  // Function to set the search text to the service if the letters has more than or equal to 3 letters
  search(event: any): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    if (this.searchTerm.length >= 3)
      this.cartService.search.next(this.searchTerm);
    else this.cartService.search.next('');
  }

  // Function to navigate to wishlist component
  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  // Function to sign out of products page and redirect to login
  signOut(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
