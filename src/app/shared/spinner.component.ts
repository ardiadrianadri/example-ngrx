import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngrx-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})

export class SpinnerComponent {

  @Input()
  public loading = false;
}
