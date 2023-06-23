import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeComponent } from './home.component';
import {
  HeaderComponent,
  NoProductFoundComponent,
  ProductButtonComponent,
  WishListButtonComponent,
} from 'src/app/Component/main';
import { FilterPipe } from 'src/app/Pipes/main';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { SharedService } from 'src/app/Service/shared/shared.service';
import { Product } from 'src/app/Interfaces/interface';
import { AuthenticationService } from 'src/app/Service/authentication/authentication.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cartService: CartService;
  let sharedService: SharedService;
  let authenticationService: AuthenticationService;
  const products: Product[] = [
    {
      id: 1,
      title: 'Fjallraven',
      price: 109.95,
      description: 'Your perfect pack',
      category: 'men',
      image: 'img',
      rating: { rate: 3.9, count: 120 },
      quantity: 1,
      total: 109.95,
    },
    {
      id: 2,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    },
    {
      id: 3,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    },
    {
      id: 4,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    },
    {
      id: 5,
      title: 'Mens',
      price: 22.3,
      description: 'Slim-fitting style',
      category: 'men',
      image: 'img',
      rating: { rate: 4.1, count: 259 },
      quantity: 1,
      total: 22.3,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        WishListButtonComponent,
        NoProductFoundComponent,
        ProductButtonComponent,
        FilterPipe,
      ],
      imports: [MatMenuModule, FormsModule, HttpClientModule, MatTooltipModule, MatProgressSpinnerModule],
      providers: [CartService, SharedService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    sharedService = TestBed.inject(SharedService);
    authenticationService = TestBed.inject(AuthenticationService);

    spyOn(cartService, 'addToCart');
    spyOn(sharedService, 'navigateToProduct');
    spyOn(authenticationService, 'getProduct').and.returnValue(of(products));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the spinner after 1.5 seconds', fakeAsync(() => {
    expect(component.showSpinner).toBe(true); 
    component.ngOnInit();
    tick(2000);
    
    fixture.detectChanges();
    expect(component.showSpinner).toBe(false); 
  }));

  it('should fetch products and set initial values', () => {
    component.ngOnInit();

    expect(authenticationService.getProduct).toHaveBeenCalled();
    expect(component.filterCategory).toEqual(products);
    expect(component.productList).toEqual(products);

    component.productList.forEach((product) => {
      expect(product.quantity).toBe(1);
      expect(product.total).toBe(product.price);
    });

    expect(component.filterCategory.length).toBe(products.length);
  });

  it('should shuffle items', () => {
    component.productList = [...products];
    component.shuffleItems();

    expect(component.productList).not.toEqual(products);

    expect(component.productList.length).toBe(products.length);
  });

  it('should add a product to the cart', () => {
    const product = {
      id: 1,
      title: 'Fjallraven',
      price: 109.95,
      description: 'Your perfect pack',
      category: 'men',
      image: 'img',
      rating: { rate: 3.9, count: 120 },
      quantity: 1,
      total: 109.95,
    };

    component.addToCart(product);
    expect(cartService.addToCart).toHaveBeenCalledWith(product);
  });

  it('should navigate to product', () => {
    const product = {
      id: 1,
      title: 'Fjallraven',
      price: 109.95,
      description: 'Your perfect pack',
      category: 'men',
      image: 'img',
      rating: { rate: 3.9, count: 120 },
      quantity: 1,
      total: 109.95,
    };

    component.navigateToProduct(product);
    expect(sharedService.navigateToProduct).toHaveBeenCalledWith(product);
  });

  it('should filter products based on category', () => {
    component.productList = products;

    component.filterProducts('men');
    expect(component.filterCategory.length).toBe(5);

    component.filterProducts('women');
    expect(component.filterCategory.length).toBe(0);

    component.filterProducts('');
    expect(component.filterCategory.length).toBe(5);
  });
});
