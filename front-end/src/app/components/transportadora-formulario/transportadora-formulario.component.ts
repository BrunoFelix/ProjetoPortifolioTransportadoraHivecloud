import { Component, OnInit } from '@angular/core';
import { Transportadora } from 'src/app/models/transportadora';
import { TransportadoraService } from 'src/app/services/transportadora.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/models/endereco';
import { Modal } from 'src/app/models/modal';
import { ModalService } from 'src/app/services/modal.service';
import { UnidadeFederativa } from 'src/app/models/unidadeFederativa';

@Component({
  selector: 'app-transportadora-formulario',
  templateUrl: './transportadora-formulario.component.html',
  styleUrls: ['./transportadora-formulario.component.css']
})
export class TransportadoraFormularioComponent implements OnInit {

  public transportadora: Transportadora = new Transportadora();
  public listaUnidadeFederativa: Array<UnidadeFederativa> = [];
  public listaModal: Array<Modal> = [];
  private endereco: Endereco = new Endereco();
  private erro: string;
  public acao: string = "Cadastrar";
  public isLoadingResults: boolean = false;
  public isAceitoTermo: boolean = false;

  constructor(private tranportadoraService: TransportadoraService, 
              private modalService: ModalService, 
              public router: Router, 
              public activatedRoute: ActivatedRoute) {
    this.transportadora.modal = new Modal();
    this.getBuscarTodosModal();
    this.getBuscarTodasUnidadesFederativas();
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( parametros => {
      if (parametros['id']) {
        this.isLoadingResults = true;
        this.acao = "Atualizar / Deletar Transportadora";
        this.tranportadoraService.getBuscarPorId(parametros['id']).subscribe(
          (data: Transportadora) => {
              this.transportadora = data['data'];
              this.isLoadingResults = false;
            }, (error: any) => {
              this.erro = error['erro'];
              this.isLoadingResults = false;
            }
          );
      }
    });
  }

  getBuscarTodosModal(){
    this.isLoadingResults = true;
    this.modalService.getBuscarTodos().subscribe(
      (data: Modal) => {
        this.listaModal = data['data'];
        this.isLoadingResults = false;
      },
      (error: any) => {
        this.erro = error['erros'];
        this.isLoadingResults = false;
      }
    );
  }

  getDadosCep(){
    this.isLoadingResults = true;
    this.tranportadoraService.getEnderecoViaCepByCep(this.transportadora.cep).subscribe(
      (data: Endereco) => {
        this.endereco = data;
        this.transportadora.uf = this.endereco.uf;
        this.transportadora.cidade = this.endereco.localidade;
        this.transportadora.bairro = this.endereco.bairro;
        this.transportadora.rua = this.endereco.logradouro;
        this.isLoadingResults = false;
      },
      (error: any) => {
        this.erro = error['erro'];
        this.isLoadingResults = false;
      }
    );
  }

  getBuscarTodasUnidadesFederativas(){
    this.isLoadingResults = true;
    this.tranportadoraService.getBuscarTodasUnidadesFederativas().subscribe(
      (data: UnidadeFederativa) => {
        this.listaUnidadeFederativa = data['data'];
        this.isLoadingResults = false;
      },
      (error: any) => {
        this.erro = error['erros'];
        this.isLoadingResults = false;
      }
    );
  }

  handleFileInput(files: FileList) {
    alert(files.item(0).name);
  }

  postInserir(){
    this.isLoadingResults = true;
    this.tranportadoraService.postInserir(this.transportadora).subscribe(
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

  postAlterar(){
    this.isLoadingResults = true;
    this.tranportadoraService.postAlterar(this.transportadora).subscribe(
      (data: Transportadora) => {
          this.transportadora = data;
          this.isLoadingResults = false;
          this.router.navigate(['/transportadora']);
        }, (error: any) => {
          this.erro = error['erro'];
          this.isLoadingResults = false;
        }
      );
    this.isLoadingResults = false;
  }

  postDeletarPorId(id: number){
    this.isLoadingResults = true;
    this.tranportadoraService.postDeletarPorId(id).subscribe(
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
