import {Component, OnInit} from '@angular/core';
import {Partido} from '../../models/partido';
import {PartidoService} from '../../../services/partidoService';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {RoleService} from '../../../services/role.service';
import * as socketIo from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {PredioService} from '../../../services/predioService';

@Component({
  selector: 'app-home-jugador',
  templateUrl: './home-jugador.component.html',
  styleUrls: ['./home-jugador.component.css'],
  providers: [PartidoService]
})
export class HomeJugadorComponent implements OnInit {

  estado: string;
  partidosIncompletos: Partido[];
  partidosJugando: Partido[];
  partidosFinalizados: Partido[];

  constructor(private partidoService: PartidoService,
              private router: Router,
              private predioService: PredioService,
              private authService: AuthService,
              private roleServie: RoleService) {
  }

  ngOnInit() {
    this.partidoService.getAll().subscribe(res => {
      this.partidosIncompletos = res.filter(x => x.estado === 'Incompleto' || x.estado === 'CasiCompleto');
      this.partidosJugando = res.filter(x => x.estado === 'Jugando');
      this.partidosFinalizados = res.filter(x => x.estado === 'Finalizado');
    });
    const socket = socketIo(environment.socketUrl);
    socket.on('Jugador', (data) => {
      if (data.Partido.estado === 'Incompleto' || data.Partido.estado === 'CasiCompleto') {
        this.partidosIncompletos.push(data.Partido);
      }
    });
    socket.on('PartidoEliminado', (data) => {
      const eraIncompleto = this.partidosIncompletos.find(x => x._id === data.Partido);
      if (eraIncompleto)
        this.partidosIncompletos.splice(this.partidosIncompletos.indexOf(eraIncompleto), 1);
    });
  }

  onTabChange(event) {
    this.estado = event.header;
  }

  crearPartido() {
    this.router.navigateByUrl('/partido/organizar');
  }
}
