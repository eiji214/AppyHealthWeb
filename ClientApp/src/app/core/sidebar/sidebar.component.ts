import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public subPatients = false;
  public user: User;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    this.userService.getMe().subscribe(x => this.user = x);
  }

  stopImpersonating() {
    this.userService.stopImpersonating().subscribe(x => {
      console.log(x);
      window.location.reload(false);
    });
  }

  appyHealthUserActive(){
    return (this.router.isActive('/admin/users',true) || this.router.isActive('/admin/users/adminusers',true)) ? 'selected' : '';
  }
}
