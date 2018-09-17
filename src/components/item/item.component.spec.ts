import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Location } from '@angular/common';
import { ItemComponent } from './item.component';
import { AppComponent } from '../../app/app.component';
import { SearchComponent } from '../search/search.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { ItemPageComponent } from '../item-page/item-page.component';
import { MatProgressSpinnerModule } from '../../../node_modules/@angular/material/progress-spinner';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { Routes, RouterModule } from '../../../node_modules/@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { ApiService } from '../../services/api/api.service';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
// import { Router } from '@angular/router';

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

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  // let location: Location;
  // let router: Router;

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
        // RouterTestingModule.withRoutes(appRoutes),
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        ApiService,
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // router = TestBed.get(Router);
    // location = TestBed.get(Location);
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set to In Stock when stock is Available', () => {
    fixture.componentInstance.stock = 'Available';
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('In Stock')).toBeTruthy();
  });

  it('should set to Out of Stock when stock is not Available', () => {
    fixture.componentInstance.stock = 'secretSauce';
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('Out of Stock')).toBeTruthy();
  });

  it('should convert characters to HTML friendly', () => {
    component.description = '&lt; &quot; &gt;';
    component.formatHtmlInDescriptions();
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('<')).toBeTruthy();
    expect(!fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('&lt;')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('>')).toBeTruthy();
    expect(!fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('&gt;')).toBeTruthy();
    expect(fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('<')).toBeTruthy();
    expect(!fixture.elementRef.nativeElement.querySelector('.item-pricing').innerText.includes('&quot;')).toBeTruthy();
  });

  // it('should convert characters to HTML friendly', () => {
  //   component.itemClickable = true;
  //   component.itemId = '12345';
  //   fixture.detectChanges();
  //   component.selectItem();
  //   console.log(location.path());
  //   expect(false).toBeTruthy();
  // });
});
