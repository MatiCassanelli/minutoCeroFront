import { RouterModule, Routes} from '@angular/router';
import {PartidoComponent} from "./partido/partido.component";
import {CrearEquipoComponent} from './crear-equipo/crear-equipo.component';
import {InfoEquipoComponent} from './info-equipo/info-equipo.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegistrarPredioComponent} from './registrar-predio/registrar-predio.component';
import {LoginComponent} from "./login/login.component";

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
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'registro', component: RegistrarPredioComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

export const AppRouting = RouterModule.forRoot(appRoutes);
