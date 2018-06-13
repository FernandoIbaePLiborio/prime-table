import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NumberPagesComponent } from './shared/number-pages/number-pages.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { PagingService } from './paginador/paginador.service';
import { ROUTES } from './app.route';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

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
    DataTableModule,
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [PagingService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

