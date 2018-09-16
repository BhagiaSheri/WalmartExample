import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  largeImage: string;
  @Input()
  salePrice: number;
  @Input()
  stock: string;
  @Input()
  name: string;
  @Input()
  longDescription: string;
  @Input()
  displayDescription: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.largeImage);
  }

}
