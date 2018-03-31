import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TableService } from './table.service';
import { TableConfig, ConfigColum } from './table-config.entites';
import { MarvelElement } from '../entities/marvel-element.entity';
import { Table } from './table.entities';

@Component({
  selector: 'ngrx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input()
  public tableConfig: TableConfig = null;

  public dataSource$: Observable<MarvelElement[]>;
  public loading = false;
  public configColumns: ConfigColum[];
  public sizePage: number;
  public numColumns: number;

  private _lastPage: number;
  private _actualPage: number;

  constructor( private _tableService: TableService ) { }

  ngOnInit() {
    this.sizePage = this.tableConfig.defaultSize;
    this.configColumns = this.tableConfig.columsConfig;
    this.numColumns = this.configColumns.length - 1 ;

    this.dataSource$ = this._tableService.table$
    .pipe(
      map((table: Table) => {
        this._lastPage = table.lastPage;
        this._actualPage = table.actualPage;
        this.sizePage = table.pageSize;
        this.loading = table.loading;

        return table.rows;
      })
    );
  }
}
