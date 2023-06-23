import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from 'src/app/Interfaces/interface';

@Component({
  selector: 'app-product-button',
  templateUrl: './product-button.component.html',
  styleUrls: ['./product-button.component.css'],
})
export class ProductButtonComponent {
  @Input() added: boolean;
  @Input() product: Product;
  @Output() addToCartClicked = new EventEmitter<any>();

  isLoading: boolean = false;

  // The function sets a loading state, emits an event with a product, and then sets a success state after a delay.
  onAddToCartClicked() {
    this.isLoading = true;
    this.addToCartClicked.emit(this.product);

    setTimeout(() => {
      this.isLoading = false;
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 1000);
    }, 1000);
  }
}
