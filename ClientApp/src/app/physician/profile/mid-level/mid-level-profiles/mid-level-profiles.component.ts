import { Component, OnInit } from '@angular/core';
import { Practitioner } from '../../models/practitioner';
import { PhysicianService } from 'src/app/physician/physician.service';
import { uniqBy } from 'lodash';

@Component({
  selector: 'app-mid-level-profiles',
  templateUrl: './mid-level-profiles.component.html',
  styleUrls: ['./mid-level-profiles.component.css']
})
export class MidLevelProfilesComponent implements OnInit {

  doctors: Practitioner[] = [];
  
  constructor(
    private physicianService: PhysicianService
  ) { }

  ngOnInit() {

    this.physicianService.getMyHealthSystemPhysicians()
    .subscribe(p => {
      let physicians = uniqBy(p, 'Id');
      physicians =  physicians.filter(p => p.Users.length > 0)
      .filter(p => p.Users[0].Role !== 'Physician' && p.Users[0].PractitionerID !== null);

      this.doctors = physicians;
    });
  }

}
