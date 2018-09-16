import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string;
  nowLoading = false;
  searchResults: SearchResultModel[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.searchTerm = p['query'];
      if (this.searchTerm !== undefined) {
        this.nowLoading = true;
        this.acquireSearchResults();
      }
    });
  }

  private acquireSearchResults() {
    this.api.getProducts(this.searchTerm).subscribe(result => {
      this.searchResults = result['items'] as SearchResultModel[];
      console.log(this.searchResults[0].itemId);
      this.nowLoading = false;
    });
  }

  private selectItem(itemId: number) {
    this.router.navigate(['/item', itemId]);
  }

}
