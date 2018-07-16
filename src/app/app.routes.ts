import { RouterModule, Routes} from '@angular/router';

import { CrearEquipoComponent} from './crear-equipo/crear-equipo.component';
import {InfoEquipoComponent} from './info-equipo/info-equipo.component';

const appRoutes: Routes = [
  {
    path: 'equipo',
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'crear', component: CrearEquipoComponent},
      {path: 'info', component: InfoEquipoComponent}
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
