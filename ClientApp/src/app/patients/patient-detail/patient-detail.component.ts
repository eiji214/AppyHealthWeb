import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FileUploadService } from '../../core/services/fileupload.service';
import { ReferralsService } from '../../referrals/referrals.service';
import { PatientService } from '../patients.service';
import { Practitioner } from '../../core/model/practitioner';
import { Patient } from '../../core/model/patient';
import { Referral } from '../../core/model/referral';
import { ReferralNote } from '../../core/model/appointmentNote';
import { PatientNoteService } from '../../core/services/patientNote.service';
import { PatientNote } from '../../core/model/patientNote';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/model/user';
import { AutomatedMessageComponent } from '../automated-message/automated-message.component';
import { FaxMessageComponent } from '../fax-message/fax-message.component';
import { ChatService } from '../../core/services/chat.service';
import { ReferralsEditComponent } from '../../shared/referrals-edit/referrals-edit.component';
import { PatientNextApptComponent } from '../../shared/patient-next-appt/patient-next-appt.component';
import { InsurancePlanService } from '../../core/services/insurancePlan.service';
import { InsurancePlan } from '../../core/model/insurancePlan';
import { ViewEncapsulation } from '@angular/core';

export interface User {
  name: string;
}

export interface AppointmentForm {
  Id: number;
  PatientId: number;
  SpecialistId: number;
  ReferralId: number;
  StartDate: Date;
  StartTime: Date;
  EndDate: Date;
  Comments: string;
  Status: string;
  Symptom: string;

  Patient: Patient;
  Specialist: Practitioner;

}

const placehold = () => {
};

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss',
  '../../styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientDetailComponent implements OnInit {
  constructor(
    private patientsService: PatientService,
    private referralService: ReferralsService,
    private patientNoteService: PatientNoteService,
    private insurancePlanService: InsurancePlanService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private chatService: ChatService) { }

  patient$: Observable<Patient>;
  referrals$: Observable<Referral[]>;
  referralsHistory$: Observable<Referral[]>;
  referral: Referral;
  newReferral: Referral;
  appointmentsNotes$: Observable<ReferralNote[]>;
  patientNotes: PatientNote[];
  symptoms$: any;
  insurancePlans$: Observable<InsurancePlan[]>;
  insurancePlanEligibility$: Observable<string>;
  symptomsAutocomplete$: any;
  selectedProvider: any = {};
  showInsuranceForm = false;
  selectedSpecialties: string;
  showCreateAppointment = false;
  selectedTab = 1;
  currentUserId = 2;
  patientId: number;
  newMessage: string;
  frontUploaded = false;
  backUploaded = false;
  isEditing = false;
  canEdit = false;
  birthDate: string;
  provider: User;

  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput2') fileInput2;

  ngOnInit() {
    this.setPatientId();

    this.patient$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.patientsService.getPatient(params.get('id')))
    );

    this.referrals$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.referralService.getActiveReferrals(+params.get('id')))
    );

    this.referralsHistory$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.referralService.getPastReferrals(+params.get('id')))
    );

    this.referralService.getSymptoms().subscribe(
      data => { this.symptoms$ = data; this.symptomsAutocomplete$ = data; }
    );

    this.appointmentsNotes$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.referralService.getPatientAppointmentsNotes(params.get('id')))
    );

    this.insurancePlans$ = this.insurancePlanService.getInsurancePlans();

    this.insurancePlanEligibility$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.insurancePlanService.getEligibility(params.get('id')))
    );

    this.getPatientNotes();

    this.userService.getMe().subscribe(user => { this.isEditable(user); this.provider = user; });
  }

  setPatientId() {
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];
    });
  }

  isEditable(user: User) {
    if (user.Role === 'CallCenter') {
      this.canEdit = true;
    } else { return; }
  }

  toggleEdit(id: number) {
    if (this.isEditing) {
      this.isEditing = false;
      this.patient$ = this.patientsService.getPatient(id);
    } else if (!this.isEditing) {
      this.isEditing = true;
    }
  }

  onDateChange(viewvalue: string) {
    console.log("test value" );
    //if (viewvalue.length === 2 || viewvalue.length === 5) {
    //  viewvalue += '/';
    //}
    //this.birthDate = viewvalue;
  };

  newDateChange(viewvalue: string) {
    console.log("test new change");
    if (viewvalue.length === 2 || viewvalue.length === 5) {
      viewvalue += '/';
    }
    this.birthDate = viewvalue;
  };

  

  getPatientNotes() {
    this.patientNoteService.getPatientNotes(this.patientId).subscribe((d) => {
      this.patientNotes = d;
    });
  }

  openReferral(referral: Referral) {
    this.dialog.open(ReferralsEditComponent, { data: referral });
  }

  setAppointment() {
    this.referralService.getPatientProviderReferral(this.patientId, this.provider.Practitioner.Id).subscribe((d) => {
      this.referral = d;
      console.log(d);
      if (d == null) {
        console.log(this.provider.Practitioner.Id);
        this.newReferral.PractitionerId = this.provider.Practitioner.Id;
        this.newReferral.PatientId = this.patientId;
        console.log(this.newReferral);
        this.referralService.createReferral(this.newReferral).subscribe((x) => {
          this.newReferral = x;
          this.dialog.open(PatientNextApptComponent, { data: this.newReferral });
        });
      } else {
        this.dialog.open(PatientNextApptComponent, { data: this.referral });
      }
    });
  }

  sendMessage(message: string) {
    if (!message) {
      return;
    }

    const patientNote = <PatientNote>{};

    patientNote.PatientId = this.patientId;
    patientNote.UserId = this.currentUserId;
    patientNote.Message = message;

    this.patientNoteService.createPatientNote(patientNote).subscribe((data) => {
      this.patientNotes.push(data);
    });
  }

  onSubmit(patient: Patient): void {
    console.log(patient);
    this.patientsService.updatePatient(patient).subscribe(() => {
      // this.save.emit(patient.value);
    });
  }

  deactivatePatient(patientId) {
    this.patientsService.deactivatePatient(patientId).subscribe(() => {
      window.location.href = '/physician/Patients/' + patientId;
    });
  }

  scrollChat() {
    const element = <HTMLElement>document.getElementsByClassName('chat-container')[0];
    element.scrollTop = element.offsetHeight;
  }

  uploadFront(patientId: number) {
    this.uploadInsurancePlanFrontPicture(patientId);
    this.frontUploaded = true;
  }

  uploadBack(patientId: number) {
    this.uploadInsurancePlanBackPicture(patientId);
    this.backUploaded = true;
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
    window.location.reload();
  }

  saveChanges(patient: Patient) {
    this.patientsService.updatePatient(patient).subscribe((x) => {
      this.isEditing = false;
      this.patient$ = this.patientsService.getPatient(x.Id);
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

  deactivateReferral(referralId) {
    this.referralService.deactivateReferral(referralId).subscribe((data) => {
      this.referrals$.forEach(referrals => {
        const removedReferral = referrals.find(y => y.Id === referralId);
        referrals.splice(referrals.indexOf(removedReferral), 1);
      });
    });
  }

  openFaxMessageDialog($event, patientId) {
    $event.stopPropagation();
    const dialogref = this.dialog.open(FaxMessageComponent, {
      width: '60vw',
      data: { patientId: patientId }
    });

    dialogref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  saveInsuranceInfo(patient: Patient) {
    this.patientsService.updatePatientInsurance(patient).subscribe(() => {
      this.selectedTab = 2;
      this.showInsuranceForm = false;
      this.insurancePlanEligibility$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.insurancePlanService.getEligibility(params.get('id')))
      );
    });
  }

  startChat(patientId: number) {
    this.chatService.startChat(patientId).subscribe((data) => {
      location.href = '/chats?patientId=' + patientId;
    });
  }

  //Add auto slash to birthdate
  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  innerValue: Date = new Date();

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = placehold;
  private onChangeCallback: (_: any) => void = placehold;

  get value(): Date {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: Date) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }
  //Occured value changed from module
  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChange(event) {
    // console.log(event);
    this.value = event;
    this.onBlur();
  }

  todate(value) {
    this.value = new Date(value);
  }

  onBlur() {
    this.onChangeCallback(this.innerValue);
  }


}
