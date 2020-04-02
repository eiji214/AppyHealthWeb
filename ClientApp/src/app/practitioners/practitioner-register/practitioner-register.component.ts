import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PractitionersService } from '../practitioners.service';
import { Practitioner } from '../../core/model/practitioner';
import { UserService } from '../../core/services/user.service';
import { Address } from '../../core/model/address';

@Component({
  selector: 'app-practitioner-register',
  templateUrl: './practitioner-register.component.html',
  styleUrls: ['./practitioner-register.component.scss',
  '../../styles.scss']
})
export class PractitionerRegisterComponent implements OnInit {

  constructor(private httpClient: HttpClient, private practitionerService: PractitionersService, private userService: UserService) { }

  npiNumber = '';
  practitioner: Practitioner;
  isSubscribed = false;
  isSearching = false;

  ngOnInit() {
    this.practitioner = <Practitioner>{};
    this.practitioner.Address = <Address>{};
  }

  npiLookup(npi: string) {
    this.isSearching = true;
    this.practitionerService.npiLookup(npi).subscribe(
      data => {
        this.isSearching = false;
        this.practitioner.FirstName = data.basic.first_name,
          this.practitioner.LastName = data.basic.last_name,
          this.practitioner.PrimaryPhoneNumber = data.addresses[0].telephone_number,
          this.practitioner.Gender = data.basic.gender,
          this.practitioner.NPI = this.npiNumber,
          this.practitioner.Specialty = data.taxonomies[0].desc,
          this.practitioner.Address.Line = data.addresses[0].address_1,
          this.practitioner.Address.Line2 = data.addresses[0].address_2,
          this.practitioner.Address.City = data.addresses[0].city,
          this.practitioner.Address.State = data.addresses[0].state,
          this.practitioner.Address.ZipCode = data.addresses[0].postal_code;
      }
    );
  }

  saveNewProvider(practitioner: Practitioner) {
    return this.practitionerService.createPractitioner(practitioner).subscribe(newPractitioner => {
      this.createPractitionerUser(newPractitioner);
    });
  }

    createPractitionerUser(practitioner: Practitioner) {
        return this.userService.createPractitionerUser(practitioner).subscribe(x => {
          this.isSubscribed = true;
          console.log(window.location.href);
        });
    }
}
