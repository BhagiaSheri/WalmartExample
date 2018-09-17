import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  description: string;
  @Input()
  itemId: string;
  @Input()
  itemClickable: boolean;
  @Input()
  suggestedItem: boolean;

  constructor(private router: Router) { }

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

  formatHtmlInDescriptions() {
    if (this.description) {
      this.description = this.replaceAll(this.description, '&lt;', '<');
      this.description = this.replaceAll(this.description, '&gt;', '>');
      this.description = this.replaceAll(this.description, '&quot;', '"');
    }
  }

  selectItem() {
    if (this.itemClickable) {
      this.router.navigate(['/item', this.itemId]);
    }
  }
}
