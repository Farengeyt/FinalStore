import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AboutService {

  private url = "/api/categories/all_items";

  constructor(private http: HttpClient) {
  }

  getItems() {
    return this.http.get(this.url, { observe: 'response' });
  }

  
}
