import { Component, OnInit } from '@angular/core';
import { InsuranceService } from './insurance.service';
import { SearchService } from './search.service';
import { Insurance } from './models/insurance';
import { Specialty } from './models/specialty';
import { CardComponent } from '../featured-card/card.component';
import { SearchRecord } from './models/searchrecord';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeComponent implements OnInit {
  insuranceOptions: Insurance[] = new Array<Insurance>();
  specialties: Specialty[] = new Array<Specialty>();
  keyword = 'Name';
  categoryKeyword = 'Category';
  searchText = '';
  category = null;
  categories = [];
  subcategory = null;
  simpleInsurance = null;
  advancedInsurance = null;
  complexInsurance = null;
  loading = false;
  simpleAddress = null;
  advancedAddress = null;
  options = [];
  displayedColumns: string[] = ['SearchTerm', 'SearchType', 'Distance'];
  filteredOptions: Observable<Insurance[]>;
  filteredCategories: Observable<string[]>;
  subCategories: Specialty[] = new Array<Specialty>();
  filteredSubcategories: Observable<Specialty[]>;

  myControl = new FormControl();
  categoryInput = new FormControl();
  subCategoryInput = new FormControl();
  Latitude: number = null;
  Longitude: number = null;
  searchResult: SearchRecord[] = new Array<SearchRecord>();

  expandedElement: SearchRecord;
  extraInfo: any;

  locationRequired = true;

  image = 'home.png';
  selected = 0;
  interval: any;

  constructor(private insuranceService: InsuranceService, private searchService: SearchService) {
  }



  ngOnInit() {
    if ('geolocation' in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          // for when getting location is a success
          this.Latitude = position.coords.latitude;
          this.Longitude = position.coords.longitude;
          this.locationRequired = false;
          console.log(this.Latitude);

        },
        function error(error_message) {
          console.error('An error has occured while retrieving location', error_message);
        }
      );
    } else {
      console.log('geolocation is not enabled on this browser');
    }

    this.startTimer();
    this.insuranceService.getInsurance()
      .subscribe(p => {
        this.insuranceOptions = p;

      });
    this.searchService.getSpecialty()
      .subscribe(p => {
        this.specialties = p;
        const map = new Map();
        for (const item of this.specialties) {
          if (!map.has(item.Category)) {
            map.set(item.Category, true);    // set any value to Map
            this.categories.push(item.Category);
          }
        }
        this.filteredCategories = of(this.categories);

      });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredCategories = this.categoryInput.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCategories(value))
      );

    this.categoryInput.valueChanges.subscribe(p => {
      this.subCategories = this.specialties.filter(item => item.Category === p);
      this.filteredSubcategories = of(this.subCategories);
    });

    this.filteredSubcategories = this.subCategoryInput.valueChanges
      .pipe(
        startWith(null),
        map(value => this._filterSubCategories(value))
      );
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.selected++;
      if (this.selected > 6) {
        this.selected = 0;
      }
      this.setImage(this.selected);
    }, 5000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  setImage(id) {
    this.selected = id;
    switch (id) {
      case 1:
        this.image = 'search.png';
        break;
      case 2:
        this.image = 'discovery.png';
        break;
      case 3:
        this.image = 'careteam.png';
        break;
      case 4:
        this.image = 'benefits.png';
        break;
      case 5:
        this.image = 'request-appointment.png';
        break;
      case 6:
        this.image = 'appointments.png';
        break;
      default:
        this.image = 'home.png';
    }
  }
  simpleSearch(event) {
    const body = {
      SearchTerm: this.searchText,
    };
    if (this.simpleAddress || !this.locationRequired) {
      if (this.simpleAddress) {
        const City = this.simpleAddress.address_components.find(item => item.types.includes('locality')).short_name;
        const State = this.simpleAddress.address_components.find(item => item.types.includes('administrative_area_level_1')).short_name;
        // @ts-ignore
        body.City = City;
        // @ts-ignore
        body.State = State;
      } else if (this.Latitude && this.Longitude) {
        // @ts-ignore
        body.Latitude = this.Latitude;
        // @ts-ignore
        body.Longitude = this.Longitude;
      }

      this.loading = true;
      this.searchService.callSearchWeb(body)
        .subscribe(p => {
          this.searchResult = p;
          this.loading = false;
        });
    } else {
      alert('You need to input location!');
      return;
    }
  }

  advancedSearch(event) {
    const body = {
      SpecialtyId: this.subcategory,
    };
    if (this.advancedAddress || !this.locationRequired) {
      if (this.advancedAddress) {
        const City = this.advancedAddress.address_components.find(item => item.types.includes('locality')).short_name;
        const State = this.advancedAddress.address_components.find(item => item.types.includes('administrative_area_level_1')).short_name;
        // @ts-ignore
        body.City = City;
        // @ts-ignore
        body.State = State;
      } else if (this.Latitude && this.Longitude) {
        // @ts-ignore
        body.Latitude = this.Latitude;
        // @ts-ignore
        body.Longitude = this.Longitude;
      }
      this.loading = true;
      this.searchService.discoverByCategory(body)
        .subscribe(p => {
          this.searchResult = p;
          this.loading = false;
        });
    } else {
      alert('You need to input location!');
    }
  }

  simpleAddressChange(event) {
    this.simpleAddress = event;
    console.log(event);
  }

  advancedAddressChange(event) {
    this.advancedAddress = event;
    console.log(event);
  }

  changeSubcategory(value) {
    this.subcategory = value.Id;
  }

  private _filter(value: string): Insurance[] {
    const filterValue = value.toLowerCase();
    return this.insuranceOptions.filter(option => option.Name.toLowerCase().indexOf(filterValue) !== -1);
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().indexOf(filterValue) !== -1);
  }

  private _filterSubCategories(value: Specialty): Specialty[] {
    const filterValue = value && value.Name ? value.Name.toLowerCase() : '';
    return this.subCategories.filter(option => option.Name.toLowerCase().indexOf(filterValue) !== -1);
  }

  displayFn(user?: Specialty): string | undefined {
    return user && user.Name ? user.Name : '';
  }

  getMiles(i) {
    return i * 0.000621371192;
  }

  expand(event) {
    console.log(event);
    this.expandedElement = event;
    if (event.Type === 'Physician' || event.SearchType === 'Physician') {
      this.searchService.getProviders(event.SearchId)
        .subscribe(p => {
          this.extraInfo = p;
        });
    } else {
      this.searchService.getHealthSystem(event.SearchId)
        .subscribe(p => {
          this.extraInfo = p;
        });
    }
  }
}
