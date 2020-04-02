import { Component, OnInit } from '@angular/core';
import { Staff } from './models/staff';
import { Location } from "../models/location";

import { Provider } from "./models/provider";
import { PhysicianService } from "../physician.service";
import { Practitioner, PractitionerLocation } from './models/practitioner';

@Component({
  selector: 'edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./practice/practice-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  name: string;
  practiceName: string;
  specialty: string;

  provider: Practitioner = new Practitioner;
  staff: Staff[] = [];

  constructor(private physicianService: PhysicianService) {

  }

  ngOnInit() {
    this.physicianService.getProvider(6597551)
      .subscribe(p => {
        this.provider = p;
      });
  }

  addLocation() {
    var loc = new PractitionerLocation;
    loc.Location = new Location;
    this.provider.PractitionerLocation.push(loc);
  }

  addStaff() {
    this.staff.push(new Staff);
  }

  save() {
    //this.physicianService.saveProvider(this.provider)
    //  .subscribe(x => x);
  }

}
