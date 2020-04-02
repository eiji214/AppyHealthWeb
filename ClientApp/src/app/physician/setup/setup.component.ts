import { Component } from '@angular/core';

import { HealthSystemSetup } from '../models/healthSystemSetup';

@Component({
  selector: 'setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {

  step: number = 1;

  healthSystem: HealthSystemSetup;

  selectedTier = 1;
  setSelectedTier(tier: number) {
    this.selectedTier = tier;
  }

  setHealthSystem(hs: HealthSystemSetup) {
    this.healthSystem = hs;
    this.step++;
  }

  navigate(b: boolean, selectedTier: number = null) {
    if (b) {
      this.step++;
    } else {
      this.step--;
    }
  }
   
}
