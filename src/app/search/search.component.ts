import { Component } from '@angular/core';
import { TableService } from '../table/table.service';
import { Table } from '../table/table.entities';

@Component({
  selector: 'ngrx-search-hero',
  templateUrl: 'search.component.html'
})

export class SearchComponent {

  public searchTitle = 'Search for your favorite hero';
  public resultSearch = '';

  private _nameSearch: string;

  constructor( private _tableService: TableService) { }

  public launchSearch (name: string) {
    this._nameSearch = name;

    this._tableService.loadPage(0, 5, this._nameSearch)
    .subscribe(
      (data: Table) => { this.resultSearch = JSON.stringify(data); },
      (error: any) => { throw new Error(error); }
    );
  }
}
