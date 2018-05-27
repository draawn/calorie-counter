import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './../login/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  onLogout() {
    this.loginService.logoutUser().subscribe((res) => {
      this.loginService.isLoggedIn = false;
      this.router.navigate(['']);
    });
  }
}
