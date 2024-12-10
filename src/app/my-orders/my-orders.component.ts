import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders = [
    {
      orderId: 1,
      pickupLocation: 'New York',
      dropOffLocation: 'Los Angeles',
      packageDetails: 'Electronics',
      deliveryTime: '2024-12-10T14:30',
      status: 'Pending'
    },
    {
      orderId: 2,
      pickupLocation: 'Chicago',
      dropOffLocation: 'San Francisco',
      packageDetails: 'Clothes',
      deliveryTime: '2024-12-12T10:00',
      status: 'Shipped'
    },
    {
      orderId: 3,
      pickupLocation: 'Houston',
      dropOffLocation: 'Miami',
      packageDetails: 'Books',
      deliveryTime: '2024-12-15T16:00',
      status: 'Delivered'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Ideally, fetch the orders from an API
    // this.getOrders();
  }

  // Mock method to simulate fetching orders (e.g., from a backend)
  getOrders() {
    // Example: Fetch orders via a service and assign to `this.orders`
  }
}
