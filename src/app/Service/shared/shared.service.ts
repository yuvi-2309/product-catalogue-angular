import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/Interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isInputVisible = true;
  constructor(private router: Router) {}

  navigateToProduct(product: Product) {
    this.router.navigate([`/product/${product.id}`], {
      state: { item: product },
    });
  }
}
