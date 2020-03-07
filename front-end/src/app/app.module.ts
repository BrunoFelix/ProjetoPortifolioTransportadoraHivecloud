import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Error404Component } from './pages/error404/error404.component';
import { TransportadoraService } from './services/transportadora.service';
import { ModalService } from './services/modal.service';
import { TransportadoraComponent } from './components/transportadora/transportadora.component';
import { TransportadoraAlterarComponent } from './components/transportadora-alterar/transportadora-alterar.component';
import { TransportadoraInserirComponent } from './components/transportadora-inserir/transportadora-inserir.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    TransportadoraComponent,
    TransportadoraInserirComponent,
    TransportadoraAlterarComponent
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
