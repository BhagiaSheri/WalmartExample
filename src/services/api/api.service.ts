import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Note: This key is from a public API being posted on a low traffic Github account so 
  // I feel reasonably safe placing it here although exercise caution publicly posting API keys
  private apiKey: string = "3aenf47py969yj4gec8cdhqw"
  // private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
  // .set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS')
  // .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, content-type');
  constructor(private http: HttpClient) { }

  getProducts(query: string) {
    // The instructors stated to keep things simple
    let url = `http://api.walmartlabs.com/v1/search?apiKey=${this.apiKey}&query=${query}&order=asc`;
    return this.http.get(url);
  }
}
