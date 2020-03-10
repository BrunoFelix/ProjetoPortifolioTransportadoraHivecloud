package br.com.hivecloud.transportadora.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="transportadora")
public class Transportadora {
	
	@Id
	@Column(name="idTransportadora", nullable = false, unique = true)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Size(min = 4)
	@NotNull(message = "Por favor, preencha o campo de E-mail")
	@NotBlank(message= "Campo E-mail não pode estar vazio")
	@Email
	private String email;
	
	@NotNull(message = "Por favor, preencha o campo Nome")
	@NotBlank(message= "Campo Nome não pode estar vazio")
	private String nome;
	
	@NotNull(message = "Por favor, preencha o campo Empresa")
	@NotBlank(message= "Campo Empresa não pode estar vazio")
	private String Empresa;
	
	@NotNull(message = "Por favor, preencha o campo Telefone")
	@NotBlank(message= "Campo Telefone não pode estar vazio")
	private String telefone;
	
	private String celular;
	
	private String whatsapp;
	
	@ManyToOne
	@JoinColumn(name = "idModal")
	@NotNull(message="Por favor, preencha o campo Modal")
	private Modal modal;
	
	private String cep;
	
	@NotNull(message = "Por favor, preencha o campo UF")
	@NotBlank(message= "Campo UF não pode estar vazio")
	private String uf;
	
	@Transient
	private String descricaoUf;

	@NotNull(message = "Por favor, preencha o campo Cidade")
	@NotBlank(message= "Campo Cidade não pode estar vazio")
	private String cidade;
	
	@NotNull(message = "Por favor, preencha o campo Bairro")
	@NotBlank(message= "Campo Bairro não pode estar vazio")
	private String bairro;
	
	@NotNull(message = "Por favor, preencha o campo Rua/Avenida")
	@NotBlank(message= "Campo Rua/Avenida não pode estar vazio")
	private String rua;
	
	@NotNull(message = "Por favor, preencha o campo Número")
	@NotBlank(message= "Campo Número não pode estar vazio")
	private String numero;
	
	private String caminhoLogo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmpresa() {
		return Empresa;
	}

	public void setEmpresa(String empresa) {
		Empresa = empresa;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getWhatsapp() {
		return whatsapp;
	}

	public void setWhatsapp(String whatsapp) {
		this.whatsapp = whatsapp;
	}

	public Modal getModal() {
		return modal;
	}

	public void setModal(Modal modal) {
		this.modal = modal;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getCaminhoLogo() {
		return caminhoLogo;
	}

	public void setCaminhoLogo(String caminhoLogo) {
		this.caminhoLogo = caminhoLogo;
	}
	
	public String getDescricaoUf() {
		return descricaoUf;
	}

	public void setDescricaoUf(String descricaoUf) {
		this.descricaoUf = descricaoUf;
	}
}
