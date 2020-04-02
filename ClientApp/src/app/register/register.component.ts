import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { DOCUMENT } from '@angular/common';
import { UserService } from "../core/services/user.service";
import { User } from "../core/model/user";

import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = <User>{};
  roles: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getMe()
      .subscribe(u => this.user = u);

      this.userService.getRoles()
        .subscribe(result => {
          this.roles = result.filter(x => x.Code === "Staff" || x.Code === "Medical Staff").map(x => x.Name);
          this.roles.sort();
        });
  }

  save() {
    this.userService.saveUser(this.user)
      .subscribe(result => {
        var redirectUrl = this.route.snapshot.queryParamMap.get("redirectUrl");
        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
        } else {
          this.router.navigate(['/']);
        }
        
      });
  }
}
