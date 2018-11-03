import {RouterModule, Routes} from '@angular/router';
import {CrearEquipoComponent} from './views/crear-equipo/crear-equipo.component';
import {InfoEquipoComponent} from './views/info-equipo/info-equipo.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {RegistrarPredio1Component} from './views/registrar-predio1/registrar-predio1.component';
import {LoginComponent} from './login/login.component';
import {FechaCarouselComponent} from './component/fecha-carousel/fecha-carousel.component';
import {MapComponent} from './component/map/map.component';
import {RegistroPredioMapaComponent} from './views/registro-predio-mapa/registro-predio-mapa.component';
import {HomePredioComponent} from './views/home-predio/home-predio.component';
import {HomeJugadorComponent} from './views/home-jugador/home-jugador.component';
import {AuthGuardService} from "../services/auth.guard";
import {OrganizarPartidoComponent} from './views/organizar-partido/organizar-partido.component';
import {UnauthorizedComponent} from "./views/unauthorized/unauthorized.component";
import {RoleGuardService} from "../services/role.guard";
import {PartidoService} from '../services/partidoService';
import {PartidoComponent} from './views/partido/partido.component';
import {NotificacionesComponent} from './views/notificaciones/notificaciones.component';
import {PuntuacionComponent} from './views/puntuacion/puntuacion.component';
import {ReservaIndependienteComponent} from './views/reserva-independiente/reserva-independiente.component';
import {BuscadorJugadoresComponent} from './component/buscadorJugadores/buscador-jugadores.component'
import {PerfilJugadorComponent} from './views/perfil-jugador/perfil-jugador.component';
import {CargaNuevaCanchaComponent} from './views/carga-nueva-cancha/carga-nueva-cancha.component';
import {RegistroPredioStepsComponent} from './views/registro-predio-steps/registro-predio-steps.component';
import {RankingJugadorComponent} from './views/ranking-jugador/ranking-jugador.component';
import {ReservaPredioComponent} from './views/reserva-predio/reserva-predio.component';

const appRoutes: Routes = [
  {
    path: 'equipo',
    children: [
      {path: 'miEquipo', component: InfoEquipoComponent},
      {path: 'crear', component: CrearEquipoComponent},
      {path: 'info/:id', component: InfoEquipoComponent}
    ],
    data:{type: 'Jugador'},
    canActivateChild: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'partido',
    data:{type: 'Jugador'},
    children: [
      {path: '', component: HomeJugadorComponent},
      {path: 'organizar', component: OrganizarPartidoComponent},
      {path: ':id', component: PartidoComponent},
      {path: 'organizar', component: OrganizarPartidoComponent, canActivate:[AuthGuardService, RoleGuardService]}
    ],
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {
    path: 'predio',
    data: { type: 'Predio'},
    children: [
      {path: '', component: HomePredioComponent},
      {path: 'registro', component: RegistroPredioStepsComponent, canActivate: [AuthGuardService, RoleGuardService]},
      {path: 'registro/1', component: RegistrarPredio1Component, canActivate: [AuthGuardService, RoleGuardService]},
      {path: 'registro/2', component: RegistroPredioMapaComponent, canActivate: [AuthGuardService, RoleGuardService]},
      {path: 'nuevaCancha', component: CargaNuevaCanchaComponent, canActivate: [AuthGuardService, RoleGuardService]}
    ],
  },
  {path: 'notificaciones', component: NotificacionesComponent},
  {path: 'puntuaciones', component: PuntuacionComponent},
  {path: 'reservaIndependiente', component: ReservaIndependienteComponent}, // reserva de cancha jugador
  {path: 'reservaCancha', component: ReservaPredioComponent},
  {path: 'jugador/:id', component: PerfilJugadorComponent},
  {path: 'ranking', component: RankingJugadorComponent},

  {path: '**', component: PageNotFoundComponent},
];

export const AppRouting = RouterModule.forRoot(appRoutes);
