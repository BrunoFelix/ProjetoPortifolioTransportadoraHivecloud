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
    /*this.getBuscarLocalizacaoTodasTransportadoras();
    this.getBuscarMunicipioTodasTransportadoras();
    this.getBuscarModalTodasTransportadoras();*/
  }

  ngOnInit(): void {
  }

  getBuscarTodasTransportadoras(){
    this.erro = null;
    this.listaTransportadora = [];
    this.listaUF = [];
    this.listaMunicipio = [];
    this.listaModal = [];
    this.tranportadoraService.getBuscarTodos().subscribe(
      (data: Transportadora) => {
        this.listaTransportadora = data['data'];

        for (let transportadora of this.listaTransportadora) {
          if (transportadora.uf != null){
            let itemTag = new ItemTag();
            itemTag.value=transportadora.uf;
            itemTag.tipo="uf";
            itemTag.display=transportadora.uf;
            this.listaUF.push(itemTag);
          }
          if (transportadora.cidade != null){
            let itemTag = new ItemTag();
            itemTag.value=transportadora.cidade;
            itemTag.tipo="cidade";
            itemTag.display=transportadora.cidade;
            this.listaMunicipio.push(itemTag);
          }
          if (transportadora.modal != null){
            let itemTag = new ItemTag();
            itemTag.value=transportadora.modal.id.toString();
            itemTag.tipo="modal";
            itemTag.display=transportadora.modal.descricao;
            this.listaModal.push(itemTag);
          }
        }

      },
      (error: any) => {
        this.erro = error['error']['erros'];
      }
    );
  }

  chamaTelaVisualizar(id: number){
    this.router.navigate(['/transportadora/'+id+'/visualizar']);
  }

  addToListaItemTag(value: string, tipo: string, display: string){
    
    console.log('1', this.listaItemTag);

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
            nomes = nomes + 'nomes='+itemTag.value;
          }
        } else if (itemTag.tipo == 'uf'){
          if (ufs == null){
            ufs = 'ufs='+itemTag.value;
          }else{
            ufs = ufs + 'ufs='+itemTag.value;
          }
        } else if (itemTag.tipo == 'cidade'){
          if (cidades == null){
            cidades = 'cidades='+itemTag.value;
          }else{
            cidades = cidades + 'cidades='+itemTag.value;
          }
        } else if (itemTag.tipo == 'modal'){
          if (modals == null){
            modals = 'modals='+itemTag.value;
          }else{
            modals = modals + 'modals='+itemTag.value;
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
            this.erro = error['error']['erros'];
          }
        );

      }
    } else {
      this.getBuscarTodasTransportadoras();
    }

  }

}
