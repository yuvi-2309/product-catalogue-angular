import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

import { ProductComponent } from './product.component';
import {
  HeaderComponent,
  ProductButtonComponent,
  WishListButtonComponent,
} from 'src/app/Component/main';
import { CartService } from 'src/app/Service/cartService/cart.service';

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
        WishListButtonComponent,
      ],
      imports: [MatMenuModule, FormsModule],
      providers: [CartService],
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
