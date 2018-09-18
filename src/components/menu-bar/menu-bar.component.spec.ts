import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { AppComponent } from '../../app/app.component';
import { SearchComponent } from '../search/search.component';
import { ItemComponent } from '../item/item.component';
import { ItemPageComponent } from '../item-page/item-page.component';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { MatProgressSpinnerModule } from '../../../node_modules/@angular/material/progress-spinner';
import { ApiService } from '../../services/api/api.service';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

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

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

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
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /search when routeToHome() fired', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.routeToHome();
    expect(navigateSpy).toHaveBeenCalledWith([ '/search' ]);
  });

  it('should navigate to /search when home icon clicked', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    fixture.elementRef.nativeElement.querySelector('.spark-search-wrapper').click();
    expect(navigateSpy).toHaveBeenCalledWith([ '/search' ]);
  });

  it('should clear search input contents when routeToHome() fired', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    fixture.elementRef.nativeElement.querySelector('.search-input').value = 'car';
    component.routeToHome();
    expect(!fixture.elementRef.nativeElement.querySelector('.search-input').value.includes('car')).toBeTruthy();
  });

  it('should navigate to /search/car when submitSearch("car") fired', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.submitSearch('car');
    expect(navigateSpy).toHaveBeenCalledWith([ '/search', 'car' ]);
  });

  it('should navigate to /search/car when car typed and search icon clicked', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    fixture.elementRef.nativeElement.querySelector('.search-input').value = 'car';
    fixture.elementRef.nativeElement.querySelector('.search-button').click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith([ '/search', 'car' ]);
  });
});
