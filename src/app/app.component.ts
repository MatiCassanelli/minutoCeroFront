import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn: boolean;

  constructor(private http: HttpClient, private authService: AuthService){

  }

  ngOnInit() {
    this.comprobar();
  }

  comprobar(){
    this.authService.isLoggedIn().subscribe(res => {
      if(!res){
        this.loggedIn = false;
      }
      else
        this.loggedIn = true;
    })
  }

}
