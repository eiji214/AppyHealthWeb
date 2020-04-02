import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PhysicianService } from "../../physician.service";
import { HealthSystem } from '../../models/healthSystem';
import { HealthSystemSetup } from '../../models/healthSystemSetup';
import { HealthSystemPractitioner } from '../../profile/models/healthSystemPractitioner';
import { Practitioner } from '../../profile/models/practitioner';

import { LocationDropdownItem } from "../../models/locationDropdownItem";
import { HealthSystemLocation } from '../../models/healthSystemLocation';
import { PractitionerHealthSystems } from '../../models/practitionerHealthSystems';
import { Staff } from '../../models/staff';

import { PhysicianDialogComponent } from "./physician-dialog.component";

@Component({
  selector: 'physician-setup',
  templateUrl: './physician-setup.component.html',
  styleUrls: ['../setup.component.css']
})
export class PhysicianSetupComponent {
  healthSystem: HealthSystemSetup;
  healthSystems: HealthSystem[] = [];

  @Input()
  set hs(hs: HealthSystemSetup) {
    this.healthSystem = hs;
    this.practitionerHealthSystems = hs.physicians;

    if (!hs.physicians) {
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
    const dialogRef = this.dialog.open(PhysicianDialogComponent,
      {
        width: '900px', disableClose: true,
        data: { provider: p, healthSystems: this.healthSystems }
      });

    dialogRef.afterClosed().subscribe((pResult: PractitionerHealthSystems) => {
      if (pResult) {
        this.confirm(pResult);
      }
    });

  }

  edit(p: PractitionerHealthSystems) {
    this.openDialog(p);
  }

  remove(p: PractitionerHealthSystems, index: number) {
    p.healthSystems.forEach(x => {
      this.physicianService.removePractitionerFromHealthSystem(x.Id, p.practitioner.Id)
        .subscribe(result => {
          this.practitionerHealthSystems.splice(index, 1);
        });

      this.physicianService.removeUserFromHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, p.staff.Id)
        .subscribe();
    })

  }

  back() {
    this.navigate.emit(false);
  }

  continue() {
    this.healthSystem.physicians = this.practitionerHealthSystems;
    this.setHealthSystem.emit(this.healthSystem);
  }

  confirm(provider: PractitionerHealthSystems) {

    let p = provider.practitioner;
    let h = provider.healthSystems;

    if (p.Id) {

      this.physicianService.saveProvider(p)
        .subscribe(result => {

          let staff = this.createStaff(provider);
          provider.staff = staff;

          for (var i = 0; i < provider.healthSystems.length; i++) {
            this.physicianService.addPractitionerToHealthSystem(provider.healthSystems[i].Id, provider.practitioner.Id)
              .subscribe(result => {

              });
          }

          let item = this.practitionerHealthSystems.filter(x => x.practitioner.NPI == provider.practitioner.NPI);
          if (item.length) {
            item[0] = provider;
          } else {
            this.practitionerHealthSystems.push(provider);
          }

        });

    } else {
      let names = p.FullName.split(" ");
      p.FirstName = names[0];
      p.LastName = names.length > 0 ? names[1] : "";

      this.physicianService.addPractitioner(p)
        .subscribe(result => {
          p.Id = result.PractitionerID;

          result.Role = "Physician";

          this.physicianService.updateStaff(result)
            .subscribe(r => {
              provider.healthSystems.forEach(x => {
                this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
                  .subscribe();
              });
            });

          //let staff = this.createStaff(provider);
          provider.staff = result;

          for (var i = 0; i < provider.healthSystems.length; i++) {
            this.physicianService.addPractitionerToHealthSystem(provider.healthSystems[i].Id, provider.practitioner.Id)
              .subscribe(result => {

              });
          }

          let item = this.practitionerHealthSystems.filter(x => x.practitioner.NPI == provider.practitioner.NPI);
          if (item.length) {
            item[0] = provider;
          } else {
            this.practitionerHealthSystems.push(provider);
          }

        });
    }
  }

  createStaff(provider: PractitionerHealthSystems): Staff {
    if (!provider.staff) {

      let p = provider.practitioner;

      let s = new Staff;
      s.Email = p.PrimaryEmailAddress;
      s.Name = p.FullName;
      s.PractitionerID = p.Id;
      s.RequiresPayment = true;
      s.CreateDate = new Date;
      s.Role = "Physician";

      this.physicianService.addUser(s)
        .subscribe(result => {

          provider.healthSystems.forEach(x => {
            this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
              .subscribe();
          });

          return result;

        });
    } else {
      provider.healthSystems.forEach(x => {
        this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, provider.staff.Id, 1)
          .subscribe();
      });

      return provider.staff;
    }
  }

}
