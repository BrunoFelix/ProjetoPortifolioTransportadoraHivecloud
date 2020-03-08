import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Modal } from '../models/modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  serviceName: string = 'modal';

  constructor(private httpClient: HttpClient, public router: Router) { }

  getBuscarTodos(){
    return this.httpClient.get<Modal>(environment.apiUrl + this.serviceName + '/findAll/');
  }
}
