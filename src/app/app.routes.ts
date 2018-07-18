import { RouterModule, Routes} from '@angular/router';

import { CrearEquipoComponent} from './crear-equipo/crear-equipo.component';
import {InfoEquipoComponent} from './info-equipo/info-equipo.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'equipo',
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'crear', component: CrearEquipoComponent},
      {path: 'info/:id', component: InfoEquipoComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
