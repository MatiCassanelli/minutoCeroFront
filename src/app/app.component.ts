import { Component } from '@angular/core';
import * as socketIo from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(){

  }

  ngOnInit() {
    var socket = socketIo('http://localhost:3000');
    console.log('hello'+localStorage.getItem('id'));
    socket.on('hello'+localStorage.getItem('id'), (data) =>
      console.log(data)
    );
  }

}
