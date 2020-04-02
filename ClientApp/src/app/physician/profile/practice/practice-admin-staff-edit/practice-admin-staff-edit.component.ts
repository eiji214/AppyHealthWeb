import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HealthSystem } from "../../../models/healthSystem";
import { PracticePanelEnum } from '../../../../shared/enums/practice-panel.enum';
// import { User } from '../../../../common/models/user';
import { User } from '../../../../physician/models/user';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-practice-admin-staff-edit',
  templateUrl: './practice-admin-staff-edit.component.html',
  styleUrls: ['./practice-admin-staff-edit.component.css']
})
export class PracticeAdminStaffEditComponent implements OnInit {

  actionName = 'Edit';
  panelType = 0;
  isEdit: boolean = true;

  roles: string[] = [];

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<PracticeAdminStaffEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditAdminStaffData
  ) {
    this.actionName = data.id > 0 ? this.actionName : 'Add';
    this.isEdit = data.id > 0;
  }

  ngOnInit() {
    const user = this.data;

    this.userService.getRoles()
      .subscribe(result => {
        this.roles = result.filter(x => x.Code === "Staff").map(x => x.Name);
        this.roles.sort();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.data);
  }

  get practicePanelEnum() { return PracticePanelEnum; }

}

export interface EditAdminStaffData {
  user: User;
  id: Number;
}
