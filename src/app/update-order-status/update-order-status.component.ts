import { Component, Input } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.css']
})
export class UpdateOrderStatusComponent {
  @Input() order: any;
  statuses = ['Picked Up', 'In Transit', 'Delivered'];

  constructor(private orderService: OrderService) {}

  updateStatus(): void {
    this.orderService.updateOrderStatus(this.order.id, this.order.status)
      .subscribe(() => {
        alert('Order status updated successfully');
      });
  }
}
