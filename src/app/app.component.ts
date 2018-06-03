import { PagingService } from './paginador/paginador.service';
import { NumberPagesComponent } from './shared/number-pages/number-pages.component';
import { Component, ViewChild, Output } from '@angular/core';
import { DataTableModule, DataTable } from 'primeng/components/datatable/datatable';
import { CarService } from './app.component.service';
import { Car } from './app.model';
import { LazyLoadEvent } from 'primeng/primeng';
import { Observable } from 'rxjs'
import { NumberPages } from './shared/number-pages/number-pages.model';
import { Paginador, Page } from './paginador/paginador.model';
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
    console.log(event);
    this.loadPage(event.first / event.rows + 1, event.rows);
  }

  setPage(n: any) {
    this.dataTable.reset();
    let paging = {
      first: ((n - 1) * this.dataTable.rows),
      rows: this.dataTable.rows
    };
    this.dataTable.first = paging.first;
    this.dataTable.paginate();
  }

  setRows(n: number) {
    this.dataTable.reset();
    this.dataTable.rows = n;
    this.dataTable.paginate();
  }

  loadPage(page: number, rows: number) {
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('rows', rows.toString());
    this.carService.getCarsSmall().subscribe(cars => this.cars = cars),
      error => {
        console.log(error);
      };
  }
}
