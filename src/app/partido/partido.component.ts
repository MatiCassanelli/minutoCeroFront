import { Component, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";
import {PlantelService} from "services/plantelService"
import {Jugador} from "../models/jugador";
import {Plantel} from "../models/plantel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  providers: [PlantelService]
})

export class PartidoComponent implements OnInit {

  tiposCancha: SelectItem[];
  value: Date;
  plantelLocal: Plantel;
  plantelVisitante: Plantel;
  localSeleccionado: Jugador;
  visitanteSeleccionado: Jugador;
  localInvitados: boolean;
  visitanteInvitados: boolean;

  constructor(private plantelService: PlantelService, private router:Router) {
    this.tiposCancha = [
      {label:'Futbol 5', value:'Futbol 5'},
      {label:'Futbol 7', value:'Futbol 7'},
      {label:'Futbol 11', value:'Futbol 11'}
    ]
    this.plantelLocal = new Plantel('5b6e5ed68cbb1b4f61e0b9e4');
    this.plantelVisitante = new Plantel('5b786b8434d41f28d880bffd');
    this.localInvitados = false;
    this.visitanteInvitados = false;
  }

  ngOnInit() {
    this.getJugadoresPlantel(this.plantelLocal, 'local');
    this.getJugadoresPlantel(this.plantelVisitante, 'visitante');
  }

  getJugadoresPlantel(plantel, condicion){
    this.plantelService.getPlantel(plantel.id).subscribe(res => {
      debugger;
      if(res.toString() === 'login'){
        return this.router.navigateByUrl('/login');
      }
      plantel.jugadores = res.jugadores;
      plantel.jugadoresConfirmados = res.jugadoresConfirmados;
      if(condicion === 'local' && res.jugadores.length > 0){
        this.localInvitados = true;
      }
      if(condicion === 'visitante' && res.jugadores.length > 0){
        this.visitanteInvitados = true;
      }

    })
  }

  addJugadorConfirmado(){
    if(this.localSeleccionado){
      return this.plantelService.addJugadorConfirmado(this.plantelLocal.id, this.localSeleccionado._id).subscribe(res => {
        this.plantelLocal.jugadoresConfirmados = res.jugadoresConfirmados;
        this.plantelLocal.jugadores = res.jugadores;
        this.localSeleccionado = null;
      })
    }
    if(this.visitanteSeleccionado){
      return this.plantelService.addJugadorConfirmado(this.plantelVisitante.id, this.visitanteSeleccionado._id).subscribe(res => {
        this.plantelVisitante.jugadoresConfirmados = res.jugadoresConfirmados;
        this.plantelVisitante.jugadores = res.jugadores;
        this.visitanteSeleccionado = null;
      })
    }
  }
}
