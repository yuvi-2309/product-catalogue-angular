import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let cartService: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatMenuModule,
        FormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [CartService, ToastrService],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchTerm and emit search event when search is called', () => {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const searchTerm = 'example';
    inputElement.value = searchTerm;
    const event = { target: inputElement };
    spyOn(cartService.search, 'next');

    component.search(event);

    expect(component.searchTerm).toBe(searchTerm);
    expect(cartService.search.next).toHaveBeenCalledWith(searchTerm);
  });

  it('should emit search event with empty string when search term length is less than 3', () => {
    spyOn(cartService.search, 'next');

    component.search({ target: { value: 'ab' } });

    expect(cartService.search.next).toHaveBeenCalledWith('');
  });

  it('should navigate to wishlist when navigateToWishlist is called', fakeAsync(() => {
    spyOn(router, 'navigate');

    component.navigateToWishlist();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/wishlist']);
  }));

  it('should navigate to login and remove token from localStorage when signOut is called', fakeAsync(() => {
    spyOn(router, 'navigate');
    spyOn(localStorage, 'removeItem');
    const token = 'example_token';
    localStorage.setItem('token', token);

    component.signOut();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  }));
});
