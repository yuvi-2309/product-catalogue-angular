import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ProductButtonComponent } from './product-button.component';

describe('ProductButtonComponent', () => {
  let component: ProductButtonComponent;
  let fixture: ComponentFixture<ProductButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductButtonComponent],
    });
    fixture = TestBed.createComponent(ProductButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit addToCartClicked event and set isLoading to true', () => {
    spyOn(component.addToCartClicked, 'emit');

    component.onAddToCartClicked();

    expect(component.isLoading).toBe(true);
    expect(component.addToCartClicked.emit).toHaveBeenCalledWith(
      component.product
    );
  });

  it('should set isLoading to false', fakeAsync(() => {
    component.onAddToCartClicked();
    tick(2000);
    expect(component.isLoading).toBe(false);
  }));

  it('should set added to false after 2 seconds', fakeAsync(() => {
    component.onAddToCartClicked();
    tick(1000);
    expect(component.isLoading).toBe(false);

    tick(2000);
    expect(component.added).toBe(false);
  }));
});
