import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { AppComponent } from '../../app/app.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { ItemComponent } from '../item/item.component';
import { ItemPageComponent } from '../item-page/item-page.component';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { MatProgressSpinnerModule } from '../../../node_modules/@angular/material/progress-spinner';
import { ApiService } from '../../services/api/api.service';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';

const appRoutes: Routes = [
  { path: 'item/:itemId', component: ItemPageComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  { path: '**', component: SearchComponent }
];

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent,
        MenuBarComponent,
        ItemComponent,
        ItemPageComponent,
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        ApiService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
