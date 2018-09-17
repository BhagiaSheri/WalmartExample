import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { AppComponent } from '../../app/app.component';
import { SearchComponent } from '../search/search.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { ItemPageComponent } from '../item-page/item-page.component';
import { MatProgressSpinnerModule } from '../../../node_modules/@angular/material/progress-spinner';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { ApiService } from '../../services/api/api.service';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

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
        {provide: APP_BASE_HREF, useValue: '/'},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

  it('should properly set Name field', () => {
    fixture.componentInstance.name = 'Karl Brown';
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.item-name').innerText.includes('Karl Brown')).toBeTruthy();
  });

  it('should properly set Description field', () => {
    fixture.componentInstance.description = 'Full Stack Developer';
    fixture.detectChanges();
    expect(fixture.elementRef.nativeElement.querySelector('.item-description').innerText.includes('Full Stack Developer')).toBeTruthy();
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

  it('should route to /item/12345 when item clickable and itemId 12345 and selectItem() fired', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.itemClickable = true;
    component.itemId = '12345';
    fixture.detectChanges();
    component.selectItem();
    expect(navigateSpy).toHaveBeenCalledWith([ '/item', '12345' ]);
  });

  it('should not route to /item/12345 when item not clickable and itemId 12345 and selectItem() fired', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.itemClickable = false;
    component.itemId = '12345';
    fixture.detectChanges();
    component.selectItem();
    expect(navigateSpy).not.toHaveBeenCalledWith([ '/item', '12345' ]);
  });
  
  it('should route to /item/12345 when item clickable and itemId 12345 and item clicked', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.itemClickable = true;
    component.itemId = '12345';
    fixture.detectChanges();
    fixture.elementRef.nativeElement.querySelector('.item-wrapper').click();
    expect(navigateSpy).toHaveBeenCalledWith([ '/item', '12345' ]);
  });
  
});
