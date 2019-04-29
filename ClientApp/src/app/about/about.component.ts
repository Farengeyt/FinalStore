import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';
import { HttpResponse } from '@angular/common/http';
import { Item } from '../item';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ AboutService ]
})
export class AboutComponent implements OnInit {

  public json: string;
  public items: Item[];

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.loadJson();
  }

  loadJson() {
    this.aboutService.getItems()
      .subscribe((data: HttpResponse<any>) => {
        console.log(data);
        this.items = data.body;
      });
  }

}
