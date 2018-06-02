import { Page } from './paginador.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pri-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {
  
  @Input() maxPages: number;
  @Input() current: number;
  @Input() postsPerPage: number[];
  @Input() itemsPerPage: number;

  @Output() changePage = new  EventEmitter<any>();

  pages: any[] = [];
  pageModel: Page = {
    page: this.current,
    itemsPerPage: this.itemsPerPage
  };

  constructor() { }

  ngOnInit() {
    if (this.maxPages) {
      this.createPages();
    }
  }

  setPage(page: number, perPage: number) {
    this.pageModel.page = page;
    this.pageModel.itemsPerPage = perPage;
    this.changePage.emit(this.pageModel);
  }

  createPages() {
    for(let i=1; i <= this.maxPages; i++) {
      this.pages.push(i);
    }
  }
}
