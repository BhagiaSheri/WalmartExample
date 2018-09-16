import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  submitSearch(value: string) {
    if (value !== '') {
      this.router.navigate(['/search', value]);
    }
  }

  routeToHome() {
    this.router.navigate(['/search']);
  }
}
