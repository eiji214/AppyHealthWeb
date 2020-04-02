import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PhysicianService } from "../../physician.service";
import { HealthSystemSetup } from '../../models/healthSystemSetup';
import { HealthSystemPractitioner } from '../../profile/models/healthSystemPractitioner';
import { Practitioner } from '../../profile/models/practitioner';
import { HealthSystem } from '../../models/healthSystem';
import { PractitionerHealthSystems } from '../../models/practitionerHealthSystems';
import { Staff } from '../../models/staff';

import { StaffDialogComponent } from "./staff-dialog.component";

@Component({
  selector: 'staff-setup',
  templateUrl: './staff-setup.component.html',
  styleUrls: ['../setup.component.css']
})
export class StaffSetupComponent {
  healthSystem: HealthSystemSetup;
  healthSystems: HealthSystem[] = [];

  @Input()
  set hs(hs: HealthSystemSetup) {
    this.healthSystem = hs;
    this.practitionerHealthSystems = hs.staff;

    if (!this.practitionerHealthSystems) {
      this.practitionerHealthSystems = [];
    }

    this.healthSystems.push(this.healthSystem.primary);
    this.healthSystem.children.map(x => {
      this.healthSystems.push(x);
    });
  }

  @Output() navigate = new EventEmitter<boolean>();
  @Output() setHealthSystem = new EventEmitter<HealthSystemSetup>();

  practitionerHealthSystems: PractitionerHealthSystems[] = [];

  constructor(private physicianService: PhysicianService, public dialog: MatDialog) {

  }

  openDialog(p: PractitionerHealthSystems) {
    const dialogRef = this.dialog.open(StaffDialogComponent,
      {
        width: '900px', disableClose: true,
        data: { provider: p, healthSystems: this.healthSystems, physicians: this.healthSystem.physicians }
      });

    dialogRef.afterClosed().subscribe((pResult: any) => {
      if (pResult) {
        this.confirm(pResult.provider, pResult.role);
      }
    });

  }

  edit(p: PractitionerHealthSystems) {
    this.openDialog(p);
  }

  remove(p: PractitionerHealthSystems, index: number) {
    p.healthSystems.forEach(x => {
      this.physicianService.removeUserFromHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, p.staff.Id)
        .subscribe(result => {
          this.practitionerHealthSystems.splice(index, 1);
        });
    })

  }

  back() {
    this.navigate.emit(false);
  }

  continue() {
    this.healthSystem.staff = this.practitionerHealthSystems;
    this.setHealthSystem.emit(this.healthSystem);
  }

  confirm(provider: PractitionerHealthSystems, role: string) {

    let p = provider.practitioner;
    p.Title = role;

    let h = provider.healthSystems;
    let staff = provider.staff;

    if (!staff) {

      let s = new Staff;
      s.Email = p.PrimaryEmailAddress;
      s.Name = p.FullName;
      s.CreateDate = new Date;
      s.RequiresPayment = false;
      s.Role = role;

      this.physicianService.addUser(s)
        .subscribe(result => {

          provider.staff = result;
          h.forEach(x => {
            this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
              .subscribe();
          });

          this.practitionerHealthSystems.push(provider);

        });
    }

    else {
      h.forEach(x => {
        this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, staff.Id, 1)
          .subscribe();
      });
    }

  }

}
