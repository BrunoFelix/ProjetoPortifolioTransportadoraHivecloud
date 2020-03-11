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

  /**
   * variáveis
   */
  public listaTransportadora: Array<Transportadora> = [];
  public erro: string;
  public listaItemTag: Array<ItemTag> = [];
  public listaUF: Array<ItemTag> = [];
  public listaMunicipio: Array<ItemTag> = [];
  public listaModal: Array<ItemTag> = [];

  constructor(private tranportadoraService: TransportadoraService, public router: Router) { 
    //buscando todas as transportadoras da API ao acessar a tela
    this.getBuscarTodasTransportadoras();
  }

  ngOnInit(): void {
  }

  /**
   * Metódo que chama o serviço que retorna todos as transportadoras da API
   */
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

        //verificando as informações dos objetos pesquisados para montar uma lista de filtros
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

 /**
   * Metódo responsável por chamar a tela de editar/excluir transportadoras
   */
  chamaTelaVisualizar(id: number){
    this.router.navigate(['/transportadora/'+id+'/visualizar']);
  }

  /**
   * Metódo responsável por adicionar os filtros escolhidos do component tag
   */
  addToListaItemTag(value: string, tipo: string, display: string){
    //verificando se a tag já existe para evitar duplicidade
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

    //buscando as transportadoras de acordo com os filtros escolhidos
    this.getBuscarPorParametros();
  }

  /**
   * Metódo responsável por montar a lista de filtros ao qual o usuário poderá escolher
   */
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

  /**
   * Metódo responsável por remover os filtros escolhidos do component tag
   */
  removeToListaItemTag($event){

    for(var i = 0; i < this.listaItemTag.length; i++)
    { 
      let itemTag = this.listaItemTag[i];
      if (itemTag.value == $event['value'] && itemTag.tipo == $event['tipo'] && itemTag.display == $event['display']){
        this.listaItemTag.splice(i, 1); 
      }
    }

    //buscando as transportadoras de acordo com os filtros escolhidos
    this.getBuscarPorParametros();
  }

  /**
   * Metódo que chama o serviço que retorna as transportadoras da API de acordo com o filtro escolhido
   */
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
