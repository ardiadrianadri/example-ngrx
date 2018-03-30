import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngrx-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})

export class FormSearchComponent {

  public heroName: string;

  @Output()
  public searchEmit: EventEmitter<string> = new EventEmitter<string>();

  public searchEvent() {
    this.searchEmit.emit(this.heroName);
  }
}
