import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Modal } from '../models/modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //definindo o nome do serviço
  serviceName: string = 'modal';

  constructor(private httpClient: HttpClient, public router: Router) { }

  /**
   * Metódo responsável por buscar na API todos os modals cadastrados
   */
  getBuscarTodos(){
    return this.httpClient.get<Modal>(environment.apiUrl + this.serviceName + '/buscarTodos/');
  }
}
