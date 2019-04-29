import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../order';


@Injectable()
export class CartService {

  private url = "/api/createOrder";

  constructor(private http: HttpClient) {
  }

    createOrder(order: Order) {
      return this.http.post(this.url, order);
  }
  
}
