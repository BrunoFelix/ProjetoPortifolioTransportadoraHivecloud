import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { TransportadoraComponent } from './components/transportadora/transportadora.component';
import { TransportadoraInserirComponent } from './components/transportadora-inserir/transportadora-inserir.component';
import { TransportadoraAlterarComponent } from './components/transportadora-alterar/transportadora-alterar.component';

const routes: Routes = [
    { path: 'transportadora', component: TransportadoraComponent},
    { path: 'transportadora/inserir', component: TransportadoraInserirComponent},
    { path: 'transportadora/:id/alterar', component: TransportadoraAlterarComponent},

    { path: '**', component: Error404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  