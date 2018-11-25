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
import {HorariosPredioComponent} from './views/horarios-predio/horarios-predio.component';
import {ListadoReservasJugadorComponent} from './views/listado-reservas-jugador/listado-reservas-jugador.component';
import {ResumenDeCuentaComponent} from './views/resumen-de-cuenta/resumen-de-cuenta.component';
import {DetalleCuentaMensualComponent} from './views/detalle-cuenta-mensual/detalle-cuenta-mensual.component';
import {ListadoPartidosComponent} from './component/listado-partidos/listado-partidos.component';
import {ListadoPartidosJugadorComponent} from './views/listado-partidos-jugador/listado-partidos-jugador.component';

const appRoutes: Routes = [
  {
    path: 'jugador',
    data: {type: 'Jugador'},
    children: [
      {path: '', component: HomeJugadorComponent},
      {path: 'notificaciones', component: NotificacionesComponent},
      {path: 'reservaIndependiente', component: ReservaIndependienteComponent},
      {path: 'jugador/:id', component: PerfilJugadorComponent},
      {path: 'ranking', component: RankingJugadorComponent},
      {path: 'misReservas', component: ListadoReservasJugadorComponent},
      {path: 'puntuaciones', component: PuntuacionComponent},
      {path: 'misPartidos', component: ListadoPartidosJugadorComponent},
    ],
    canActivate: [AuthGuardService, RoleGuardService],
    canActivateChild: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'partido',
    data: {type: 'Jugador'},
    children: [
      {path: 'organizar', component: OrganizarPartidoComponent},
      {path: ':id', component: PartidoComponent},
    ],
    canActivate: [AuthGuardService, RoleGuardService],
    canActivateChild: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'predio',
    data: {type: 'Predio'},
    children: [
      {path: '', component: HomePredioComponent},
      {path: 'registro', component: RegistroPredioStepsComponent},
      {path: 'horarios', component: HorariosPredioComponent},
      {path: 'nuevaCancha', component: CargaNuevaCanchaComponent},
      {path: 'resumenCuenta', component: ResumenDeCuentaComponent},
      {path: 'detalleMensual/:id', component: DetalleCuentaMensualComponent},
      {path: 'notificaciones', component: NotificacionesComponent},
      {path: 'reservaCancha', component: ReservaPredioComponent},
      {path: 'puntuaciones', component: PuntuacionComponent}
    ],
    canActivate: [AuthGuardService, RoleGuardService],
    canActivateChild: [AuthGuardService, RoleGuardService]
  },
  {
    path: 'equipo',
    children: [
      {path: 'miEquipo', component: InfoEquipoComponent},
      {path: 'crear', component: CrearEquipoComponent},
      {path: 'info/:id', component: InfoEquipoComponent}
    ],
    data: {type: 'Jugador'},
    canActivateChild: [AuthGuardService, RoleGuardService],
    canActivate: [AuthGuardService, RoleGuardService]
  },

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '**', component: PageNotFoundComponent}


];

export const AppRouting = RouterModule.forRoot(appRoutes);
