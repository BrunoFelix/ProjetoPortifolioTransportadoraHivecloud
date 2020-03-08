import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { TransportadoraComponent } from './components/transportadora/transportadora.component';
import { TransportadoraFormularioComponent } from './components/transportadora-formulario/transportadora-formulario.component';

const routes: Routes = [
    { path: 'transportadora', component: TransportadoraComponent},
    { path: 'transportadora/inserir', component: TransportadoraFormularioComponent},
    { path: 'transportadora/:id/visualizar', component: TransportadoraFormularioComponent},

    { path: '**', component: Error404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  