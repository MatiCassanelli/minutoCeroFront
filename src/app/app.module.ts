import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// PrimeNg imports
import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Components imports
import { AppComponent } from './app.component';
import { CrearEquipoComponent } from './crear-equipo/crear-equipo.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearEquipoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
