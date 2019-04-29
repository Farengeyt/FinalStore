import { Component, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, OnInit, OnDestroy } from '@angular/core';

import { DataService } from './data.service';

import { Category } from './category';
import { Item } from './item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DataService]
})
export class AppComponent implements OnInit {


  categories: Category[];                // массив категорий
  items: Item[];                         // массив товаров
  itemsForCart: Item[] = [];
  cartStatus: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadProducts();    // загрузка данных при старте компонента
    this.loadAllItems();
  }

  itemsCart(items: Item[]) {
    for (var i of items) {
      this.log(`item :${i.model}`)
    }
    if (items.length != 0) {
      for (var temp of items) {
        if (/*this.itemsForCart.indexOf(temp) == -1*/ !this.itemsForCart.some(function (element, index, array) { return element.id == temp.id })) {
          this.itemsForCart.push(temp);
        }
      }
    }
  }

  

  outputFromCart(items: Item[]) {
    this.itemsForCart = items;
  }

  onChanged(choise: number) {

    this.log(`chois: ${choise}`);
    choise == 0 ? this.loadAllItems() : this.loadItemsFromCategory(choise);
    this.log(`chois: ${choise}`);
  }

  changeCartStatus(status: boolean) {
    this.cartStatus = status;
  }

  private log(msg: string) {
    console.log(msg);
  }

  loadAllItems() {
    this.dataService.getAllItems()
      .subscribe((data: Item[]) => this.items = data)
  }

  loadItemsFromCategory(choise: number) {
    this.dataService.getItems(choise)
      .subscribe((data: Item[]) => this.items = data)
  }

  // получаем данные через сервис
  loadProducts() {
    this.dataService.getCategories()
      .subscribe((data: Category[]) => this.categories = data)

  }
}
