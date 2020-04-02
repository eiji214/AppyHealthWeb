import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HealthSystemSetup } from '../models/healthSystemSetup';
import { HealthSystemPractitioners } from '../models/healthSystemPractitioners';

@Component({
  selector: 'confirm-setup',
  templateUrl: './confirm.component.html',
  styleUrls: ['./setup.component.css']
})
export class ConfirmSetupComponent {
  healthSystem: HealthSystemSetup;

  healthSystemPractitioners: HealthSystemPractitioners[] = [];


  @Input()
  set hs(hs: HealthSystemSetup) {
    this.healthSystem = hs;

    let primary = new HealthSystemPractitioners;
    primary.healthSystem = hs.primary;

    this.healthSystemPractitioners.push(primary);
    for (let i = 0; i < hs.children.length; i++) {
      let child = new HealthSystemPractitioners;
      child.healthSystem = hs.children[0];
      this.healthSystemPractitioners.push(child);
    }

    for (let i = 0; i < hs.physicians.length; i++) {
      for (var j = 0; j < hs.physicians[i].healthSystems.length; j++) {
        let item = this.healthSystemPractitioners.filter(x => x.healthSystem.Id === hs.physicians[i].healthSystems[j].Id);
        item[0].physicians.push(hs.physicians[i].practitioner);
      }
    }

    for (let i = 0; i < hs.midLevels.length; i++) {
      for (var j = 0; j < hs.midLevels[i].healthSystems.length; j++) {
        let item = this.healthSystemPractitioners.filter(x => x.healthSystem.Id === hs.midLevels[i].healthSystems[j].Id);
        item[0].midLevels.push(hs.midLevels[i].practitioner);
      }
    }

    for (let i = 0; i < hs.staff.length; i++) {
      for (var j = 0; j < hs.staff[i].healthSystems.length; j++) {
        let item = this.healthSystemPractitioners.filter(x => x.healthSystem.Id === hs.staff[i].healthSystems[j].Id);
        item[0].staff.push(hs.staff[i].practitioner);
      }
    }
  }

  @Output() navigate = new EventEmitter<boolean>();

  back() {
    this.navigate.emit(false);
  }

  finish() {
    this.navigate.emit(true);
  }

}
