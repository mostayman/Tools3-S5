import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
  order = {
    pickupLocation: '',
    dropoffLocation: '',
    packageDetails: '',
    deliveryTime: ''
  };
  
  constructor(private http: HttpClient, private router: Router) {}

  createOrder() {
    this.http.post('http://localhost:5000/orders', this.order)
      .subscribe(
        response => {
          console.log("Order created successfully", response);
          this.router.navigate(['/my-orders']);
        },
        error => {
          console.error("Error creating order", error);
        }
      );
  }
}
