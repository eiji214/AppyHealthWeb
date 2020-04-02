import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PhysicianService } from "../../physician.service";

import { HealthSystem } from '../../models/healthSystem';
import { HealthSystemLocation } from '../../models/healthSystemLocation';
import { HealthSystemSetup } from '../../models/healthSystemSetup';
import { HealthSystemCreate } from '../../models/healthSystemCreate';
import { User } from '../../models/user';


import {PracticeDialogComponent} from "./practice-dialog.component";



@Component({
  selector: 'practice-setup',
  templateUrl: './practice-setup.component.html',
  styleUrls: ['../setup.component.css']
})
export class PracticeSetupComponent {
  //healthSystem: HealthSystem;
  isPrimary: boolean = true;
  me: User;

  healthSystemSetup: HealthSystemSetup = new HealthSystemSetup;

  @Input()
  set hs(hs: HealthSystemSetup) {
    if (hs) {
      this.isPrimary = false;
      this.healthSystemSetup = hs;
    }
  }

  @Output() setHealthSystem = new EventEmitter<HealthSystemSetup>();

  constructor(private physicianService: PhysicianService, public dialog: MatDialog) {
    this.physicianService.getMe()
      .subscribe(result => this.me = result);
  }

  openDialog(healthSystem: HealthSystem) {
    const dialogRef = this.dialog.open(PracticeDialogComponent, {
      width: '900px', disableClose: true,
      data: { healthSystem }
    });

    dialogRef.afterClosed().subscribe((hs: HealthSystem) => {
      if (!hs) {
        return;
      }
      console.log(hs);
      //this.animal = result;
      if (this.isPrimary) {
        if (hs.Id) {
          this.physicianService.saveHealthSystem(hs)
            .subscribe(result => {
              this.isPrimary = false;
              this.healthSystemSetup.primary = hs;
            });
        } else {
          let hsc = new HealthSystemCreate;
          hsc.healthsystem = hs;
          hsc.location = hsc.healthsystem.HealthSystemLocation[0].Location;
          hsc.user = this.me;

          hsc.location.Name = hsc.healthsystem.Name;
          hsc.healthsystem.HealthSystemLocation = null;

          this.physicianService.addHealthSystem(hsc)
            .subscribe(result => {
              hs.Id = result.healthsystem.Id;
              hs.HealthSystemLocation = [];
              let hsl = new HealthSystemLocation;
              hsl.LocationId = result.location.Id;
              hsl.Location = hsc.location;
              hsl.Location.Id = result.location.Id;
              hs.HealthSystemLocation.push(hsl);
              this.isPrimary = false;
              this.healthSystemSetup.primary = hs;
            });
        }

      } else {

        if (hs.Id) {
          this.physicianService.saveHealthSystem(hs)
            .subscribe(result => {
              this.physicianService.saveChildHealthSystem(this.healthSystemSetup.primary.Id, hs.Id)
                .subscribe(r => {
                  let item = this.healthSystemSetup.children.filter(x => x.Id == hs.Id);
                  if (item.length) {
                    item[0] = hs;
                  } else {
                    this.healthSystemSetup.children.push(hs);
                  }
                });
            });
        } else {
          let hsc = new HealthSystemCreate;
          hsc.healthsystem = hs;
          hsc.location = hsc.healthsystem.HealthSystemLocation[0].Location;
          hsc.user = this.me;

          hsc.location.Name = hsc.healthsystem.Name;
          hsc.healthsystem.HealthSystemLocation = null;


          this.physicianService.addHealthSystem(hsc)
            .subscribe(result => {
              hs.Id = result.healthsystem.Id;

              hs.HealthSystemLocation = [];
              let hsl = new HealthSystemLocation;
              hsl.LocationId = result.location.Id;
              hsl.Location = hsc.location;
              hsl.Location.Id = result.location.Id;
              hs.HealthSystemLocation.push(hsl);
              
              this.physicianService.saveChildHealthSystem(this.healthSystemSetup.primary.Id, hs.Id)
                .subscribe(r => {
                  let item = this.healthSystemSetup.children.filter(x => x.Id == hs.Id);
                  if (item.length) {
                    item[0] = hs;
                  } else {
                    this.healthSystemSetup.children.push(hs);
                  }
                });
            });
        }
      }
    });
  }

  editPrimary() {
    this.openDialog(this.healthSystemSetup.primary);
    this.isPrimary = true;
  }

  edit(h: HealthSystem) {
    this.openDialog(h);
    this.isPrimary = false;
  }

  remove(h: HealthSystem, i: number) {
    this.physicianService.removeChildHealthSystem(this.healthSystemSetup.primary.Id, h.Id)
      .subscribe(result => {
        this.healthSystemSetup.children.splice(i, 1);
      });
    
  }

  confirm() {
    this.setHealthSystem.emit(this.healthSystemSetup);
  }

}
