import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngrx-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent {
  @Input()
  title = '';

  constructor (private _router: Router) {}

  public goHome() {
    this._router.navigateByUrl('/');
  }
}
