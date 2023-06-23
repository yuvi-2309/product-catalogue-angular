import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  let router: Router;

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
      imports: [RouterTestingModule],
      providers: [SharedService],
    });
    service = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
  });

  it('should navigate to the product page with the correct state', () => {
    spyOn(router, 'navigate');

    service.navigateToProduct(product);

    expect(router.navigate).toHaveBeenCalledWith([`/product/${product.id}`], {
      state: { item: product },
    });
  });
});
