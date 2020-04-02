import { PatientService } from './../patients.service';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../core/model/patient';

@Component({
    selector: 'app-patient-card',
    templateUrl: './patient-card.component.html',
    styleUrls: ['./patient-card.component.scss',
    '../../styles.scss']
  })
  export class PatientCardComponent implements OnInit {
    @Input() patientId: number;
    @Input() compact: boolean;
    patient: Patient;

    constructor(public patientService: PatientService) { }

    ngOnInit(): void {
      this.patientService.getPatient(this.patientId).subscribe(x => this.patient = x);
    }
  }
