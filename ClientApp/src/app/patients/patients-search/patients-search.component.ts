import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PatientService } from '../patients.service';
import { Patient } from '../../core/model/patient';
import { Subject, Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, } from 'rxjs/operators';


@Component({
  selector: 'app-patients-search',
  templateUrl: './patients-search.component.html',
  styleUrls: ['./patients-search.component.scss',
    '../../styles.scss'
  ]
})
export class PatientsSearchComponent implements OnInit {
  constructor(private patientsService: PatientService) { }
  @Input() filter: any;
  @Input() patients: Patient[];
  @Input() filteredPatients: Patient[];
  @Output() filteredPatientsChange = new EventEmitter();

  searchTerm$ = new Subject<string>();
  searchTerm: string;
  isLoading = false;

  ngOnInit() {

    this.hookupAutocomplete(this.searchTerm$).subscribe((data) => {
      this.filteredPatients = data as Patient[];
      this.filteredPatientsChange.emit(this.filteredPatients);
      this.isLoading = false;
    });
  }

  hookupAutocomplete(terms: Observable<string>) {
    return terms.pipe(debounceTime(400), distinctUntilChanged(),
    switchMap(term => {
      this.searchTerm = term;
      return this.applyFilter();
    }));
  }

  applyFilter() {
    {

      if (!this.searchTerm) {
        this.filteredPatients = [];
        this.filteredPatientsChange.emit(this.filteredPatients);
        return;
      }
      this.isLoading = true;
      return this.patientsService.getPatientsFTS(this.searchTerm);
    }

    // if (!this.filter.searchText) {
    //   this.filteredPatients = [];
    // } else {
    //   this.filter.searchText = this.filter.searchText.toLowerCase();
    //   this.filteredPatients = this.patients.filter
    //     (d =>
    //     (d.FirstName != null && d.FirstName.toLowerCase().indexOf(this.filter.searchText) >= 0)
    //     || (d.LastName != null && d.LastName.toLowerCase().indexOf(this.filter.searchText) >= 0)
    //     || (d.FirstName != null && d.LastName != null &&
    //       (d.FirstName.toLowerCase() + ' ' + d.LastName.toLowerCase()).indexOf(this.filter.searchText) >= 0)
    //     || (d.PrimaryEmailAddress != null && d.PrimaryEmailAddress.toLowerCase().indexOf(this.filter.searchText) >= 0));
    // }

    // this.filteredPatientsChange.emit(this.filteredPatients);
  }
}
