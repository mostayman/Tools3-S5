import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assign-orders',
  templateUrl: './assign-orders.component.html',
  styleUrls: ['./assign-orders.component.css']
})
export class AssignOrdersComponent implements OnInit {
  orders: any[] = [];
  couriers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchCouriers();
  }

  fetchOrders() {
    this.http.get<any[]>('http://localhost:5000/admin/unassigned-orders')
      .subscribe(
        data => {
          this.orders = data;
          console.log("Unassigned orders fetched successfully", data);
        },
        error => {
          console.error("Error fetching unassigned orders", error);
        }
      );
  }

  fetchCouriers() {
    this.http.get<any[]>('http://localhost:5000/admin/couriers')
      .subscribe(
        data => {
          this.couriers = data;
          console.log("Couriers fetched successfully", data);
        },
        error => {
          console.error("Error fetching couriers", error);
        }
      );
  }

  assignCourier(orderId: string, courierId: string) {
    this.http.put(`http://localhost:5000/orders/${orderId}/assign`, { courierId })
      .subscribe(
        response => {
          console.log(`Order ${orderId} assigned to courier ${courierId}`, response);
        },
        error => {
          console.error(`Error assigning order ${orderId}`, error);
        }
      );
  }
}
