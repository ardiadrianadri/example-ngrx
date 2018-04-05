import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngrx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {

  @Input()
  public cardTitle = '';
}
