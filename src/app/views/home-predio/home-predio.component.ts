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
  hidden = true;
  fileNameDialogRef: MatDialogRef<ReservaDialogComponent>;

  constructor(private authService: AuthService,
              private router: Router,
              private roleService: RoleService,
              private reservaService: ReservaService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.authService.logIn('Predio');
    this.reservaService.getByEstado('Reservada').subscribe(res => {
      this.reservaService.getByEstado('Completada').subscribe(res2 => {
        this.reservas = res.concat(res2);
        for (let reserva of res) {
          let r = {
            id: reserva._id,
            title: reserva.cancha.nombreCancha,
            start: moment(reserva.dia).format('YYYY-MM-DD').toString() + 'T' + moment(reserva.dia).format('HH:mm:ss').toString(),
            end: moment(reserva.dia).format('YYYY-MM-DD').toString() + 'T' + moment(reserva.dia).add(1, 'h').format('HH:mm:ss').toString()
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
            day: 'Agenda',
            list: 'Lista'
          },
          views: {
            basic: {
              titleFormat: 'MMMM YYYY',
            },
            agenda: {
              titleFormat: 'DD MMMM YYYY'
            },
            day: {
              titleFormat: 'DD MMMM YYYY'
            }
          },
          events: this.data
        };

      });
    });
  }

  clickButton(model: any) {
    // debugger;
    const view = this.ucCalendar.fullCalendar('getView');
    if (view.type === 'month' && model.type === 'dayClick') {
      this.ucCalendar.fullCalendar('changeView', 'agendaDay');
      this.ucCalendar.fullCalendar('gotoDate', model.detail.date);
    } else {
      if (model.type === 'dayClick')
      // this.router.navigateByUrl('/reservaCancha');
        this.router.navigate(['/reservaCancha', {fecha: moment.parseZone(model.detail.date.toString()).format()}]);
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
      if(res){
        this.ucCalendar.fullCalendar( 'removeEvents', [reservaId]);
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
