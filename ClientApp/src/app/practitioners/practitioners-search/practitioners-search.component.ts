import { SpecialtyService } from './../../core/services/specialty.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PractitionersService } from '../../practitioners/practitioners.service';

import { Practitioner } from '../../core/model/practitioner';
import { Specialty } from '../../core/model/specialty';
import { Subject, Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, } from 'rxjs/operators';
import { PractitionerFilter } from '../../core/model/practitionerFilter';
import { Filter } from '../../core/model/filter';

@Component({
  selector: 'app-practitioners-search',
  templateUrl: './practitioners-search.component.html',
  styleUrls: ['./practitioners-search.component.scss',
'../../styles.scss']
})
export class PractitionersSearchComponent implements OnInit {
  constructor(private practitionersService: PractitionersService, private specialtyService: SpecialtyService) { }
  specialtyFilter: PractitionerFilter;
  filter: Filter;
  specialties: Specialty[];
  @Output() filteredPractitionersChange = new EventEmitter<Practitioner[]>();
  searchTerm$ = new Subject<string>();
  isLoading = false;

  ngOnInit() {
    this.hookupAutocomplete(this.searchTerm$).subscribe((data) => {
      this.filteredPractitionersChange.emit(data as Practitioner[]);
      this.isLoading = false;
    });

    this.specialtyFilter = {
        SearchText: '',
        Filters: []
    };

    this.specialtyService.getSpecialties().subscribe((data) => {
      this.specialties = data as Specialty[];
      this.specialties.filter(x => x.ParentId == null)
        .forEach(specialty => {
          if (specialty.Category && !this.specialtyFilter.Filters.some(x => x.ParentCategory === specialty.Category)) {
            this.specialtyFilter.Filters.push({
              ParentCategory: specialty.Category,
              ChildCategories: this.specialties.filter(x => x.Category === specialty.Category)
            });
          }
      });
    });

    this.filter = { SearchTerm: '', SpecialtyId: null, SpecialtyName: null };

    this.practitionersService.getSpecialists(this.filter).subscribe((data) => {
      this.filteredPractitionersChange.emit(data);
    });

  }

  hookupAutocomplete(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.filter.SearchTerm = term;
        return this.applyFilter();
    }));
  }

  applyFilter() {
    {
      if (!this.filter.SearchTerm && !this.filter.SpecialtyId) {
        this.filteredPractitionersChange.emit([]);
        return;
      }
      this.isLoading = true;
      return this.practitionersService.getSpecialists(this.filter);
    }
  }

  filterBySpecialty(specialty: Specialty) {
    if (this.filter.SpecialtyId === specialty.Id) {
      this.filter.SpecialtyId = null;
      this.filter.SpecialtyName = null;
    } else {
      this.filter.SpecialtyId = specialty.Id;
      this.filter.SpecialtyName = specialty.Name;
    }

    this.isLoading = true;
    this.practitionersService.getSpecialists(this.filter).subscribe((data) => {
      this.filteredPractitionersChange.emit(data as Practitioner[]);
      this.isLoading = false;
    });
  }

  toggle(item, list) {
    const idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(item);
    }

    this.applyFilter();
  }

  exists(item, list) {
    return list.indexOf(item) > -1;
  }
}
