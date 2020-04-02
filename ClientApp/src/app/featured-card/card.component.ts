import { Component, Input } from '@angular/core';


@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() name: string;
  @Input() title: string;
  @Input() specialty: string;
  @Input() buttonTitle: string;
  @Input() distance: number;
  @Input() avatar: string;
  constructor() {
  }

}
