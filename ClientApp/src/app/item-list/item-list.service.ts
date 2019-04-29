import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from "../item";


@Injectable()
export class ItemListService {

  private url = "/api";

  constructor(private http: HttpClient) {
  }

  getItems(category: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.url + "/categories/" + category);
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url + "/categories/all_items");
  }
}
