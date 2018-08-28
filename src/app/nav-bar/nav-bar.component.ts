import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/components/common/menuitem';
import * as global from 'app/app.global';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})


export class NavBarComponent implements OnInit {

  items: MenuItem[];
  isExpanded = true;
  logoutApi = global.serverURL + '/auth/logout';

  ngOnInit() {
    this.items = [{
      label: 'File',
      items: [
        {label: 'New', icon: 'pi pi-plus', url: 'http://www.primefaces.org/primeng'},
        {label: 'Open', icon: 'fa fa-download', routerLink: ['/pagename']},
        {label: 'Recent Files', icon: 'fa fa-download', routerLink: ['/pagename'], queryParams: {'recent': 'true'}}
      ]
    }];
  }

}
