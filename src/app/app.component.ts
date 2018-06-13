import { element } from 'protractor';
import { PagingService } from './paginador/paginador.service';
import { NumberPagesComponent } from './shared/number-pages/number-pages.component';
import { CarService } from './app.component.service';
import { Car } from './app.model';
import { LazyLoadEvent, SortEvent, DataTable, Dialog, ConfirmationService } from 'primeng/primeng';
import { NumberPages } from './shared/number-pages/number-pages.model';
import { Paginador, Page, ConsultaFiltro } from './paginador/paginador.model';
import { EventEmitter } from 'events';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'pri-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CarService]
})
export class AppComponent {
  @ViewChild(DataTable) dataTable: DataTable;
  @ViewChild('content') content: ElementRef;

  cars: Car[]
  paginador: Paginador
  filtro: ConsultaFiltro
  car: Car;
  first: number
  rows: number

  searchForm: FormGroup
  searchControl: FormControl

  numberPages: NumberPages[] = [
    { numero: 10 },
    { numero: 50 },
    { numero: 100 }
  ]

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService) { }

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            alert('yap')
        }
    });
  }

  ngOnInit() {
    this.filtro = new ConsultaFiltro()
    this.carService.cars().subscribe(cars => this.cars = cars)
  }

  pageChanged(event: LazyLoadEvent) {
    this.first = this.dataTable.first;
    this.rows = this.dataTable.rows;
    this.loadPage(this.first / this.rows + 1, this.rows);
  }

  pageSort(event: SortEvent) {
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
    this.dataTable.paginate();
  }

  setRows(n: number) {
    this.dataTable.reset();
    this.dataTable.rows = n;
    this.dataTable.paginate();
  }

  setFilter(event: any) {
    let json = JSON.stringify(event.filters);
    let objetos = JSON.parse(json);
    JSON.parse(json, (key, value) => {
      let valor;
      let obj;
      for (let n in objetos) {
        if (typeof value === 'string' && valor !== value && n !== obj) {
          this.filtro[n] = value;
          valor = value;
          obj = n;
        }
      }
    });
    console.log(this.filtro);
    this.dataTable.paginate();

    /* let obj = JSON.parse.length; */
    /*     console.log(Object.getOwnPropertyNames(objetos).sort()); 
        Object.getOwnPropertyNames(event.filters).forEach(function(val, idx, array) {
          console.log(val + ' -> ' + event.filters[val]);
        });*/
  }

  
  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+name)) {
      console.log("Implement delete functionality here");
    }
  }
  
  downloadPDF(){
    console.log("ok");
    
    const doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('TesteHandler.pdf');
  }

  loadPage(page: number, rows: number) {
    this.filtro.offset = (page - 1) * rows;
    this.filtro.limit = rows;
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('rows', rows.toString());
    this.carService.cars(this.filtro).subscribe(cars => this.cars = cars),
      error => {
        console.log(error);
      };
  }

  /**
   * Realiza a exportação da grid de funcionalidades para PDF
   */
  /* exportPDF = () => {
    this.funcionalidadeService.exportacaoPDF(this.funcionalidadeFiltro).subscribe(
      result => {
        var link = document.createElement("a");
        link.download = "funcionlidade.pdf";
        link.href = "data:application/pdf;base64," + result;
        document.body.appendChild(link);
        link.click();
      },
      error => { }
    );
  } */
}
