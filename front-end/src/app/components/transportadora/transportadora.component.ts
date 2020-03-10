import { Component, OnInit } from '@angular/core';
import { TransportadoraService } from 'src/app/services/transportadora.service';
import { Transportadora } from 'src/app/models/transportadora';
import { Router } from '@angular/router';
import { ItemTag } from 'src/app/models/itemTag';

@Component({
  selector: 'app-transportadora',
  templateUrl: './transportadora.component.html',
  styleUrls: ['./transportadora.component.css']
})
export class TransportadoraComponent implements OnInit {

  public listaTransportadora: Array<Transportadora> = [];
  public erro: string;
  public listaItemTag: Array<ItemTag> = [];
  public listaUF: Array<ItemTag> = [];
  public listaMunicipio: Array<ItemTag> = [];
  public listaModal: Array<ItemTag> = [];

  constructor(private tranportadoraService: TransportadoraService, public router: Router) { 
    this.getBuscarTodasTransportadoras();
  }

  ngOnInit(): void {
  }

  getBuscarTodasTransportadoras(){
    this.erro = null;
    this.listaTransportadora = [];
    this.listaTransportadora.length = 0;
    this.listaUF = [];
    this.listaUF.length = 0;
    this.listaMunicipio = [];
    this.listaMunicipio.length = 0;
    this.listaModal = [];
    this.listaModal.length = 0;
    this.tranportadoraService.getBuscarTodos().subscribe(
      (data: Transportadora) => {
        this.listaTransportadora = data['data'];

        for (let transportadora of this.listaTransportadora) {
          if (transportadora.uf != null){
            this.addToListaParameters(transportadora.uf, 'uf', transportadora.descricaoUf);
          }
          if (transportadora.cidade != null){
            this.addToListaParameters(transportadora.cidade, 'cidade', transportadora.cidade);
          }
          if (transportadora.modal != null){
            this.addToListaParameters(transportadora.modal.id.toString(), 'modal', transportadora.modal.descricao);
          }
        }

      },
      (error: any) => {
        if (error['error']['erros'] == null){
          this.erro = 'Ocorreu um erro ao conectar com o servidor, favor, contate o suporte!';
        }else {
          this.erro = error['error']['erros'];
        }
      }
    );
  }

  chamaTelaVisualizar(id: number){
    this.router.navigate(['/transportadora/'+id+'/visualizar']);
  }

  addToListaItemTag(value: string, tipo: string, display: string){
    let jaExiste:boolean = false;
    for (let itemTag of this.listaItemTag) {
      if (itemTag.value == value && itemTag.tipo == tipo && itemTag.display == display){
        jaExiste = true;
      }
    }
 
    if (!jaExiste){
      let itemTag = new ItemTag();
      itemTag.value = value;
      itemTag.tipo = tipo;
      itemTag.display = display;
      this.listaItemTag.push(itemTag);
    }

    this.getBuscarPorParametros();
  }

  addToListaParameters(value: string, tipo: string, display: string){
    let jaExiste:boolean = false;
    let index: number;

    if (tipo == 'uf'){
      for (let uf of this.listaUF) {
        if (uf.value == value && uf.tipo == tipo && uf.display == display){
          jaExiste = true;
          uf.quantidade = uf.quantidade + 1;
        }
      }
      if (!jaExiste){
        let itemTag = new ItemTag();
        itemTag.value = value;
        itemTag.tipo = tipo;
        itemTag.display = display;
        itemTag.quantidade = 1;
        this.listaUF.push(itemTag);
      }
    } else if (tipo == 'cidade'){
      for (let cidade of this.listaMunicipio) {
        if (cidade.value == value && cidade.tipo == tipo && cidade.display == display){
          jaExiste = true;
          cidade.quantidade = cidade.quantidade + 1;
        }
      }
      if (!jaExiste){
        let itemTag = new ItemTag();
        itemTag.value = value;
        itemTag.tipo = tipo;
        itemTag.display = display;
        itemTag.quantidade = 1;
        this.listaMunicipio.push(itemTag);
      } 
    } else if (tipo == 'modal'){
      for (let modal of this.listaModal) {
        if (modal.value == value && modal.tipo == tipo && modal.display == display){
          jaExiste = true;
          modal.quantidade = modal.quantidade + 1;
        }
      }
      if (!jaExiste){
        let itemTag = new ItemTag();
        itemTag.value = value;
        itemTag.tipo = tipo;
        itemTag.display = display;
        itemTag.quantidade = 1;
        this.listaModal.push(itemTag);
      } 
    }
  }

  removeToListaItemTag($event){

    for(var i = 0; i < this.listaItemTag.length; i++)
    { 
      let itemTag = this.listaItemTag[i];
      if (itemTag.value == $event['value'] && itemTag.tipo == $event['tipo'] && itemTag.display == $event['display']){
        this.listaItemTag.splice(i, 1); 
      }
    }

    /*this.listaItemTag.forEach( (item, index) => {
      alert('a');
    });*/

    //this.listaItemTag = [];

    console.log('2', this.listaItemTag);

    this.getBuscarPorParametros();
  }

  getBuscarPorParametros(){
    let nomes: string;
    let ufs: string;
    let cidades: string;
    let modals: string;

    if (this.listaItemTag.length > 0){
      for (let itemTag of this.listaItemTag) {
        if (itemTag.tipo == 'nome'){
          if (nomes == null){
            nomes = 'nomes='+itemTag.value;
          }else{
            nomes = nomes + '&nomes='+itemTag.value;
          }
        } else if (itemTag.tipo == 'uf'){
          if (ufs == null){
            ufs = 'ufs='+itemTag.value;
          }else{
            ufs = ufs + '&ufs='+itemTag.value;
          }
        } else if (itemTag.tipo == 'cidade'){
          if (cidades == null){
            cidades = 'cidades='+itemTag.value;
          }else{
            cidades = cidades + '&cidades='+itemTag.value;
          }
        } else if (itemTag.tipo == 'modal'){
          if (modals == null){
            modals = 'modals='+itemTag.value;
          }else{
            modals = modals + '&modals='+itemTag.value;
          }
        }

        if (nomes == null){
          nomes = 'nomes='
        }
        if (ufs == null){
          ufs = 'ufs='
        }
        if (cidades == null){
          cidades = 'cidades='
        }
        if (modals == null){
          modals = 'modals='
        }

        this.erro = null;
        this.tranportadoraService.getBuscarPorParametros(nomes, ufs, cidades, modals).subscribe(
          (data: Transportadora) => {
            this.listaTransportadora = data['data'];
          },
          (error: any) => {
            this.listaTransportadora = [];
            this.listaTransportadora.length = 0;
            this.erro = error['error']['erros'];
          }
        );

      }
    } else {
      this.getBuscarTodasTransportadoras();
    }

  }

}
