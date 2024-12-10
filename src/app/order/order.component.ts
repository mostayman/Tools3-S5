import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.orderForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropOffLocation: ['', Validators.required],
      packageDetails: ['', Validators.required],
      deliveryTime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      console.log('Order Data:', orderData);
    }
  }
}