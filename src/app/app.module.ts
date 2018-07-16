import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routes imports
import {AppRouting} from './app.routes';

// PrimeNg imports
import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/primeng';

// Components imports
import { AppComponent } from './app.component';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';
import { InfoEquipoComponent } from './info-equipo/info-equipo.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearEquipoComponent,
    InfoEquipoComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
