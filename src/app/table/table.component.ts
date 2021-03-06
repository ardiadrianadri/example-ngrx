import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TableService } from './table.service';
import { TableConfig, ConfigColum } from './table-config.entites';
import { MarvelElement } from '../entities/marvel-element.entity';
import { Table, DataType } from './table.entities';

@Component({
  selector: 'ngrx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input()
  public tableConfig: TableConfig = null;

  @Input()
  public dataType: DataType;

  @Output()
  public requestPage: EventEmitter<{page: number, size: number}> = new EventEmitter<{page: number, size: number}>();

  @Output()
  public eventLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public elementSelected: EventEmitter<MarvelElement> = new EventEmitter<MarvelElement>();

  public dataSource$: Observable<MarvelElement[]>;
  public loading = true;
  public configColumns: ConfigColum[];
  public sizePage: number;
  public numColumns: number;
  public lastPage: number;
  public pageSizeOptions = [5, 10, 20];
  public actualPage: number;

  constructor( private _tableService: TableService ) { }

  ngOnInit() {
    this.sizePage = this.tableConfig.defaultSize;
    this.configColumns = this.tableConfig.columsConfig;
    this.numColumns = this.configColumns.length - 1 ;

    this.dataSource$ = this._tableService.getTable(this.dataType)
    .pipe(
      map((table: Table) => {
        this.lastPage = table.lastPage;
        this.actualPage = table.actualPage;
        this.sizePage = table.pageSize;
        this.eventLoading.emit(table.loading);

        if (this.tableConfig.lengthDescription) {
          table.rows = table.rows.map((row: MarvelElement) => {
            row.description = (row.description) ? row.description.substring(0, this.tableConfig.lengthDescription) : '';

            return row;
          });
        }
        return table.rows;
      })
    );
  }

  public changePage (page) {
    this.actualPage = (page < 0) ? 0 : (page > this.lastPage) ? this.lastPage : page;

    this.requestPage.emit({page: this.actualPage, size: this.sizePage});
  }

  public changeSize () {
    this.requestPage.emit({page: 0, size: this.sizePage});
  }

  public onClickElement (row: MarvelElement) {
    this.elementSelected.emit(row);
  }
}
