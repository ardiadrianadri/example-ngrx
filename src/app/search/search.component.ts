import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TableService } from '../table/table.service';
import { Table } from '../table/table.entities';
import { TableConfig } from '../table/table-config.entites';
import { MarvelElement } from '../entities/marvel-element.entity';

@Component({
  selector: 'ngrx-search-hero',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  public searchTitle = 'Search for your favorite hero';
  public resultSearch = '';
  public tableConfig: TableConfig = {
    defaultSize: 10,
    columsConfig: [{
      name: 'Name',
      key: 'name'
    }, {
      name: 'Description',
      key: 'description'
    }, {
      name: 'Date',
      key: 'date'
    }]
  };

  private _lastSearch: string;

  constructor(
    private _tableService: TableService,
    private _router: Router
  ) { }

  public launchSearch (name: string) {
    this._lastSearch = name;
    this._tableService.loadPage(0, 5, name);
  }

  public changePage(pageData: {page: number, size: number}) {
    this._tableService.loadPage(pageData.page, pageData.size, this._lastSearch);
  }

  public navDetails(character: MarvelElement) {
    this._router.navigateByUrl(`details-hero/${character}`);
  }
}
