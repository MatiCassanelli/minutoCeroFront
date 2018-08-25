import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-predio-mapa',
  templateUrl: './registro-predio-mapa.component.html',
  styleUrls: ['./registro-predio-mapa.component.css']
})
export class RegistroPredioMapaComponent implements OnInit {

  direccion: string;
  constructor() { }

  ngOnInit() {
  }

  getUbicacion(event) {
    console.log('entro', [event.lat(), event.lng()]);
  }

}
