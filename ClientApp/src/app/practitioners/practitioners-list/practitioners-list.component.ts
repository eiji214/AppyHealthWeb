import { Component, OnInit } from '@angular/core';

import { Practitioner } from '../../core/model/practitioner';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/model/user';

@Component({
  selector: 'app-practitioners-list',
  templateUrl: './practitioners-list.component.html',
  styleUrls: ['./practitioners-list.component.scss',
  '../../styles.scss']
})
export class PractitionersListComponent implements OnInit {
  constructor(private userService: UserService) { }

  filteredPractitioners: Practitioner[];
  canView = false;

  ngOnInit() {
    this.filteredPractitioners = [];
  }

  setPractitioners(practitioners: Practitioner[]) {
    this.filteredPractitioners = practitioners;
  }
}
