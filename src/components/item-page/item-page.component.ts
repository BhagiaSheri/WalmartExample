import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ApiService } from '../../services/api/api.service';
import { SearchResultModel } from '../search/search-result.model';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  itemId: string;
  item: SearchResultModel;
  recommendations: SearchResultModel[];
  nowLoadingGetItem = true;
  nowLoadingGetRecommendations = true;

  constructor(private route: ActivatedRoute,
              private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.itemId = p['itemId'];


      this.nowLoadingGetItem = true;
      this.api.getItem(this.itemId).subscribe(result => {
        this.item = result['items'][0] as SearchResultModel;
        this.nowLoadingGetItem = false;
        console.log(this.item.stock);
      });

      this.nowLoadingGetRecommendations = true;
      this.api.getRecommendations(this.itemId).subscribe(result => {
        // There is a possibility that there are no recommendations for this product
        if (result['errors'] === undefined) {
          this.recommendations = (result as SearchResultModel[]).slice(0, 10);
        }

        this.nowLoadingGetRecommendations = false;
        console.log(this.recommendations);
      });


    });
  }

}
