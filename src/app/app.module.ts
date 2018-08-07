import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';


// Routes imports
import {AppRouting} from './app.routes';

// PrimeNg imports
import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/primeng';
import {CardModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/rating';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


// Components imports
import { AppComponent } from './app.component';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';
import { InfoEquipoComponent } from './info-equipo/info-equipo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EstrellasJugadorComponent } from './estrellas-jugador/estrellas-jugador.component';
import { InvitarJugadoresComponent } from './invitar-jugadores/invitar-jugadores.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearEquipoComponent,
    InfoEquipoComponent,
    PageNotFoundComponent,
    EstrellasJugadorComponent,
    InvitarJugadoresComponent,
    LoginComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // AngularFontAwesomeModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    AutoCompleteModule,
    CardModule,
    RatingModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
