import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {RoleService} from '../../../services/role.service';
import * as socketIo from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {ReservaService} from '../../../services/reservaService';
import * as moment from 'moment';

@Component({
  selector: 'app-home-predio',
  templateUrl: './home-predio.component.html',
  styleUrls: ['./home-predio.component.css']
})
export class HomePredioComponent implements OnInit {

  calendarOptions: Options;
  displayEvent: any;
  data: any = [];
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService,
              private reservaService: ReservaService) {
  }

  ngOnInit() {
    this.authService.logIn('Predio');
    // var socket = socketIo(environment.baseUrl);
    // // console.log('hello'+localStorage.getItem('id'));
    // socket.on('hello'+localStorage.getItem('id'), (data) =>
    //   console.log(data)
    // );
    // let events = []; 2018-10-09T16:00:00"
    this.reservaService.getAllReservas().subscribe(res => {
      for (let reserva of res) {
        let r = {
          id: reserva._id,
          title: reserva.cancha.nombreCancha,
          start: moment(reserva.dia).format('YYYY-MM-DD').toString() + 'T' + moment(reserva.dia).format('HH:mm:ss').toString()
        };
        this.data.push(r);
      }
      this.calendarOptions = {
        editable: true,
        contentHeight: () => {
          console.log(screen.height);
          if (screen.width < 577) {
            return 600;
          } else {
            return 750;
          }
        },
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaDay,listMonth'
        },
        events: this.data
      };
    });


  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    };
    this.displayEvent = model;
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }

}
