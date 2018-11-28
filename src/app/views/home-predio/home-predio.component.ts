import {AfterViewChecked, AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {RoleService} from '../../../services/role.service';
import * as socketIo from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {ReservaService} from '../../../services/reservaService';
import * as moment from 'moment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MapDialogComponent} from '../../component/map-dialog/map-dialog.component';
import {forkJoin} from 'rxjs/observable/forkJoin';

export interface ReservaCalendar {
  color: string;
  text: string;
}

@Component({
  selector: 'app-home-predio',
  templateUrl: './home-predio.component.html',
  styleUrls: ['./home-predio.component.css']
})
export class HomePredioComponent implements OnInit {

  calendarOptions: Options;
  displayEvent: any;
  data: any = [];
  reservas: any[];
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  reservasCalendar: ReservaCalendar[] = [
    {text: 'PreReserva', color: 'lightblue'},
    {text: 'Two', color: 'lightgreen'},
    {text: 'Three', color: 'lightpink'},
    {text: 'Four', color: '#DDBDF1'},
  ];
  fileNameDialogRef: MatDialogRef<ReservaDialogComponent>;

  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService,
              private reservaService: ReservaService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    forkJoin(this.reservaService.getByEstado('PreReserva'),
      this.reservaService.getByEstado('Reservada'),
      this.reservaService.getByEstado('Completada'),
      this.reservaService.getByEstado('Solicitada')).subscribe(res => {

      this.reservas = res[0].concat(res[1]).concat(res[2]).concat(res[3]);
      let color: string;
      for (let reserva of this.reservas) {
        switch (reserva.estado) {
          case 'PreReserva': {
            color = '#B3E5FC';
            this.reservasCalendar[0].color = color;
            this.reservasCalendar[0].text = reserva.estado;
            break;
          }
          case 'Solicitada': {
            color = '#FFD54F';
            this.reservasCalendar[1].color = color;
            this.reservasCalendar[1].text = reserva.estado;
            break;
          }
          case 'Reservada': {
            color = '#C8E6C9';
            this.reservasCalendar[2].color = color;
            this.reservasCalendar[2].text = reserva.estado;
            break;
          }
          case 'Completada': {
            color = '#CFD8DC';
            this.reservasCalendar[3].color = color;
            this.reservasCalendar[3].text = reserva.estado;
            break;
          }

        }
        let r = {
          id: reserva._id,
          title: reserva.cancha.nombreCancha,
          start: moment(reserva.dia).format('YYYY-MM-DD').toString() + 'T' + moment(reserva.dia).format('HH:mm:ss').toString(),
          end: moment(reserva.dia).format('YYYY-MM-DD').toString() + 'T' + moment(reserva.dia).add(1, 'h').format('HH:mm:ss').toString(),
          color: color
        };
        this.data.push(r);
      }
      this.calendarOptions = {
        editable: true,
        contentHeight: () => {
          if (screen.width < 577) {
            return 600;
          } else {
            return 750;
          }
        },
        eventLimit: false,
        header: {
          left: 'prev,next,today',
          center: 'title',
          right: 'month,agendaDay,listMonth'
        },
        scrollTime: moment.duration(moment().add(1, 'h').get('h'), 'hours'),
        dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        buttonText: {
          today: 'Hoy',
          month: 'Mes',
          day: 'Dia',
          list: 'Lista'
        },
        views: {
          basic: {
            titleFormat: 'MMMM YYYY'
          },
          month: {
            fixedWeekCount: false
          },
          agenda: {
            titleFormat: 'DD MMMM YYYY',
            nowIndicator: true,
            allDaySlot: false
          },
          day: {
            titleFormat: 'DD MMMM YYYY',
            nowIndicator: true
          }
        },
        events: this.data
      };

    });
  }

  clickButton(model: any) {
    const view = this.ucCalendar.fullCalendar('getView');
    if (view.type === 'month' && model.type === 'dayClick') {
      this.ucCalendar.fullCalendar('changeView', 'agendaDay');
      this.ucCalendar.fullCalendar('gotoDate', model.detail.date);
    } else {
      if (model.type === 'dayClick')
      // this.router.navigateByUrl('/reservaCancha');
        this.router.navigate(['/predio/reservaCancha', {fecha: moment.parseZone(model.detail.date.toString()).format()}]);
    }

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
    this.openDialog(model.event.id);
  }

  openDialog(reservaId) {
    this.fileNameDialogRef = this.dialog.open(ReservaDialogComponent, {
      maxWidth: null,
      height: '500px',
      maxHeight: '500px',
      data: {
        reservaId: reservaId
      }
    });
    this.fileNameDialogRef.beforeClose().subscribe(res => {
      if (res) {
        this.ucCalendar.fullCalendar('removeEvents', [reservaId]);
        this.data.splice(this.data.indexOf(reservaId), 1);
      }
    });
  }
}


@Component({
  selector: 'app-reserva-dialog',
  // templateUrl: './app-reserva-dialog.component.html',
  template: `
    <app-reserva-info [reservaId]="data.reservaId" (cancelarEmit)="cancelar($event)"></app-reserva-info>`
})
export class ReservaDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ReservaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  cancelar(event) {
    this.dialogRef.close(event);
  }

}
