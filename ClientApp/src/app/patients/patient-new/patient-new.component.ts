import { Component, Input, OnInit, Output, EventEmitter, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { FormControl, Validators, FormGroup } from '@angular/forms';

import { PatientService } from '../patients.service';
import { Patient } from '../../core/model/patient';
import { Address } from '../../core/model/address';

import { FileUploadService } from '../../core/services/fileupload.service';
import { MyErrorStateMatcher } from '../../shared/MyErrorStateMatcher/MyErrorStateMatcher.component';

@Component({
  selector: 'app-patient-new',
  templateUrl: './patient-new.component.html',
  styleUrls: ['./patient-new.component.scss',
  '../../styles.scss']
})
export class PatientNewComponent implements OnInit {
  constructor(private patientsService: PatientService, private fileUploadService: FileUploadService,
    public dialogRef: MatDialogRef<PatientNewComponent>/*, @Inject(MAT_DIALOG_DATA) public data: DialogData*/) { }

  @Input() specialistId: number;
  @Output() save: EventEmitter<Patient> = new EventEmitter();
  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput2') fileInput2;

  patientCreated: boolean;
  patient: Patient;
  errorUnverifiedNumber:boolean = false;

  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  middleNameFormControl = new FormControl('', [
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  genderFormControl = new FormControl('', [
    Validators.required,
  ]);

  dobFormControl = new FormControl('', [
    Validators.required
  ]);

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
  ]);

  secondaryPhoneNumberFormControl = new FormControl('', [
  ]);

  addressLineFormControl = new FormControl('', [],
  );

  addressLine2FormControl = new FormControl('', [],
  );

  addressCityFormControl = new FormControl('', [],
  );

  addressStateFormControl = new FormControl('', [],
  );

  addressZipCodeFormControl = new FormControl('', [],
  );

  dataForm: FormGroup = new FormGroup({
    email: this.emailFormControl,
    firstname: this.firstNameFormControl,
    middlename: this.middleNameFormControl,
    lastname: this.lastNameFormControl,
    gender: this.genderFormControl,
    dob: this.dobFormControl,
    phone: this.phoneNumberFormControl,
    secphone: this.secondaryPhoneNumberFormControl,
    line: this.addressLineFormControl,
    line2: this.addressLine2FormControl,
    city: this.addressCityFormControl,
    state: this.addressStateFormControl,
    zipcode: this.addressZipCodeFormControl
  });

  ngOnInit() {
    this.patient = <Patient>{};
    this.patient.Address = <Address>{};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(patient: Patient): void {
    if (this.dataForm.invalid) {
      return;
    }

    console.log(patient);

    this.patientsService.createPatient(patient).subscribe((p) => {
      // this.save.emit(patient.value);

      this.patient = p;

      this.patientCreated = true;

      this.uploadInsurancePlanFrontPicture(p.Id);
      this.uploadInsurancePlanBackPicture(p.Id);
    }, er =>{
      console.error('createpatient',er);
      if(er.error == 21608)
      {
        console.log('//This number can send messages only to verified numbers');
        this.patientCreated = true;
        this.errorUnverifiedNumber = true;
      }else{
        return;
      }
     
    });
  }

  uploadInsurancePlanFrontPicture(patientId: any): void {
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.fileUploadService.
        uploadInsurancePlanFrontPicture(fileToUpload, patientId)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  uploadInsurancePlanBackPicture(patientId: any): void {
    const fi = this.fileInput2.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.fileUploadService.
        uploadInsurancePlanBackPicture(fileToUpload, patientId)
        .subscribe(res => {
          console.log(res);
        });
    }
  }
}
