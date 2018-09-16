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
  shortDescription: string;

  constructor() { }

  ngOnInit() {
    // Converts common HTML sequences for use with innerHTML
    this.formatHtmlInDescriptions();
  }

  private escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }

  private replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  private formatHtmlInDescriptions() {
    if (this.longDescription) {
      this.longDescription = this.replaceAll(this.longDescription, '&lt;', '<');
      this.longDescription = this.replaceAll(this.longDescription, '&gt;', '>');
      this.longDescription = this.replaceAll(this.longDescription, '&quot;', '"');
    }

    if (this.shortDescription) {
      this.shortDescription = this.replaceAll(this.shortDescription, '&lt;', '<');
      this.shortDescription = this.replaceAll(this.shortDescription, '&gt;', '>');
      this.shortDescription = this.replaceAll(this.shortDescription, '&quot;', '"');
    }
  }
}
