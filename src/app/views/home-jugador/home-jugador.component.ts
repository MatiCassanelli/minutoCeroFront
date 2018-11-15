import { Component, OnInit } from '@angular/core';
import {Partido} from '../../models/partido';
import {PartidoService} from '../../../services/partidoService';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {RoleService} from '../../../services/role.service';
import * as socketIo from "socket.io-client";

@Component({
  selector: 'app-home-jugador',
  templateUrl: './home-jugador.component.html',
  styleUrls: ['./home-jugador.component.css'],
  providers: [PartidoService]
})
export class HomeJugadorComponent implements OnInit {

  estado: string;
  partidosIncompletos: Partido[];
  constructor(private partidoService: PartidoService,
              private router: Router,
              private authService: AuthService,
              private roleServie: RoleService) {
  }

  ngOnInit() {
  }

  onTabChange(event) {
    this.estado = event.header;
  }

  crearPartido() {
    this.router.navigateByUrl('/partido/organizar');
  }
}
