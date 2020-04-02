import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';

import { HealthSystem } from '../../models/healthSystem';
import { PractitionerHealthSystems } from '../../models/practitionerHealthSystems';
import { Practitioner } from '../../profile/models/practitioner';

import { PhysicianService } from "../../physician.service";
import { UserService } from "../../../core/services/user.service";

@Component({
  selector: 'midlevel-dialog',
  templateUrl: './midlevel-dialog.component.html',
  styleUrls: ['../setup.component.css']
})
export class MidLevelDialogComponent implements OnInit {
  provider: PractitionerHealthSystems;
  healthSystemDropdownItems: HealthSystem[] = [];
  selectedHealthSystem: number;
  role: string;

  npi: string;

  showError: boolean;
  showWarning: boolean;

  buttonText: string;
  headerText: string;

  roles: string[] = [];

  constructor(
    private physicianService: PhysicianService,
    private userService: UserService,
    public dialogRef: MatDialogRef<MidLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.healthSystemDropdownItems = data.healthSystems;

    if (data && data.provider) {
      this.provider = data.provider;
      this.buttonText = "Save Changes";
      this.headerText = "Edit";
      this.role = data.provider.staff.Role;
    } else {
      this.buttonText = "Add to Practice";
      this.headerText = "Add";
    }
    
  }

  ngOnInit(): void {
    this.userService.getRoles()
      .subscribe(result => {
        this.roles = result.filter(x => x.Code === "Midlevel").map(x => x.Name);
        this.roles.sort();
      });
  }

  close() {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close({provider: this.provider, role: this.role});
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

  isValid() {
    return this.provider &&
      this.provider.healthSystems && this.provider.healthSystems.length > 0 &&
      this.role && this.role.length > 0 &&
      this.provider.practitioner.PrimaryEmailAddress && this.provider.practitioner.PrimaryEmailAddress.length > 0;
  }

}
