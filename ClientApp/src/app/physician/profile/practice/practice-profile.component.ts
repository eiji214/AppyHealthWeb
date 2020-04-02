import { Component, OnInit, ViewChild } from '@angular/core';

import { Provider } from "../models/provider";
import { HealthSystem } from "../../models/healthSystem";
import { HealthSystemPractitioner } from "../models/healthSystemPractitioner";
import { PhysicianService } from "../../physician.service";
import { MatDialog } from '@angular/material/dialog';
import { PracticeOverviewEditComponent, EditOverviewData } from './practice-overview-edit/practice-overview-edit.component';
import { PracticeAdminStaffEditComponent, EditAdminStaffData } from './practice-admin-staff-edit/practice-admin-staff-edit.component';
import { PracticePanelEnum } from '../../../shared/enums/practice-panel.enum';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Practitioner } from '../models/practitioner';
// import { User } from '../../ src/app/common/models/user';
// import { User } from './../../../core/model/user';
import { User } from './../../../physician/models/user';
import { StaffDialogComponent } from '../../setup/staff/staff-dialog.component';
import { PractitionerHealthSystems } from '../../models/practitionerHealthSystems';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from "../../models/staff";


@Component({
  selector: 'practice-profile',
  templateUrl: './practice-profile.component.html',
  styleUrls: ['./practice-profile.component.css']
})
export class PracticeProfileComponent implements OnInit {
  healthSystem: HealthSystem = new HealthSystem;
  adminStaff: User[] = [];
  displayedColumns: string[] = ['Title', 'FullName', 'PrimaryPhoneNumber', 'PrimaryEmail', 'actions'];
  unsubscribeAll$: Subject<boolean> = new Subject<boolean>();
  dataSource: MatTableDataSource<User> | null;
  healthSystemId: number;

  @ViewChild('logo') logo;

  constructor(private physicianService: PhysicianService,
    public dialog: MatDialog,
    private route: ActivatedRoute, ) {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.unsubscribe();
  }

  ngOnInit() {

    this.route.queryParams.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params: Params) => {
      this.healthSystemId = params['id'];
      if (this.healthSystemId) {
        this.physicianService.getHealthSystem(this.healthSystemId).subscribe(p => {
          this.healthSystem = p[0];
        });
        this.physicianService.getMyHealthSystemAdminUsers(this.healthSystemId)
          .subscribe(p => {
            this.adminStaff = p;
            this.dataSource = new MatTableDataSource(p);
          });

      }
    });
  }

  editOverview(panel: number) {
    const dialogRef = this.dialog.open(PracticeOverviewEditComponent, {
      width: '80vw',
      data: <EditOverviewData>{
        healthSystem: JSON.parse(JSON.stringify(this.healthSystem)),
        panelType: panel
      },
      position: { top: '15vh' },

    });
    dialogRef.afterClosed().subscribe((result: EditOverviewData) => {
      if (result) {
        this.physicianService.saveHealthSystem(result.healthSystem)
          .subscribe(SavedH => {
            this.healthSystem = SavedH;
          });
      }

    });
  }
  get practicePanelEnum() { return PracticePanelEnum; }

  editAdminStaff(id: number, index: number) {
    let thisUser: User = new User;

    if (id && id > 0) {
      thisUser = this.adminStaff.find(a => a.Id == id);
    }

    const dialogRef = this.dialog.open(PracticeAdminStaffEditComponent, {
      width: '50vw',
      data: <EditAdminStaffData>{
        user: JSON.parse(JSON.stringify(thisUser)),
        id,
      },
      position: { top: '15vh' },

    });
    dialogRef.afterClosed().subscribe((result: EditAdminStaffData) => {
      if (result) {
        if (id > 0) {
          this.physicianService.updateUser(result.user)
            .subscribe(SavedH => {
              const user = SavedH;
              this.adminStaff.splice(index, 1, user);
              this.dataSource = new MatTableDataSource(this.adminStaff);
            });
        } else {
          let s = new Staff;
          s.Email = result.user.Email;
          s.Name = result.user.Name;
          s.CreateDate = new Date;
          s.RequiresPayment = false;
          s.Role = result.user.Role;

          this.physicianService.addUser(s)
            .subscribe(r => {

              result.user.Id = r.Id;
              this.adminStaff.push(result.user);
              this.dataSource = new MatTableDataSource(this.adminStaff);

              this.physicianService.addUserToHealthSystem(this.healthSystem.Id, this.healthSystem.HealthSystemLocation[0].LocationId, r.Id, 1)
                .subscribe();
            });
        }

      }

    });
  }

  remove(id: any) {
    this.physicianService.removeUserFromHealthSystem(this.healthSystem.Id, this.healthSystem.HealthSystemLocation[0].LocationId, id)
      .subscribe(result => {
        this.adminStaff = this.adminStaff.filter(x => x.Id !== id);
        this.dataSource = new MatTableDataSource(this.adminStaff);
      });
  }

  displayHours() {
    if (!this.healthSystem.HealthSystemLocation[0].Location.Hours) {
      return '';
    }
    return this.healthSystem.HealthSystemLocation[0].Location.Hours.replace(/;/g, "<br />");
  }


  uploadPhoto() {
    const fi = this.logo.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.physicianService.updateHealthSystemLogo(this.healthSystem.Id, fileToUpload)
        .subscribe(result => {
          this.healthSystem.LogoUrl = result.Url;
          this.physicianService.saveHealthSystem(this.healthSystem).subscribe();
        });
    }
  }

}

