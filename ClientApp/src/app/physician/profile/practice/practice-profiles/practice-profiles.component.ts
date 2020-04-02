import { Component, OnInit } from '@angular/core';
import { PhysicianService } from 'src/app/physician/physician.service';
import { HealthSystem } from 'src/app/physician/models/healthSystem';
import { uniqBy } from 'lodash';

@Component({
  selector: 'app-practice-profiles',
  templateUrl: './practice-profiles.component.html',
  styleUrls: ['./practice-profiles.component.css']
})
export class PracticeProfilesComponent implements OnInit {

  healthSystems: HealthSystem[] = [];
  constructor(
    private physicianService: PhysicianService
  ) { }

  ngOnInit() {
    this.physicianService.getMyHealthSystems()
    .subscribe(p => {
      this.healthSystems = uniqBy(p, 'Id');
    });
  }

}
