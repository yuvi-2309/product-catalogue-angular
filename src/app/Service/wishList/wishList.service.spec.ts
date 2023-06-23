import { TestBed } from '@angular/core/testing';

import { WishListService } from './wishList.service';

describe('WishListService', () => {
  let service: WishListService;
  const mockProduct1 = {
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
  const mockProduct2 = {
    id: 2,
    title: 'Mens',
    price: 22.3,
    description: 'Slim-fitting style',
    category: 'men',
    image: 'img',
    rating: { rate: 4.1, count: 259 },
    quantity: 1,
    total: 22.3,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishListService);
  });

  it('should add a product to the wishlist', () => {
    service.addToWishList(mockProduct1);
    expect(service.getWishList()).toContain(mockProduct1);
  });

  it('should not add a product to the wishlist if it already exists', () => {
    service.addToWishList(mockProduct1);
    const initialWishlist = service.getWishList();
    service.addToWishList(mockProduct1);
    expect(service.getWishList()).toEqual(initialWishlist);
  });

  it('should remove a product from the wishlist', () => {
    service.addToWishList(mockProduct1);
    service.addToWishList(mockProduct2);

    service.removeFromWishList(mockProduct1);

    expect(service.getWishList()).not.toContain(mockProduct1);
    expect(service.getWishList()).toContain(mockProduct2);
  });

  it('should return true if a product is in the wishlist', () => {
    service.addToWishList(mockProduct1);
    expect(service.isItemInWishList(mockProduct1)).toBe(true);
  });

  it('should return false if a product is not in the wishlist', () => {
    service.addToWishList(mockProduct1);
    expect(service.isItemInWishList(mockProduct2)).toBe(false);
  });
});
