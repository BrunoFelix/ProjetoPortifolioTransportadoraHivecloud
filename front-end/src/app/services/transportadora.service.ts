import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Transportadora } from '../models/transportadora';

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

  postTransportadora(transportadora : Transportadora){
    return this.httpClient.post<Transportadora>(environment.apiUrl + this.serviceName + '/inserir', transportadora, this.httpOptions);
  }
}
