import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AutomatedMessageComponent } from '../automated-message/automated-message.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PatientService } from '../patients.service';
import { Observable } from 'rxjs';
import { Patient } from '../../core/model/patient';
import { InsurancePlan } from '../../core/model/insurancePlan';
import { InsurancePlanService } from '../../core/services/insurancePlan.service';
import { FileUploadService } from '../../core/services/fileupload.service';

@Component({
  selector: 'app-patient-verification',
  templateUrl: './patient-verification.component.html',
  styleUrls: ['./patient-verification.component.scss',
  '../../styles.scss']
})
export class PatientVerificationComponent implements OnInit {
  patient$: Observable<Patient>;
  insurancePlan$: Observable<InsurancePlan[]>
  frontUploaded = false;
  backUploaded = false;
  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput2') fileInput2;

  constructor(public dialogRef: MatDialogRef<AutomatedMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientsService: PatientService,
    private insurancePlanService: InsurancePlanService,
    private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.patient$ = this.patientsService.getPatient(this.data.patientId);
    this.insurancePlan$ = this.insurancePlanService.getInsurancePlans();
  }

  verifyPatient(patient){
    this.patientsService.updatePatientInsurance(patient).subscribe(()=>{
      this.uploadInsurancePlanFrontPicture(patient.Id).subscribe(()=>{
        this.uploadInsurancePlanBackPicture(patient.Id).subscribe(()=>{
          this.dialogRef.close();
        })
      })
      
    });
  }

  
  uploadFront(patientId: number) {
    this.uploadInsurancePlanFrontPicture(patientId);
    this.frontUploaded = true;
  }

  uploadBack(patientId: number) {
    this.uploadInsurancePlanBackPicture(patientId);
    this.backUploaded = true;
  }

  uploadInsurancePlanFrontPicture(patientId: any) {
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      return this.fileUploadService.
        uploadInsurancePlanFrontPicture(fileToUpload, patientId);
    }
  }

  uploadInsurancePlanBackPicture(patientId: any) {
    const fi = this.fileInput2.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      return this.fileUploadService.
        uploadInsurancePlanBackPicture(fileToUpload, patientId);
        
    }
    //window.location.reload();
  }

}
