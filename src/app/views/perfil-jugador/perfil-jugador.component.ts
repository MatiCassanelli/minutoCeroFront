import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JugadorService} from '../../../services/jugadorService';
import {Jugador} from '../../models/jugador';
import {AmistadService} from '../../../services/amistadService';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.component.html',
  styleUrls: ['./perfil-jugador.component.css']
})
export class PerfilJugadorComponent implements OnInit {

  jugador: Jugador;
  asd;
  mostrar = true;
  constructor(private route: ActivatedRoute,
              private jugadorService: JugadorService,
              private amistadService: AmistadService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.jugadorService.getJugadorById(params['id']).subscribe(res => {
          this.jugador = res[0];
          this.asd = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.jugador.photos.data);
          console.log('asd', this.asd);
        });
        this.amistadService.getAmigos().subscribe(amigos => {
          if (amigos && amigos.find(x => x._id === this.jugador._id)){
            this.mostrar = false;
          } else {
            // deberia consultar por la solicitud ya existente para mostrar "solicitud enviada"
          }
        });
      }
    });
    // this.img = 'http://graph.facebook.com/' + this.jugador.idFacebook + '/picture?type=normal';
  }
  solicitudAmistad() {
    this.amistadService.enviarSolicitud(this.jugador._id).subscribe(res => {
      console.log(res);
    });
  }

}
