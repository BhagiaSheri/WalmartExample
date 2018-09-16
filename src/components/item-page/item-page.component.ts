import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  itemId: string;
  item: SearchResultModel;
  recommendations: SearchResultModel[];

  constructor(private route: ActivatedRoute,
              private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.itemId = p['itemId'];

      this.api.getItem(this.itemId).subscribe(result => {
        this.item = result['items'][0] as SearchResultModel;
        console.log(this.item);
      });

      this.api.getRecommendations(this.itemId).subscribe(result => {
        this.recommendations = (result as SearchResultModel[]).slice(0, 10);
        console.log(this.recommendations);
      });


    });
  }

}
