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

const appRoutes: Routes = [
  {
    path: 'equipo',
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'crear', component: CrearEquipoComponent},
      {path: 'info/:id', component: InfoEquipoComponent}
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'partido',
    children: [
      {path: '', component: HomeJugadorComponent},
      {path: 'organizar', component: OrganizarPartidoComponent}
    ],
    canActivate: [AuthGuardService]
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'predio',
    children: [
      {path: '', component: HomePredioComponent},
      {path: 'registro/1', component: RegistrarPredio1Component},
      {path: 'registro/2', component: RegistroPredioMapaComponent}
    ],
    canActivate: [AuthGuardService]
  },
  {path: '**', component: PageNotFoundComponent},
];

export const AppRouting = RouterModule.forRoot(appRoutes);
