import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProductFoundComponent } from './no-product-found.component';

describe('NoProductFoundComponent', () => {
  let component: NoProductFoundComponent;
  let fixture: ComponentFixture<NoProductFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoProductFoundComponent],
    });
    fixture = TestBed.createComponent(NoProductFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
