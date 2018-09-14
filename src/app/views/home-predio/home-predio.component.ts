import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";
import * as socketIo from "socket.io-client";

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
    this.authService.logIn('Predio');

    var socket = socketIo('http://localhost:3000');
    // console.log('hello'+localStorage.getItem('id'));
    socket.on('hello'+localStorage.getItem('id'), (data) =>
      console.log(data)
    );
  }

}
