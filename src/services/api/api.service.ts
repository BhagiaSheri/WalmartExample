import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Note: This key is from a public API being posted on a low traffic Github account so
  // I feel reasonably safe placing it here although best practice is to exercise caution publicly posting API keys
  private apiKey = '3aenf47py969yj4gec8cdhqw';
  constructor(private http: HttpClient) { }

  // The instructions stated to keep things simple so I simplified the API calls
  // I also did not cache any of the results although using a Service or Local Storage would
  // be both reasonable approaches
  getProducts(query: string) {
    const url = `http://api.walmartlabs.com/v1/search?apiKey=${this.apiKey}&query=${query}&order=asc`;
    return this.http.get(url);
  }

  getItem(itemId: string) {
    const url = `http://api.walmartlabs.com/v1/items?apiKey=${this.apiKey}&ids=${itemId}`;
    return this.http.get(url);
  }

  getRecommendations(itemId: string) {
    const url = `http://api.walmartlabs.com/v1/nbp?apiKey=${this.apiKey}&itemId=${itemId}`;
    return this.http.get(url);
  }
}
