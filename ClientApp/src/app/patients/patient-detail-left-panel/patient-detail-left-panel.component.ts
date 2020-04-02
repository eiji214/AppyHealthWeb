import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';


import { PatientService } from '../patients.service';
import { Patient } from '../../core/model/patient';

import { ConfirmDeleteDialog } from './confirm-delete-dialog.component';

@Component({
  selector: 'app-patient-detail-left-panel',
  templateUrl: './patient-detail-left-panel.component.html',
  styleUrls: ['./patient-detail-left-panel.component.scss',
  '../../styles.scss']
})
export class PatientDetailLeftPanelComponent implements OnInit {
  @Input() patient: Patient;

  constructor(
    private patientsService: PatientService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {

  }

  deactivatePatient(patientId) {
    this.patientsService.deactivatePatient(patientId).subscribe(() => {
      window.location.href = '/physician/Patients/' + patientId;
    });
  }

  openDeleteDialog(patientId) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      data: { patientId: patientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deactivatePatient(result);
    });
  }

}

