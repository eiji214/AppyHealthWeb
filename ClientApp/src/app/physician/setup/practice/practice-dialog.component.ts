import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HealthSystem } from '../../models/healthSystem';
import { HealthSystemLocation } from '../../models/healthSystemLocation';
import { Location } from '../../models/location';

import { PhysicianService } from "../../physician.service";

@Component({
  selector: 'practice-dialog',
  templateUrl: './practice-dialog.component.html',
  styleUrls: ['../setup.component.css']
})
export class PracticeDialogComponent {
  healthSystem: HealthSystem;
  location: HealthSystemLocation;

  npi: string;

  showError: boolean;
  showWarning: boolean;

  buttonText: string;
  headerText: string;

  constructor(
    private physicianService: PhysicianService, 
    public dialogRef: MatDialogRef<PracticeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.healthSystem && data.healthSystem.Id) {
      this.healthSystem = data.healthSystem;
      this.buttonText = "Save Changes";
      this.headerText = "Edit";
    } else {
      //this.healthSystem = new HealthSystem;
      this.buttonText = "Add New Practice to Profile";
      this.headerText = "Add";
    }
  }

  close() {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close(this.healthSystem);
  }

  search() {
    this.showWarning = false;
    this.showError = false;

    this.physicianService.searchHealthSystem(this.npi)
      .subscribe(result => {
        if (!result) {
          this.showWarning = true;
          return;
        }
        else {
          this.healthSystem = result;

          if (this.healthSystem.HealthSystemLocation && this.healthSystem.HealthSystemLocation.length) {
            this.location = this.healthSystem.HealthSystemLocation[0];
          }
        }
      }, error => {
        this.showError = true;
      });
  }

  enterManually() {
    let h = new HealthSystem;
    h.HealthSystemLocation = [];
    let l = new HealthSystemLocation;
    l.Location = new Location;

    h.HealthSystemLocation.push(l);
    this.healthSystem = h;
  }

}
