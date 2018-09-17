import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { APP_BASE_HREF } from '../../../node_modules/@angular/common';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BrowserModule,
      HttpClientModule,
    ],
    providers: [
      ApiService,
      {provide: APP_BASE_HREF, useValue: '/'}
    ],
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
