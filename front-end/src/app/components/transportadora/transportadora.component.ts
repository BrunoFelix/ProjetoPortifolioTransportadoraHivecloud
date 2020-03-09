import { Component, OnInit } from '@angular/core';
import { TransportadoraService } from 'src/app/services/transportadora.service';
import { Transportadora } from 'src/app/models/transportadora';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transportadora',
  templateUrl: './transportadora.component.html',
  styleUrls: ['./transportadora.component.css']
})
export class TransportadoraComponent implements OnInit {

  public listaTransportadora: Array<Transportadora> = [];
  public erro: string;

  constructor(private tranportadoraService: TransportadoraService, public router: Router) { 
    this.getBuscarTodasTransportadoras();
  }

  ngOnInit(): void {
  }

  getBuscarTodasTransportadoras(){
    this.erro = null;
    this.tranportadoraService.getBuscarTodos().subscribe(
      (data: Transportadora) => {
        this.listaTransportadora = data['data'];
      },
      (error: any) => {
        this.erro = error['error']['erros'];
      }
    );
  }

  chamaTelaVisualizar(id: number){
    this.router.navigate(['/transportadora/'+id+'/visualizar']);
  }

}
