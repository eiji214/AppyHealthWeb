import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Patient } from '../../core/model/patient';
import { PatientService } from '../patients.service';
import { PatientNewComponent } from '../../patients/patient-new/patient-new.component';
import { AutomatedMessageComponent } from '../automated-message/automated-message.component';
import { ChatService } from '../../core/services/chat.service';
import { User } from '../../common/models/user';
import { UserService } from "../../common/user.service";
import { PatientVerificationComponent } from '../patient-verification/patient-verification.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss',
  '../../styles.scss']
})
export class PatientsComponent implements OnInit {
  constructor(
    private patientsService: PatientService,
    private userService: UserService,
    private chatService: ChatService,
    public dialog: MatDialog
  ) { }

  patients: Patient[];
  filteredPatients: Patient[];
  filter: any;
  currentUserId = 2;
  user: User;

  ngOnInit() {
    this.filteredPatients = [];
    this.patients = [];

    // this.patientsService.getPatients().subscribe(patients => {
    //   this.patients = patients as Patient[];
    //   // this.filteredPatients = this.patients;
    // });

    this.filter = this.patientsService.getFilters();
    this.userService.getUser().subscribe(x => this.user = x);
  }

  openNewPatientDialog(): void {
    const dialogRef = this.dialog.open(PatientNewComponent, {
      width: '982px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openPatientVerificationDialog($event, patientId) {
    $event.stopPropagation();
    const dialogref = this.dialog.open(PatientVerificationComponent, {
      width: '60vw',
      data: { patientId: patientId }
    });

    dialogref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAutomatedMessageDialog($event, patientId) {
    $event.stopPropagation();
    const dialogref = this.dialog.open(AutomatedMessageComponent, {
      width: '60vw',
      data: { patientId: patientId }
    });

    dialogref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  startChat(patientId: number) {
    this.chatService.startChat(patientId).subscribe((data) => {
      location.href = '/chats?patientId=' + patientId;
    });
  }
}
