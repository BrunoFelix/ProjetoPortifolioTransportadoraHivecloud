import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { Error404Component } from './pages/error404/error404.component';
import { ModalService } from './services/modal.service';
import { TransportadoraService } from './services/transportadora.service';
import { TransportadoraComponent } from './components/transportadora/transportadora.component';
import { TransportadoraFormularioComponent } from './components/transportadora-formulario/transportadora-formulario.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    Error404Component,
    TransportadoraComponent,
    TransportadoraFormularioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TransportadoraService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
