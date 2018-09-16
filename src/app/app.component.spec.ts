import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MenuBarComponent } from '../components/menu-bar/menu-bar.component';
import { SearchComponent } from '../components/search/search.component';
import { ItemComponent } from '../components/item/item.component';
import { ItemPageComponent } from '../components/item-page/item-page.component';
import { BrowserModule } from '../../node_modules/@angular/platform-browser';
import { RouterModule, Routes } from '../../node_modules/@angular/router';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { MatProgressSpinnerModule } from '../../node_modules/@angular/material/progress-spinner';
import { ApiService } from '../services/api/api.service';
import { APP_BASE_HREF } from '../../node_modules/@angular/common';

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

describe('AppComponent', () => {
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
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'walmart-example'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('walmart-example');
  }));
  it('should render containing the menu bar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.menu-bar-container'));
  }));
});
