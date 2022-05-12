import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataBase } from './in-memory-database';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesModule } from './pages/categories/categories.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CategoriesModule,  
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataBase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
