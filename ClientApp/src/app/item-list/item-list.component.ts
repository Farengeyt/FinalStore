import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';

import { ItemListService } from './item-list.service';

import { Item } from '../item';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [ItemListService]
})

export class ItemListComponent implements OnInit, OnChanges {
    

  @Input() public items: Item[];

  @Output() itemToCart = new EventEmitter<Item[]>();

  public itemsToOrder: Item[] = [];
  

  constructor(private itemListService: ItemListService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  private log(msg: string) {
    console.log(msg);
  }

  ngOnInit(): void {
  }

  addToCart(item: Item) {
    if (this.itemsToOrder.indexOf(item) == -1) {
      this.itemsToOrder.push(item);
      this.itemToCart.emit(this.itemsToOrder);
    }
  }

  choice(choise: number) {
    choise == 0 ? this.loadAllItems() : this.loadItemsFromCategory(choise);
  }

  loadAllItems() {
    this.itemListService.getAllItems()
      .subscribe((data: Item[]) => this.items = data)
  }

  loadItemsFromCategory(choise: number) {
    this.itemListService.getItems(choise)
      .subscribe((data: Item[]) => this.items = data)
  }

}
