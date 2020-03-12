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

  //definindo o nome do serviço
  serviceName: string = 'transportadora';

  constructor(private httpClient: HttpClient, public router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  /**
   * Metódo responsável por buscar na API do ViaCep o cep
   */
  getEnderecoViaCepByCep(cep : string): Observable<Endereco> {
    return this.httpClient.get<Endereco>(environment.viaCepUrl + cep + '/json');
  }

  /**
   * Metódo responsável por buscar na API todos as transportadoras cadastradas
   */
  getBuscarTodos(){
    return this.httpClient.get<Transportadora>(environment.apiUrl + this.serviceName + '/buscarTodos/');
  }

  /**
   * Metódo responsável por buscar na API as transportadoras cadastradas de acordo com os filtros
   * que podem ser: nomes, ufs, cidades e/ou modals.
   */
  getBuscarPorParametros(nomes: string, ufs: string, cidades: string, modals: string){
    return this.httpClient.get<Transportadora>(environment.apiUrl + this.serviceName + '/buscarPorParametros?'+nomes+'&'+ufs+'&'+cidades+'&'+modals);
  }

  /**
   * Metódo responsável por buscar na API uma transportadora com ID específico.
   */
  getBuscarPorId(id: number){
    return this.httpClient.get<Transportadora>(environment.apiUrl + this.serviceName + '/buscarPorId/' + id);
  }

  /**
   * Metódo responsável por buscar na API todas UF existentes
   */
  getBuscarTodasUnidadesFederativas(){
    return this.httpClient.get<UnidadeFederativa>(environment.apiUrl + this.serviceName + '/buscarTodasUnidadesFederativas/');
  }

  /**
   * Metódo responsável por deletar da API uma transportadora com ID específico.
   */
  postDeletarPorId(id: number){
    return this.httpClient.post<Transportadora>(environment.apiUrl + this.serviceName + '/excluir', id, this.httpOptions);
  }

  /**
   * Metódo responsável inserir da API uma transportadora.
   */
  postInserir(transportadora : Transportadora){
    return this.httpClient.post<Transportadora>(environment.apiUrl + this.serviceName + '/inserir', transportadora, this.httpOptions);
  }

  /**
   * Metódo responsável alterar da API uma transportadora.
   */
  postAlterar(transportadora : Transportadora){
    return this.httpClient.post<Transportadora>(environment.apiUrl + this.serviceName + '/alterar', transportadora, this.httpOptions);
  }
}
