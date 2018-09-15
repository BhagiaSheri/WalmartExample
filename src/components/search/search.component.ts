import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: string;
  nowLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private api: ApiService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.searchTerm = p['query'];
      if (this.searchTerm != undefined) {
        this.nowLoading = true;
        this.acquireSearchResults();
      }
    });
  }

  private acquireSearchResults() {
    this.api.getProducts(this.searchTerm).subscribe(result => {
      console.log(result);
    })
  }

}
