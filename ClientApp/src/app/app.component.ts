import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserService } from "./common/user.service";

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private userService: UserService, private router: Router,  @Inject(DOCUMENT) private document: any) {

  }

  ngOnInit(): void {

  }

  checkLogin(url: string) {
    this.router.navigate([url]);

    //this.userService.isLoggedIn()
    //  .subscribe(result => {
    //      this.router.navigate([url]);
    //    },
    //    error => {
    //      this.document.location.href = '/Session/SignIn';
    //    });
  }
}
