import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';

describe('wishlistService', () => {
  let service: WishlistService;
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
    service = TestBed.inject(WishlistService);
  });

  it('should add a product to the wishlist', () => {
    service.addToWishlist(mockProduct1);
    expect(service.getWishlist()).toContain(mockProduct1);
  });

  it('should not add a product to the wishlist if it already exists', () => {
    service.addToWishlist(mockProduct1);
    const initialWishlist = service.getWishlist();
    service.addToWishlist(mockProduct1);
    expect(service.getWishlist()).toEqual(initialWishlist);
  });

  it('should remove a product from the wishlist', () => {
    service.addToWishlist(mockProduct1);
    service.addToWishlist(mockProduct2);

    service.removeFromWishlist(mockProduct1);

    expect(service.getWishlist()).not.toContain(mockProduct1);
    expect(service.getWishlist()).toContain(mockProduct2);
  });

  it('should return true if a product is in the wishlist', () => {
    service.addToWishlist(mockProduct1);
    expect(service.isItemInWishlist(mockProduct1)).toBe(true);
  });

  it('should return false if a product is not in the wishlist', () => {
    service.addToWishlist(mockProduct1);
    expect(service.isItemInWishlist(mockProduct2)).toBe(false);
  });
});
