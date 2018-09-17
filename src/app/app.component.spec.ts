import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MenuBarComponent } from '../components/menu-bar/menu-bar.component';
import { SearchComponent } from '../components/search/search.component';
import { ItemComponent } from '../components/item/item.component';
import { ItemPageComponent } from '../components/item-page/item-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../services/api/api.service';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '../../node_modules/@angular/router/testing';

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
        RouterTestingModule.withRoutes([]),
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
