import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  HeaderComponent,
  ProductButtonComponent,
  WishlistButtonComponent,
} from 'src/app/Component/main';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let location: Location;
  const item = {
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
      declarations: [
        ProductComponent,
        HeaderComponent,
        ProductButtonComponent,
        WishlistButtonComponent,
      ],

      imports: [MatMenuModule, FormsModule, ToastrModule.forRoot()],
      providers: [CartService, ToastrService],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    history.replaceState({ item }, '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart', () => {
    const cartService = TestBed.inject(CartService);
    spyOn(cartService, 'addToCart');

    component.addToCart(item);

    expect(cartService.addToCart).toHaveBeenCalledWith(item);
  });

  it('should navigate to previous route', () => {
    spyOn(location, 'back');

    component.navigateToPreviousRoute();

    expect(location.back).toHaveBeenCalled();
  });
});
