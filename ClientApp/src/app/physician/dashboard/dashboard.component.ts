import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from "../../common/user.service";

import { User } from '../../common/models/user';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../layout/physician-layout.css']
})
export class DashboardComponent implements OnInit {
  firstName: string;

  constructor(private router: Router, private modalService: NgbModal, private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe((u: User) => {
        this.firstName = u.Name;
      });
  }

}


