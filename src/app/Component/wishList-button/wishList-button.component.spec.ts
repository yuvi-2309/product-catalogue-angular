import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { WishListButtonComponent } from './wishList-button.component';
import { WishListService } from '../../Service/wishList/wishList.service';

describe('WishlistButtonComponent', () => {
  let component: WishListButtonComponent;
  let fixture: ComponentFixture<WishListButtonComponent>;
  let wishListService: WishListService;
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
      declarations: [WishListButtonComponent],
      providers: [WishListService],
    });
    fixture = TestBed.createComponent(WishListButtonComponent);
    component = fixture.componentInstance;
    wishListService = TestBed.inject(WishListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToWishList method of wishListService', () => {
    spyOn(wishListService, 'addToWishList');

    component.addToWishList(product);

    expect(wishListService.addToWishList).toHaveBeenCalledWith(product);
  });

  it('should set isLoading to true and then false after 1 second', fakeAsync(() => {
    component.addToWishList(product);
    expect(component.isLoading).toBe(true);

    tick(1000);
    expect(component.isLoading).toBe(false);
  }));
});
