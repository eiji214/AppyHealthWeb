import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HealthSystem } from '../../models/healthSystem';
import { PractitionerHealthSystems } from '../../models/practitionerHealthSystems';
import { Practitioner } from '../../profile/models/practitioner';

import { PhysicianService } from "../../physician.service";

@Component({
  selector: 'physician-dialog',
  templateUrl: './physician-dialog.component.html',
  styleUrls: ['../setup.component.css']
})
export class PhysicianDialogComponent {
  provider: PractitionerHealthSystems;
  healthSystemDropdownItems: HealthSystem[] = [];
  selectedHealthSystem: number;

  npi: string;

  showError: boolean;
  showWarning: boolean;

  buttonText: string;
  headerText: string;

  constructor(
    private physicianService: PhysicianService, 
    public dialogRef: MatDialogRef<PhysicianDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.provider) {
      this.provider = data.provider;
      this.buttonText = "Save Changes";
      this.headerText = "Edit";
    } else {
      this.buttonText = "Add to Practice";
      this.headerText = "Add";
    }

    this.healthSystemDropdownItems = data.healthSystems;
  }

  close() {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close(this.provider);
  }

  locationSelected(event): void {
    const val = event.value;

    if (!val) {
      this.selectedHealthSystem = null;
      return;
    }

    const dup = this.provider.healthSystems.filter(x => x.Id == val);
    if (dup.length) {
      this.selectedHealthSystem = null;
      return;
    }

    const item = this.healthSystemDropdownItems.filter(x => x.Id == val);
    this.provider.healthSystems.push(item[0]);

    this.selectedHealthSystem = null;
  }

  search() {
    this.showWarning = false;
    this.showError = false;

    this.physicianService.searchProvider(this.npi)
      .subscribe(result => {
        if (!result) {
          this.showWarning = true;
          return;
        }
        else {
          this.provider = new PractitionerHealthSystems;
          this.provider.practitioner = result;
        }
      }, error => {
        this.showError = true;
      });
  }

  enterManually() {
    let h = new PractitionerHealthSystems;
    h.practitioner = new Practitioner;
    h.healthSystems = [];

    this.provider = h;
  }

}
