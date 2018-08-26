import {Component, OnInit} from '@angular/core';
import {PredioService} from '../../../services/predioService';
import {ConfirmationService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro-predio-mapa',
  templateUrl: './registro-predio-mapa.component.html',
  styleUrls: ['./registro-predio-mapa.component.css'],
  providers: [PredioService, ConfirmationService]
})
export class RegistroPredioMapaComponent implements OnInit {

  direccion: string;
  ubicacion = {
    lat: String,
    lng: String
  };

  constructor(private predioService: PredioService,
              private confirmationService: ConfirmationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  getUbicacion(event) {
    this.ubicacion.lat = event.lat();
    this.ubicacion.lng = event.lng();
    this.confirm1(this.ubicacion);
  }

  confirm1(ubicacion) {
    this.confirmationService.confirm({
      message: 'Definir esta ubicación como dirección del predio?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('entrando...');
        this.setUbicacion(ubicacion);
        this.router.navigateByUrl('/predio');
      },
      reject: () => {
        alert('No aceptado');
      }
    });
  }

  setUbicacion(ubicacion) {
    this.predioService.setUbicacion('5b5e5661b7e1c6236f5c733d', ubicacion).subscribe(res => {
      console.log(res);
    });
  }

}
