import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.css']
})
export class AssignedOrdersComponent implements OnInit {
  assignedOrders: any[] = [];

  constructor(private readonly orderService: OrderService) {}

  ngOnInit(): void {
    this.loadAssignedOrders();
  }

  loadAssignedOrders(): void {
    this.orderService.getAssignedOrders().subscribe((orders: any[]) => {
      this.assignedOrders = orders;
    });
  }

  acceptOrder(order: any): void {
    this.orderService.acceptOrder(order.id).subscribe(() => {
      order.status = 'Accepted';
    });
  }

  declineOrder(order: any): void {
    this.orderService.declineOrder(order.id).subscribe(() => {
      order.status = 'Declined';
    });
  }
}
