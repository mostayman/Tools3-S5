import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.fetchOrderDetails(orderId);
  }

  fetchOrderDetails(orderId: string | null) {
    this.http.get<any>(`http://localhost:5000/orders/${orderId}`)
      .subscribe(
        data => {
          this.order = data;
          console.log("Order details fetched successfully", data);
        },
        error => {
          console.error("Error fetching order details", error);
        }
      );
  }

  cancelOrder() {
    this.http.put(`http://localhost:5000/orders/${this.order._id}/cancel`, {})
      .subscribe(
        response => {
          console.log("Order cancelled successfully", response);
          this.order.status = 'Cancelled';
        },
        error => {
          console.error("Error cancelling order", error);
        }
      );
  }
}
