import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { AppComponent } from '../../app/app.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { ItemComponent } from '../item/item.component';
import { ItemPageComponent } from '../item-page/item-page.component';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { MatProgressSpinnerModule } from '../../../node_modules/@angular/material/progress-spinner';
import { ApiService } from '../../services/api/api.service';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { of } from 'rxjs';
import { SearchResultModel } from './search-result.model';

class MockApiService {
  getProducts(query: string) {
    return of(null);
  }

  getItem(itemId: string) {
    return of(null);
  }

  getRecommendations(itemId: string) {
    return of(null);
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let itemModel: SearchResultModel;

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
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: ApiService, useClass: MockApiService },
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    itemModel = { largeImage: 'http://thekarlbrown.com', itemId: 12345,
    description: 'meme', stock: 'Silly Pants', salePrice: 14.99, name: 'Karl Brown' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display prompt to search when no term has been provided', () => {
    component.searchTerm = undefined;
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.headline-text').innerText
    .includes('Please enter an item to search for!')).toBeTruthy();
  });

  it('should display loading icon when API call has not completed set manually', () => {
    component.searchTerm = 'cat';
    component.nowLoading = true;
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.progress-spinner')).toBeTruthy();
  });

  it('should not display loading icon when API call has completed set manually', () => {
    component.searchTerm = 'cat';
    component.nowLoading = false;
    fixture.detectChanges();
    expect(!fixture.elementRef.nativeElement.querySelector('.progress-spinner')).toBeTruthy();
  });

  it('should display the search query cat on the screen', () => {
    component.searchTerm = 'cat';
    component.nowLoading = false;
    component.searchResults = [ itemModel ];
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.search-term')
    .innerText.includes('You searched for: cat')).toBeTruthy();
  });

  it('should display if there is no search query on the screen', () => {
    component.searchTerm = 'cat';
    component.nowLoading = false;
    component.searchResults = undefined;
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.no-results')
    .innerText.includes('There were no results for: cat')).toBeTruthy();
  });

  it('should display search results on the screen if present', () => {
    component.searchTerm = 'cat';
    component.nowLoading = false;
    component.searchResults = [ itemModel ];
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.item')).toBeTruthy();
  });

});
