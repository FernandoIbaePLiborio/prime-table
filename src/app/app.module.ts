import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NumberPagesComponent } from './shared/number-pages/number-pages.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { PagingService } from './paginador/paginador.service';

@NgModule({
  declarations: [
    AppComponent,
    NumberPagesComponent,
    PaginadorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PaginatorModule,
    HttpClientModule,
    DataTableModule
  ],
  providers: [PagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
