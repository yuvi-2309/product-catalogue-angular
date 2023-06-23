import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { HeaderComponent } from 'src/app/Component/main';
import { WishListComponent } from './wishList.component';
import { WishListService } from 'src/app/Service/wishList/wishList.service';
import { SharedService } from 'src/app/Service/shared/shared.service';
import { CartService } from 'src/app/Service/cartService/cart.service';

class MatDialogRefMock {
  afterClosed() {
    return of(true);
  }
}

describe('WishListComponent', () => {
  let component: WishListComponent;
  let fixture: ComponentFixture<WishListComponent>;
  let wishListService: WishListService;
  let sharedService: SharedService;
  let cartService: CartService;
  let location: Location;
  const product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https',
    rating: { rate: 3.9, count: 120 },
    quantity: 1,
    total: 109.95,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishListComponent, HeaderComponent],
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
        WishListService,
        SharedService,
        CartService,
        ToastrService,
        Location,
        { provide: MatDialogRef, useClass: MatDialogRefMock },
      ],
    });
    fixture = TestBed.createComponent(WishListComponent);
    component = fixture.componentInstance;
    wishListService = TestBed.inject(WishListService);
    sharedService = TestBed.inject(SharedService);
    cartService = TestBed.inject(CartService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove a product from the wishlist', () => {
    spyOn(component.dialog, 'open').and.returnValue(
      TestBed.inject(MatDialogRef)
    );
    spyOn(component, 'showDeleteToast');
    spyOn(wishListService, 'removeFromWishList');

    component.removeFromWishlist(product);

    expect(component.dialog.open).toHaveBeenCalled();
    expect(wishListService.removeFromWishList).toHaveBeenCalledWith(product);
    expect(component.showDeleteToast).toHaveBeenCalled();
  });

  it('should navigate to the product', () => {
    spyOn(sharedService, 'navigateToProduct');
    component.navigateToProduct(product);
    expect(sharedService.navigateToProduct).toHaveBeenCalledWith(product);
  });

  it('should add a product to the cart', () => {
    spyOn(cartService, 'addToCart');
    component.addToCart(product);
    expect(cartService.addToCart).toHaveBeenCalledWith(product);
  });

  it('should navigate to the previous route', () => {
    spyOn(location, 'back');
    component.navigateToPreviousRoute();
    expect(location.back).toHaveBeenCalled();
  });

  it('should show delete toast', () => {
    spyOn(component.toastr, 'success');
    component.showDeleteToast();
    expect(component.toastr.success).toHaveBeenCalledWith(
      'Item deleted successfully!',
      'Delete',
      { closeButton: true }
    );
  });
});
