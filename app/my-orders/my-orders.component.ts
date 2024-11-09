import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<any[]>('http://localhost:5000/orders')
      .subscribe(
        data => {
          this.orders = data;
          console.log("Orders fetched successfully", data);
        },
        error => {
          console.error("Error fetching orders", error);
        }
      );
  }
}
