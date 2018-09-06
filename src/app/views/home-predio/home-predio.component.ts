import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-home-predio',
  templateUrl: './home-predio.component.html',
  styleUrls: ['./home-predio.component.css']
})
export class HomePredioComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService) { }

  ngOnInit() {
    debugger;
    this.authService.logIn('Predio');
    // if(!this.roleService.isAllowed('Predio'))
    //   this.router.navigateByUrl('/unauthorized');
  }

}
