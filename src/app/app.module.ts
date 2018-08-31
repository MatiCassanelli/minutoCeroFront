import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';


// Routes imports
import {AppRouting} from './app.routes';

// PrimeNg imports
import {AccordionModule, MenubarModule} from 'primeng/primeng';
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
import {MenuModule} from 'primeng/menu';
import {SidebarModule} from 'primeng/sidebar';
import {ConfirmationService} from 'primeng/api';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {GMapModule} from 'primeng/gmap';
import {CarouselModule} from 'primeng/carousel';
import {ScrollPanelModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/overlaypanel';



// Components imports
import { DragScrollModule } from 'ngx-drag-scroll';
import { AppComponent } from './app.component';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';
import { InfoEquipoComponent } from './info-equipo/info-equipo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EstrellasJugadorComponent } from './estrellas-jugador/estrellas-jugador.component';
import { InvitarJugadoresComponent } from './invitar-jugadores/invitar-jugadores.component';
import { NavBarComponent} from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { PartidoComponent } from './partido/partido.component';
import { FechaCarouselComponent } from './fecha-carousel/fecha-carousel.component';
import { RegistrarPredio1Component } from './registrar-predio1/registrar-predio1.component';
import { MapComponent } from './map/map.component';
import { RegistroPredioMapaComponent } from './views/registro-predio-mapa/registro-predio-mapa.component';
import {HomePredioComponent} from './views/home-predio/home-predio.component';

// Swiper-wrapper library
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HomeJugadorComponent } from './views/home-jugador/home-jugador.component';
import {AuthService} from "../services/auth.service";
import {AuthGuardService} from "../services/auth.guard";


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    CrearEquipoComponent,
    InfoEquipoComponent,
    PageNotFoundComponent,
    EstrellasJugadorComponent,
    InvitarJugadoresComponent,
    InvitarJugadoresComponent,
    NavBarComponent,
    LoginComponent,
    PartidoComponent,
    LoginComponent,
    FechaCarouselComponent,
    RegistrarPredio1Component,
    MapComponent,
    RegistroPredioMapaComponent,
    HomePredioComponent,
    HomeJugadorComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
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
    ConfirmDialogModule,
    MenuModule,
    MenubarModule,
    SidebarModule,
    InputMaskModule,
    CalendarModule,
    GMapModule,
    CarouselModule,
    ScrollPanelModule,
    SelectButtonModule,
    OverlayPanelModule
  ],
  bootstrap: [AppComponent],
  schemas: [
    CheckboxModule,
    SelectButtonModule,
    DragScrollModule,
    // SlickModule.forRoot(),
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    AuthService,
    AuthGuardService
  ]
})
export class AppModule { }
