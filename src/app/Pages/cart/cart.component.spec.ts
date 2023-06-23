import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';

import { HeaderComponent, DialogComponent } from 'src/app/Component/main';
import { CartComponent } from './cart.component';
import { CartService } from 'src/app/Service/cartService/cart.service';

class MatDialogRefMock {
  afterClosed() {
    return of(true);
  }
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
    quantity: 1,
    total: 109.95,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent, HeaderComponent, DialogComponent],
      imports: [
        MatDialogModule,
        ToastrModule.forRoot({
          timeOut: 2500,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
        MatMenuModule,
      ],
      providers: [
        CartService,
        ToastrService,
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item from cart and show delete toast', fakeAsync(() => {
    spyOn(component.dialog, 'open').and.returnValue(
      TestBed.inject(MatDialogRef)
    );
    spyOn(component.cartService, 'removeCartItem');
    spyOn(component, 'showDeleteToast');

    component.removeItem(product);
    tick();

    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.cartService.removeCartItem).toHaveBeenCalledWith(product);
    expect(component.showDeleteToast).toHaveBeenCalled();
  }));

  it('should remove all items from cart and show delete toast', fakeAsync(() => {
    spyOn(component.dialog, 'open').and.returnValue(
      TestBed.inject(MatDialogRef)
    );
    spyOn(component.cartService, 'removeAllCart');
    spyOn(component, 'showDeleteToast');

    component.emptyCart();
    tick();

    expect(component.dialog.open).toHaveBeenCalled();
    expect(component.cartService.removeAllCart).toHaveBeenCalled();
    expect(component.showDeleteToast).toHaveBeenCalled();
  }));

  it('should decrease quantity of product and update total and grandTotal', () => {
    const product = {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 3.9, count: 120 },
      quantity: 2,
      total: 109.95,
    };
    component.grandTotal = 109.95;

    component.decreaseQuantity(product);

    expect(product.quantity).toBe(1);
    expect(product.total).toBe(109.95);
    expect(component.grandTotal).toBe(0);
  });

  it('should remove item when quantity is 1 in decreaseQuantity()', () => {
    const product = {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 3.9, count: 120 },
      quantity: 1,
      total: 109.95,
    };
    spyOn(component, 'removeItem');
    component.decreaseQuantity(product);
    expect(component.removeItem).toHaveBeenCalledWith(product);
  });

  it('should increase quantity of product and update total and grandTotal', () => {
    component.grandTotal = 109.95;

    component.increaseQuantity(product);

    expect(product.quantity).toBe(2);
    expect(product.total).toBe(219.9);
  });

  it('should navigate to product details', () => {
    spyOn(component.sharedService, 'navigateToProduct');

    component.navigateToProduct(product);

    expect(component.sharedService.navigateToProduct).toHaveBeenCalledWith(
      product
    );
  });

  it('should show delete toast with success message', () => {
    spyOn(component.toastr, 'success');

    component.showDeleteToast();

    expect(component.toastr.success).toHaveBeenCalledWith(
      'Item deleted successfully!',
      'Delete',
      {
        closeButton: true,
      }
    );
  });
});
