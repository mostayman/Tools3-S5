import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderStatusComponent } from './update-order-status.component';

describe('UpdateOrderStatusComponent', () => {
  let component: UpdateOrderStatusComponent;
  let fixture: ComponentFixture<UpdateOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrderStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
