import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HealthSystem } from '../../models/healthSystem';
import { PractitionerHealthSystems } from '../../models/practitionerHealthSystems';
import { Practitioner } from '../../profile/models/practitioner';

import { UserService } from "../../../core/services/user.service";

@Component({
  selector: 'staff-dialog',
  templateUrl: './staff-dialog.component.html',
  styleUrls: ['../setup.component.css']
})
export class StaffDialogComponent implements OnInit {
  provider: PractitionerHealthSystems;
  healthSystemDropdownItems: HealthSystem[] = [];
  selectedHealthSystem: number;
  physicians: PractitionerHealthSystems[] = [];
  role: string;

  showError: boolean;
  showWarning: boolean;

  buttonText: string;
  headerText: string;

  roles: string[] = [];

  constructor(
    private userService: UserService,
  public dialogRef: MatDialogRef<StaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.provider) {
      this.provider = data.provider;
      this.buttonText = "Save Changes";
      this.headerText = "Edit";
    } else {
      let phs = new PractitionerHealthSystems;
      phs.practitioner = new Practitioner;
      this.provider = phs;

      this.headerText = "Add";
      this.buttonText = "Add to Practice";
    }

    this.healthSystemDropdownItems = data.healthSystems;
    this.physicians = data.physicians;
  }

  ngOnInit(): void {
    this.userService.getRoles()
      .subscribe(result => {
        this.roles = result.filter(x => x.Code === "Staff" || x.Code === "Medical Staff").map(x => x.Name);
        this.roles.sort();
      });
  }

  close() {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close({ provider: this.provider, role: this.role });
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

  isValid() {
    return this.provider.healthSystems && this.provider.healthSystems.length > 0 &&
      this.role && this.role.length > 0 &&
      this.provider.practitioner.PrimaryEmailAddress && this.provider.practitioner.PrimaryEmailAddress.length > 0;
  }

}
