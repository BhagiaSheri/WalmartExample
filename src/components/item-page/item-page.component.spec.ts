import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultModel } from '../search/search-result.model';
import { ItemPageComponent } from './item-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ItemComponent } from '../item/item.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from '../../app/app.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api/api.service';
import { HttpClient } from '../../../node_modules/@types/selenium-webdriver/http';

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

let itemModel: SearchResultModel;

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
    itemModel = { largeImage: 'http://thekarlbrown.com', itemId: 12345,
    shortDescription: 'meme', stock: 'Silly Pants', salePrice: 14.99, name: 'Karl Brown' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Loading Icon when nowLoadingGetItem', () => {
    component.nowLoadingGetItem = true;
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.loading-icon')).toBeTruthy();
  });

  it('should display Loading Icon when nowLoadingGetRecommendations', () => {
    component.nowLoadingGetRecommendations = true;
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.loading-icon')).toBeTruthy();
  });

  it('should not display Loading Icon when done loading set manually', () => {
    component.nowLoadingGetItem = false;
    component.nowLoadingGetRecommendations = false;
    component.item = itemModel;
    component.recommendations = [ itemModel ];
    fixture.detectChanges();
    expect(!fixture.elementRef.nativeElement.querySelector('.loading-icon')).toBeTruthy();
  });

  it('should display item when present',
   () =>  {
    component.nowLoadingGetItem = false;
    component.nowLoadingGetRecommendations = false;
    component.item = itemModel;
    component.recommendations = [ itemModel ];
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.item')).toBeTruthy();
  });

  it('should display recommendations when present',
   () =>  {
    component.nowLoadingGetItem = false;
    component.nowLoadingGetRecommendations = false;
    component.item = itemModel;
    component.recommendations = [ itemModel, itemModel, itemModel ];
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.recommendation')).toBeTruthy();
  });

  it('should display message when no recommendations are present',
   () =>  {
    component.nowLoadingGetItem = false;
    component.nowLoadingGetRecommendations = false;
    component.item = itemModel;
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.no-recommendations').innerText
    .includes('There are currently no recommendations for this item!')).toBeTruthy();
  });
});
