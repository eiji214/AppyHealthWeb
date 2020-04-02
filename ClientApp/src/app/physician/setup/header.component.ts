import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentStep: number;

  @Input()
  set step(s: number) {
    this.currentStep = s;
  }
  
  getClass(i: number) {
    if (i === this.currentStep) {
      return 'active';
    }

    return null;
  }
}
