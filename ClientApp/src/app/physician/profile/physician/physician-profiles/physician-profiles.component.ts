import { Component, OnInit } from '@angular/core';
import { HealthSystemPractitioner } from '../../models/healthSystemPractitioner';
// import { PhysicianService } from 'src/app/physician/physician.service';
import { PhysicianService } from "../../../physician.service";
import { Practitioner } from '../../models/practitioner';
import { uniqBy } from 'lodash';

@Component({
  selector: 'app-physician-profiles',
  templateUrl: './physician-profiles.component.html',
  styleUrls: ['./physician-profiles.component.css']
})
export class PhysicianProfilesComponent implements OnInit {

  doctors: Practitioner[] = [];
  
  constructor(
    private physicianService: PhysicianService
  ) { }

  ngOnInit() {

    this.physicianService.getMyHealthSystemPhysicians()
    .subscribe(p => {
      let physicians = uniqBy(p, 'Id');
      physicians =  physicians.filter(p => p.Users.length > 0)
      .filter(p => p.Users[0].Role === 'Physician' && p.Users[0].PractitionerID !== null);
      
      this.doctors = physicians;
    });
  }

}
