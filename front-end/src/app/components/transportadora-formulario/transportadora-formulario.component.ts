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

  /**
   * variáveis
   */
  public transportadora: Transportadora = new Transportadora();
  public listaUnidadeFederativa: Array<UnidadeFederativa> = [];
  public listaModal: Array<Modal> = [];
  public listaErro: Array<string> = [];
  private endereco: Endereco = new Endereco();
  public acao: string = "Cadastrar";
  public isLoadingResults: boolean = false;
  public isAceitoTermo: boolean = false;

  /**
   * variáveis da imagem
   */
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  uploadImageData: any;
  reader = new FileReader();

  constructor(private tranportadoraService: TransportadoraService, 
              private modalService: ModalService, 
              public router: Router, 
              public activatedRoute: ActivatedRoute) {
    this.transportadora.modal = new Modal();
    //buscando todos os registros Modal
    this.getBuscarTodosModal();
    //buscando todos os registros de uf
    this.getBuscarTodasUnidadesFederativas();
   }

  ngOnInit(): void {
    //Se a chamada passa um ID como parametro, logo a tela está sendo chamada em modo alteração
    this.activatedRoute.params.subscribe( parametros => {
      if (parametros['id']) {
        this.isLoadingResults = true;
        //atualizando titulo da página
        this.acao = "Atualizar / Deletar Transportadora";
        this.tranportadoraService.getBuscarPorId(parametros['id']).subscribe(
          (data: Transportadora) => {
              this.transportadora = data['data'];
              this.isLoadingResults = false;
            }, (error: any) => {
              this.listaErro.push(error['error']['erros']);
              this.isLoadingResults = false;
            }
          );
      }
    });
  }

  /**
   * Metódo que chama o serviço que retorna todos os modals da API
   */
  getBuscarTodosModal(){
    this.limparErros();
    this.isLoadingResults = true;
    this.modalService.getBuscarTodos().subscribe(
      (data: Modal) => {
        this.listaModal = data['data'];
        this.isLoadingResults = false;
      },
      (error: any) => {
        this.listaErro.push(error['error']['erros']);
        this.isLoadingResults = false;
      }
    );
  }

  /**
   * Metódo que chama o serviço que retorna consulta o CEP digitado na API ViaCEP
   */
  getDadosCep(){
    this.limparErros();
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
        this.listaErro.push(error['error']['erros']);
        this.isLoadingResults = false;
      }
    );
  }

  /**
   * Metódo que chama o serviço que retorna todas as UF da API
   */
  getBuscarTodasUnidadesFederativas(){
    this.limparErros();
    this.isLoadingResults = true;
    this.tranportadoraService.getBuscarTodasUnidadesFederativas().subscribe(
      (data: UnidadeFederativa) => {
        this.listaUnidadeFederativa = data['data'];
        this.isLoadingResults = false;
      },
      (error: any) => {
        this.listaErro.push(error['error']['erros']);
        this.isLoadingResults = false;
      }
    );
  }

  handleFileInput(files: FileList) {
    alert(files.item(0).name);
  }

  /**
   * Metódo que chama o serviço de inserção da transportadora na API
   */
  postInserir(){
    this.limparErros();
    if (!this.isAceitoTermo){
      this.listaErro.push("É necessário aceitar os termos antes de prosseguir!")
    }else{
      this.isLoadingResults = true;
      this.tranportadoraService.postInserir(this.transportadora).subscribe(
        (data: Transportadora) => {
            this.transportadora = data;
            this.isLoadingResults = false;
            this.router.navigate(['/transportadora']);
          }, (error: any) => {
            for(var i = 0; i < error['error']['erros'].length; i++)
            { 
              this.listaErro.push(error['error']['erros'][i]);
            }
            this.isLoadingResults = false;
          }
        );
    }
  }

  /**
   * Metódo que chama o serviço de alteração da transportadora na API
   */
  postAlterar(){
    this.limparErros();
    this.isLoadingResults = true;
    this.tranportadoraService.postAlterar(this.transportadora).subscribe(
      (data: Transportadora) => {
          this.transportadora = data;
          this.isLoadingResults = false;
          this.router.navigate(['/transportadora']);
        }, (error: any) => {
          this.listaErro.push(error['error']['erros']);
          this.isLoadingResults = false;
        }
      );
    this.isLoadingResults = false;
  }

  /**
   * Metódo que chama o serviço de exclusão da transportadora na API
   */
  postDeletarPorId(id: number){
    this.limparErros();
    this.isLoadingResults = true;
    this.tranportadoraService.postDeletarPorId(id).subscribe(
      (data: Transportadora) => {
        this.transportadora = data;
        this.isLoadingResults = false;
        this.router.navigate(['/transportadora']);
      }, (error: any) => {
        this.listaErro.push(error['error']['erros']);
        this.isLoadingResults = false;
      }
    );
  }

  /**
   * Método que limpa a variável que exibe os erros
   */
  limparErros(){
    this.listaErro = [];
    this.listaErro.length = 0;
  }

  /**
   * Metódo para verificar se o termo foi preenchido
   */
  changeTermo($event){
    this.isAceitoTermo = $event['target']['checked'];
  }

  /**
   * Metódo que carrega a imagem por upload
   */
  onFileChanged($event) {
    this.selectedFile = $event.target.files[0];
    console.log('1', this.selectedFile);

    this.uploadImageData = new FormData();
    this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.reader.readAsDataURL(this.selectedFile);
    this.transportadora.imagem = this.reader.result.toString();
  }

}