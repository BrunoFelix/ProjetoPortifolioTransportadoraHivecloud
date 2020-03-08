import { Component, OnInit } from '@angular/core';
import { Transportadora } from 'src/app/models/transportadora';
import { TransportadoraService } from 'src/app/services/transportadora.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/models/endereco';
import { Modal } from 'src/app/models/modal';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-transportadora-formulario',
  templateUrl: './transportadora-formulario.component.html',
  styleUrls: ['./transportadora-formulario.component.css']
})
export class TransportadoraFormularioComponent implements OnInit {

  public transportadora: Transportadora = new Transportadora();
  private modal: Modal = new Modal();
  public listaModal: Array<Modal> = [];
  private endereco: Endereco = new Endereco();
  private erro: string;
  public acao: string = "Cadastrar";
  isLoadingResults: boolean = false;

  constructor(private tranportadoraService: TransportadoraService, 
              private modalService: ModalService, 
              public router: Router, 
              public activatedRoute: ActivatedRoute) {
    this.transportadora.modal = this.modal;
    this.getBuscarTodosModal();
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( parametros => {
      if (parametros['id']) {
        this.acao = "Atualizar / Deletar Transportadora";
      }
    });
  }

  getBuscarTodosModal(){
    this.modalService.getBuscarTodos().subscribe(
      (data: Modal) => {
        this.listaModal = data['data'];
      },
      (error: any) => {
        this.erro = error['erros'];
      }
    );
  }

  localizarCep(){
    this.tranportadoraService.getEnderecoViaCepByCep(this.transportadora.cep).subscribe(
      (data: Endereco) => {
        this.endereco = data;
        this.transportadora.uf = this.endereco.uf;
        this.transportadora.cidade = this.endereco.localidade;
        this.transportadora.bairro = this.endereco.bairro;
        this.transportadora.rua = this.endereco.logradouro;
      },
      (error: any) => {
        this.erro = error['erro'];
        console.log('ERROR', error);
      }
    );
  }

  handleFileInput(files: FileList) {
    alert(files.item(0).name);
  }

  postTransportadora(){
    console.log(this.transportadora);
    this.transportadora.modal.id = null;
    this.tranportadoraService.postTransportadora(this.transportadora).subscribe(
      (data: Transportadora) => {
          this.transportadora = data;
          this.isLoadingResults = false;
          this.router.navigate(['/transportadora']);
        }, (error: any) => {
          this.erro = error['erro'];
          this.isLoadingResults = false;
        }
      );
  }
}
