import { PagingService } from './paginador/paginador.service';
import { NumberPagesComponent } from './shared/number-pages/number-pages.component';
import { Component, ViewChild, Output } from '@angular/core';
import { DataTableModule, DataTable } from 'primeng/components/datatable/datatable';
import { CarService } from './app.component.service';
import { Car } from './app.model';
import {LazyLoadEvent, SortEvent} from 'primeng/primeng';
import { Observable } from 'rxjs'
import { NumberPages } from './shared/number-pages/number-pages.model';
import { Paginador, Page, ConsultaFiltro } from './paginador/paginador.model';
import { EventEmitter } from 'events';

@Component({
  selector: 'pri-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CarService]
})
export class AppComponent {
  @ViewChild(DataTable) dataTable: DataTable;
  cars: Car[];
  paginador: Paginador;
  filtro: ConsultaFiltro;

  first: number;
  rows: number;

  numberPages: NumberPages[] = [
    { numero: 10 },
    { numero: 50 },
    { numero: 100 }
  ]

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getCarsSmall().subscribe(cars => this.cars = cars);
  }

  pageChanged(event: LazyLoadEvent) {
    this.first = this.dataTable.first;
    this.rows = this.dataTable.rows;
    this.loadPage(this.first / this.rows + 1, this.rows);
  }

  pageSort(event: SortEvent){
    this.dataTable.sortField = event.field; 
    this.dataTable.sortOrder = event.order; 
    this.dataTable.paginate();
  }

  setPage(n: any) {
    this.dataTable.reset();
    let paging = {
      first: ((n - 1) * this.dataTable.rows),
      rows: this.dataTable.rows
    };
    this.dataTable.first = paging.first;
  }

  setRows(n: number) {
    this.dataTable.rows = n;
    this.dataTable.paginate();
  }

  loadPage(page: number, rows: number) {
    console.log('teste');
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('rows', rows.toString());
    this.carService.getCarsSmall(params.get('page'), params.get('rows')).subscribe(cars => this.cars = cars),
      error => {
        console.log(error);
      };
  }
}
