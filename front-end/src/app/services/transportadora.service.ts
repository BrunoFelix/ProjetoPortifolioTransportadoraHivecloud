import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Transportadora } from '../models/transportadora';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
import { UnidadeFederativa } from '../models/unidadeFederativa';

@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {

  serviceName: string = 'transportadora';

  constructor(private httpClient: HttpClient, public router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getEnderecoViaCepByCep(cep : string): Observable<Endereco> {
    return this.httpClient.get<Endereco>(environment.viaCepUrl + cep + '/json');
  }

  getBuscarTodos(){
    return this.httpClient.get<Transportadora>(environment.apiUrl + this.serviceName + '/buscarTodos/');
  }

  getBuscarPorParametros(nomes: string, ufs: string, cidades: string, modals: string){
    return this.httpClient.get<Transportadora>(environment.apiUrl + this.serviceName + '/buscarPorParametros?'+nomes+'&'+ufs+'&'+cidades+'&'+modals);
  }

  getBuscarPorId(id: number){
    return this.httpClient.get<Transportadora>(environment.apiUrl + this.serviceName + '/buscarPorId/' + id);
  }

  getBuscarTodasUnidadesFederativas(){
    return this.httpClient.get<UnidadeFederativa>(environment.apiUrl + this.serviceName + '/buscarTodasUnidadesFederativas/');
  }

  postDeletarPorId(id: number){
    return this.httpClient.post<Transportadora>(environment.apiUrl + this.serviceName + '/excluir', id, this.httpOptions);
  }

  postInserir(transportadora : Transportadora){
    return this.httpClient.post<Transportadora>(environment.apiUrl + this.serviceName + '/inserir', transportadora, this.httpOptions);
  }

  postAlterar(transportadora : Transportadora){
    return this.httpClient.post<Transportadora>(environment.apiUrl + this.serviceName + '/alterar', transportadora, this.httpOptions);
  }
}
