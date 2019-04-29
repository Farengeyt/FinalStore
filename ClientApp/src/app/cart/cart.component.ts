import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../item';
import { Order } from '../order';
import { PartOfOrder } from '../part-of-order';

import { CartService } from './cart.service'

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {

  @Input() public itemsToOrder: Item[];
  @Output() public curentCart = new EventEmitter<Item[]> ();

  public order: Order = new Order();
  public partsOfOrder: PartOfOrder[] = [];
  public totalSum: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    console.log(`thisnew ${this.itemsToOrder}`);
    console.log(`this ${this.partsOfOrder}`);
    for (var item of this.itemsToOrder) {

      this.partsOfOrder.push(new PartOfOrder(0, 1, item.id, item));
    }
    console.log(`this ${this.partsOfOrder}`);
    this.order.partOfOrders = this.partsOfOrder;
    this.countTotalSum();
  }

  curentStatusCart() {
    let tempItems: Item[] = [];
    for (var cur of this.partsOfOrder) {
      tempItems.push(cur.item);
    }
    this.curentCart.emit(tempItems);
  }

  sendOrderToServer() {
    this.order.partOfOrders = this.partsOfOrder;
    this.cartService.createOrder(this.order)
      .subscribe((data: Order) => this.order = (data));


  }

  countTotalSum() {
    let tempList: number[] = [];
    for (var part of this.partsOfOrder) {
      tempList.push(part.amount * part.item.price);
    }
    if (tempList.length != 0) {
      this.totalSum = tempList.reduce(function (a, b) { return a + b; });
    }
    this.curentStatusCart();
  }

  deleteFromCart(part: PartOfOrder) {
    if (this.partsOfOrder.indexOf(part) != -1) {
      let deleteIndex = this.partsOfOrder.indexOf(part);
      this.partsOfOrder = this.partsOfOrder.slice(0, deleteIndex).concat(this.partsOfOrder.slice(deleteIndex + 1));
      this.countTotalSum();
      this.order.partOfOrders = this.partsOfOrder;
      this.curentStatusCart();
    }
    this.curentStatusCart();
  }

}
