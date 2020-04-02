import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { UserService } from '../common/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  name: string;
  loginContextText = '';

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUser()
      .subscribe(result => {
        this.isLoggedIn = true;
        this.name = result.Name;
      }, error => {
          this.isLoggedIn = false;
      });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/home':
          case '/coming-soon':
            this.loginContextText = 'PATIENT';
            break;
          // case '/physicians-claim':
          //   this.loginContextText = 'PHYSICIAN';
          //   break;
          default:
            this.loginContextText = '';
        }
      }
    });
  }
}
