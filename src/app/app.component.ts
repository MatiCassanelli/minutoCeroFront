import { Component } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {

  }

  ngOnInit() {
    const socket = socketIo('http://localhost:3000');
    // console.log('hello'+localStorage.getItem('id'));
    socket.on('Reserva' + localStorage.getItem('id'), (data) =>
      console.log(data)
    );
  }

}
