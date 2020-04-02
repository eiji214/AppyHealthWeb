import { Component, OnInit, Inject, Provider  } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, Subject, of, concat  } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PatientService } from '../patients.service';
import { PractitionersService } from '../../practitioners/practitioners.service';
import { Patient } from '../../core/model/patient';
import { FaxService } from '../../core/services/fax.service';

@Component({
  selector: 'app-fax-message',
  templateUrl: './fax-message.component.html',
  styleUrls: ['./fax-message.component.scss',
  '../../styles.scss']
})
export class FaxMessageComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<FaxMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientsService: PatientService,
  private practitionersService: PractitionersService,
  private faxService: FaxService) { }

  patient$: Observable<Patient>;
  notes: string;
  provider2Id: string | number;

  providers$: Observable<Provider[]>;
  isLoadingProviders = false;
  providersInput$ = new Subject<string>();

  ngOnInit() {
    this.patient$ = this.patientsService.getPatient(this.data.patientId);

    this.searchProviders();
  }

  searchProviders() {
    this.providers$ = concat(
      of([]), // default items
      this.providersInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.isLoadingProviders = true),
        switchMap(term => this.practitionersService.getSpecialists({ SearchTerm: term, SpecialtyId: null, SpecialtyName: null }).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.isLoadingProviders = false)
        ))
      )
    );
  }

  sendFaxMessage() {
    this.dialogRef.close();
  }



}
