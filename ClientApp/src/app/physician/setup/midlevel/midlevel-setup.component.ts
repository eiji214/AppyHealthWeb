import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PhysicianService } from "../../physician.service";
import { HealthSystem } from '../../models/healthSystem';
import { HealthSystemSetup } from '../../models/healthSystemSetup';
import { HealthSystemPractitioner } from '../../profile/models/healthSystemPractitioner';
import { Practitioner } from '../../profile/models/practitioner';
import { PractitionerHealthSystems } from '../../models/practitionerHealthSystems';
import { Staff } from '../../models/staff';

import { MidLevelDialogComponent } from "./midlevel-dialog.component";

@Component({
  selector: 'midlevel-setup',
  templateUrl: './midlevel-setup.component.html',
  styleUrls: ['../setup.component.css']
})
export class MidLevelSetupComponent {
  healthSystem: HealthSystemSetup;
  healthSystems: HealthSystem[] = [];

  @Input()
  set hs(hs: HealthSystemSetup) {
    this.healthSystem = hs;
    this.practitionerHealthSystems = hs.midLevels;

    if (!hs.midLevels) {
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
    const dialogRef = this.dialog.open(MidLevelDialogComponent,
      {
        width: '900px', disableClose: true,
        data: { provider: p, healthSystems: this.healthSystems }
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
    this.healthSystem.midLevels = this.practitionerHealthSystems;
    this.setHealthSystem.emit(this.healthSystem);
  }

  confirm(provider: PractitionerHealthSystems, role: string) {

    let p = provider.practitioner;
    let h = provider.healthSystems;

    if (p.Id) {

      this.physicianService.saveProvider(p)
        .subscribe(result => {

          let staff = this.createStaff(provider, role);
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

          result.RequiresPayment = role == "NP" || role == "PA";
          result.Role = role;

          this.physicianService.updateStaff(result)
            .subscribe(r => {
              provider.healthSystems.forEach(x => {
                this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
                  .subscribe();
              });
            });

          //let staff = this.createStaff(provider, role);
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

  createStaff(provider: PractitionerHealthSystems, role: string): Staff {
    if (!provider.staff) {

      let p = provider.practitioner;

      let s = new Staff;
      s.Email = p.PrimaryEmailAddress;
      s.Name = p.FullName;
      s.PractitionerID = p.Id;
      s.CreateDate = new Date;
      s.RequiresPayment = true;
      s.Role = role;

      this.physicianService.addUser(s)
        .subscribe(result => {

          provider.healthSystems.forEach(x => {
            this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, result.Id, 1)
              .subscribe();
          });

          return result;

        });

      return s;
    } else {
      provider.healthSystems.forEach(x => {
        this.physicianService.addUserToHealthSystem(x.Id, x.HealthSystemLocation[0].LocationId, provider.staff.Id, 1)
          .subscribe();
      });

      return provider.staff;
    }
  }


}
