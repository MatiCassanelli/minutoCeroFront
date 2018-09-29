import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JugadorService} from '../../../services/jugadorService';
import {Jugador} from '../../models/jugador';
import {AmistadService} from '../../../services/amistadService';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.component.html',
  styleUrls: ['./perfil-jugador.component.css']
})
export class PerfilJugadorComponent implements OnInit {

  jugador: Jugador;
  constructor(private route: ActivatedRoute,
              private jugadorService: JugadorService,
              private amistadService: AmistadService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.jugadorService.getJugadorById(params['id']).subscribe(res => {
          this.jugador = res[0];
        });
      }
    });
  }
  solicitudAmistad() {
    this.amistadService.enviarSolicitud(this.jugador._id).subscribe(res => {
      console.log(res);
    });
  }

}
