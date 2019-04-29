import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from './category';
import { Item } from "./item";


@Injectable()
export class DataService {

    private url = "/api";

    constructor(private http: HttpClient) {
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url+"/categories");
    }

    getItems(category: number): Observable<Item[]> {
        return this.http.get<Item[]>(this.url + "/categories/" + category);
    }

    getAllItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.url + "/categories/all_items");
    }
}
