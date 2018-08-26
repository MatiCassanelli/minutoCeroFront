import { RouterModule, Routes} from '@angular/router';
import {PartidoComponent} from './partido/partido.component';
import {CrearEquipoComponent} from './crear-equipo/crear-equipo.component';
import {InfoEquipoComponent} from './info-equipo/info-equipo.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegistrarPredio1Component} from './registrar-predio1/registrar-predio1.component';
import {LoginComponent} from './login/login.component';
import {FechaCarouselComponent} from './fecha-carousel/fecha-carousel.component';
import {MapComponent} from './map/map.component';
import {RegistroPredioMapaComponent} from './views/registro-predio-mapa/registro-predio-mapa.component';
import {HomePredioComponent} from './views/home-predio/home-predio.component';

const appRoutes: Routes = [
  {
    path: 'equipo',
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'crear', component: CrearEquipoComponent},
      {path: 'info/:id', component: InfoEquipoComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'partido', component: PartidoComponent },
  {
    path: 'predio',
    children: [
      {path: '', component: HomePredioComponent},
      {path: 'registro/1', component: RegistrarPredio1Component},
      {path: 'registro/2', component: RegistroPredioMapaComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

export const AppRouting = RouterModule.forRoot(appRoutes);
