import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Category } from '../category'

import { NavBarService } from './nav-bar.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [NavBarService]
})
export class NavBarComponent {
  @Input() public categories: Category[];

  @Output() public cartOpen = new EventEmitter<boolean>();
  openCart(status: boolean) {
    this.cartOpen.emit(status);
  }

  @Output() onChoise = new EventEmitter<number>();
  choise(id: number) {
    console.log(`chois: ${id}`);
    this.onChoise.emit(id);
    this.openCart(false);
  }

  constructor(private navBarService: NavBarService) {
  }

}
