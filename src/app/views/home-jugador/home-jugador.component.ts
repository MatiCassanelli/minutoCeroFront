import { Component, OnInit } from '@angular/core';
import {Partido} from '../../models/partido';
import {PartidoService} from '../../../services/partidoService';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-home-jugador',
  templateUrl: './home-jugador.component.html',
  styleUrls: ['./home-jugador.component.css'],
  providers: [PartidoService]
})
export class HomeJugadorComponent implements OnInit {

  partidosIncompletos: Partido[];
  constructor(private partidoService: PartidoService,
              private router: Router,
              private authService: AuthService,
              private roleServie: RoleService) {
    this.partidoService.getPartidos('Incompleto').subscribe(incompletos => {
      console.log(incompletos);
      this.partidosIncompletos = incompletos;
    });
  }

  ngOnInit() {
    debugger;
    this.authService.logIn('Jugador');
    // if(!this.roleServie.isAllowed('Jugador'))
    //   this.router.navigateByUrl('/unauthorized');
  }

  onTabChange(event) {
    console.log({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
  }

  crearPartido() {
    this.router.navigateByUrl('/partido/organizar');
  }
}
