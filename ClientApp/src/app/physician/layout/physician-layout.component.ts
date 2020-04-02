import { Component, OnInit } from '@angular/core';
import { PhysicianService } from '../physician.service';

@Component({
  selector: 'physician-layout',
  templateUrl: './physician-layout.component.html',
  styleUrls: ['./physician-layout.css']
})
export class PhysicianLayoutComponent implements OnInit {
  role: string;

  hasAccess: boolean = false;
  sidebar = {
    referralsCollapsed: false,
    settingsCollapsed: false,
  };

  constructor(private physicianService: PhysicianService) {

  }

  ngOnInit(): void {
    this.physicianService.getMe()
      .subscribe(result => {
        this.hasAccess = this.hasAccess || result.Role.toLowerCase() == "callcenter";
      });

    this.physicianService.getMyHealthSystems()
      .subscribe(result => {
        this.hasAccess = this.hasAccess || (result && !!result.length);
      });
  }

}


