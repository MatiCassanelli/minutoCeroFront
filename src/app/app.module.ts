import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor} from "../services/request.interceptor";
import 'hammerjs';


// Routes imports
import { AppRouting } from './app.routes';


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
import {TabViewModule} from 'primeng/tabview';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { DataViewModule} from 'primeng/dataview';
import {OrderListModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/datascroller';


// Material Design Components
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {
  MatAutocomplete, MatAutocompleteModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule, MatOptionModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatStepperModule, MatTableModule
} from '@angular/material';
import {MatExpansionModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';


// Components imports
import { DragScrollModule } from 'ngx-drag-scroll';
import { AppComponent } from './app.component';
import { CrearEquipoComponent } from './views/crear-equipo/crear-equipo.component';
import {
  DialogEliminarEquipoComponent,
  DialogInvitarJugadorEquipoComponent,
  InfoEquipoComponent
} from './views/info-equipo/info-equipo.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { EstrellasJugadorComponent } from './component/estrellas-jugador/estrellas-jugador.component';
import { InvitarJugadoresComponent } from './component/invitar-jugadores/invitar-jugadores.component';
import { LoginComponent } from './login/login.component';
import { FechaCarouselComponent } from './component/fecha-carousel/fecha-carousel.component';
import { RegistrarPredio1Component } from './views/registrar-predio1/registrar-predio1.component';
import { MapComponent } from './component/map/map.component';
import {ConfirmUbicacionDialogComponent, RegistroPredioMapaComponent} from './views/registro-predio-mapa/registro-predio-mapa.component';
import {HeaderViewComponent} from './component/header-view/header-view.component';
import {HomePredioComponent, ReservaDialogComponent} from './views/home-predio/home-predio.component';


// Swiper-wrapper library
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HomeJugadorComponent } from './views/home-jugador/home-jugador.component';
import {AuthService} from '../services/auth.service';
import {AuthGuardService} from '../services/auth.guard';
import { ComponentComponent } from './component/component.component';
import { ViewsComponent } from './views/views.component';
import { DeporteCanchaPartidoComponent } from './component/deporte-cancha-partido/deporte-cancha-partido.component';
import { PlantelComponent } from './component/plantel/plantel.component';
import { OrganizarPartidoComponent } from './views/organizar-partido/organizar-partido.component';
import { PartidoComponent } from './views/partido/partido.component';
import { ListadoPartidosComponent } from './component/listado-partidos/listado-partidos.component';
import { UnauthorizedComponent } from './views/unauthorized/unauthorized.component';
import { RoleGuardService } from '../services/role.guard';
import {RoleService} from '../services/role.service';
import {MatButtonModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import { MapDialogComponent } from './component/map-dialog/map-dialog.component';
import { ConfirmDialogPlantelComponent } from './component/confirm-dialog-plantel/confirm-dialog-plantel.component';
import { CardNotificacionComponent } from './component/card-notificacion/card-notificacion.component';
import { NotificacionesComponent } from './views/notificaciones/notificaciones.component';
import { CardCalificacionComponent } from './component/card-calificacion/card-calificacion.component';
import { PuntuacionComponent } from './views/puntuacion/puntuacion.component';
import { ReservaIndependienteComponent } from './views/reserva-independiente/reserva-independiente.component';
import {AmazingTimePickerModule, AmazingTimePickerService} from 'amazing-time-picker';
import { BuscadorJugadoresComponent } from './component/buscadorJugadores/buscador-jugadores.component';
import {JugadorService} from '../services/jugadorService';
import {DialogConfirmAmistadComponent, PerfilJugadorComponent} from './views/perfil-jugador/perfil-jugador.component';
import {AmistadService} from '../services/amistadService';
import {EquipoService} from '../services/equipoService';
import { CardSolicitudComponent } from './component/card-solicitud/card-solicitud.component';
import {ROUTER_PROVIDERS} from '@angular/router/src/router_module';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { CargaNuevaCanchaComponent } from './views/carga-nueva-cancha/carga-nueva-cancha.component';
import { NuevaCanchaComponent } from './component/nueva-cancha/nueva-cancha.component';
import {DeporteService} from '../services/deporteService';
import {PredioService} from '../services/predioService';
import { CardResultadoPartidoComponent } from './component/card-resultado-partido/card-resultado-partido.component';
import {
  CardNotificacionResultadoPartidoComponent,
  DialogResultadoComponent
} from './component/card-notificacion-resultado-partido/card-notificacion-resultado-partido.component';
import {PartidoService} from '../services/partidoService';
import { RegistroPredioStepsComponent } from './views/registro-predio-steps/registro-predio-steps.component';
import { FechaHoraComponent } from './component/fecha-hora/fecha-hora.component';
import { ConfiguracionHorasComponent } from './views/configuracion-horas/configuracion-horas.component';
import { RankingJugadorComponent } from './views/ranking-jugador/ranking-jugador.component';
import {ObservableService} from './observable.service';
import { FullCalendarModule } from 'ng-fullcalendar';
import {ReservaService} from '../services/reservaService';
import { ReservaPredioComponent } from './views/reserva-predio/reserva-predio.component';
import { ReservaInfoComponent } from './views/reserva-info/reserva-info.component';
import { CardNotificacionReservaComponent } from './component/card-notificacion-reserva/card-notificacion-reserva.component';
import { HorariosPredioComponent } from './views/horarios-predio/horarios-predio.component';
import { ListadoReservasJugadorComponent } from './views/listado-reservas-jugador/listado-reservas-jugador.component';
import { CalificacionDesdePredioComponent } from './component/calificacion-desde-predio/calificacion-desde-predio.component';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import {PlantelService} from '../services/plantelService';
import { ResumenDeCuentaComponent } from './views/resumen-de-cuenta/resumen-de-cuenta.component';
import { CardResumenMensualComponent } from './component/card-resumen-mensual/card-resumen-mensual.component';
import { DetalleCuentaMensualComponent } from './views/detalle-cuenta-mensual/detalle-cuenta-mensual.component';
import {CdkTableModule} from '@angular/cdk/table';
import {ResumenService} from '../services/resumenService';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);



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
    LoginComponent,
    LoginComponent,
    FechaCarouselComponent,
    RegistrarPredio1Component,
    MapComponent,
    RegistroPredioMapaComponent,
    HomePredioComponent,
    HomeJugadorComponent,
    ComponentComponent,
    ViewsComponent,
    DeporteCanchaPartidoComponent,
    PlantelComponent,
    OrganizarPartidoComponent,
    UnauthorizedComponent,
    OrganizarPartidoComponent,
    PartidoComponent,
    ListadoPartidosComponent,
    HeaderViewComponent,
    MapDialogComponent,
    ConfirmDialogPlantelComponent,
    CardNotificacionComponent,
    NotificacionesComponent,
    CardCalificacionComponent,
    PuntuacionComponent,
    ReservaIndependienteComponent,
    ConfirmUbicacionDialogComponent,
    DialogInvitarJugadorEquipoComponent,
    BuscadorJugadoresComponent,
    PerfilJugadorComponent,
    CardSolicitudComponent,
    CargaNuevaCanchaComponent,
    NuevaCanchaComponent,
    CardResultadoPartidoComponent,
    CardNotificacionResultadoPartidoComponent,
    DialogResultadoComponent,
    RegistroPredioStepsComponent,
    FechaHoraComponent,
    ConfiguracionHorasComponent,
    RankingJugadorComponent,
    DialogConfirmAmistadComponent,
    ReservaPredioComponent,
    ReservaDialogComponent,
    ReservaInfoComponent,
    CardNotificacionReservaComponent,
    DialogEliminarEquipoComponent,
    HorariosPredioComponent,
    ListadoReservasJugadorComponent,
    CalificacionDesdePredioComponent,
    ResumenDeCuentaComponent,
    CardResumenMensualComponent,
    DetalleCuentaMensualComponent,
    ConfirmDialogComponent
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
    DataViewModule,
    AutoCompleteModule,
    CardModule,
    RatingModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    MenuModule,
    OrderListModule,
    DataScrollerModule,
    MenubarModule,
    SidebarModule,
    InputMaskModule,
    CalendarModule,
    GMapModule,
    CarouselModule,
    ScrollPanelModule,
    SelectButtonModule,
    OverlayPanelModule,
    TabViewModule,
    AngularDateTimePickerModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    AmazingTimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FullCalendarModule,
    MatButtonToggleModule,
    MatTableModule,
    CdkTableModule,
    FusionChartsModule
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    AuthService,
    RoleService,
    AuthGuardService,
    RoleGuardService,
    MatDatepickerModule,
    JugadorService,
    AmistadService,
    EquipoService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    EquipoService,
    DeporteService,
    PredioService,
    PartidoService,
    ReservaService,
    ObservableService,
    PlantelService,
    ResumenService
  ],
  entryComponents: [MapComponent, MapDialogComponent,
    ConfirmDialogPlantelComponent, ConfirmUbicacionDialogComponent,
    DialogInvitarJugadorEquipoComponent, NotificacionesComponent, NuevaCanchaComponent,
    DialogResultadoComponent, DialogConfirmAmistadComponent, ReservaDialogComponent,
    DialogEliminarEquipoComponent, ConfirmDialogComponent]
})
export class AppModule { }
