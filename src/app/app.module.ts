import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from '../components/search/search.component';
import { MenuBarComponent } from '../components/menu-bar/menu-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const appRoutes: Routes = [
  { path: 'search/:query', component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  { path: '**', component: SearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
