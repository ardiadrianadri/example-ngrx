import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngrx-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent {
  @Input()
  title = '';
}
