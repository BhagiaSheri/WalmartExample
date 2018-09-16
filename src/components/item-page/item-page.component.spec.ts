import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPageComponent } from './item-page.component';
import { MatProgressSpinnerModule } from '../../../node_modules/@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '../../../node_modules/@angular/router';
import { SearchComponent } from '../search/search.component';
import { ItemComponent } from '../item/item.component';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
import { AppComponent } from '../../app/app.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { ApiService } from '../../services/api/api.service';

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

describe('ItemPageComponent', () => {
  let component: ItemPageComponent;
  let fixture: ComponentFixture<ItemPageComponent>;

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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
