import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { SearchResultModel } from './search-result.model';

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
      this.nowLoading = false;
    });
  }
}
