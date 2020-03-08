package br.com.hivecloud.transportadora.model.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cascade;
import javax.persistence.ForeignKey;

@Entity
@Table(name="transportadora")
public class Transportadora {
	
	@Id
	@Column(name="idTransportadora", nullable = false, unique = true)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Size(min = 4)
	@NotNull(message = "Por favor, preencha o campo de E-mail")
	private String email;
	
	@NotNull(message = "Por favor, preencha o campo Nome")
	private String nome;
	
	@NotNull(message = "Por favor, preencha o campo Empresa")
	private String Empresa;
	
	@NotNull(message = "Por favor, preencha o campo Telefone")
	private String telefone;
	
	private String celular;
	
	private String whatsapp;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "idModal")
	private Modal modal;
	
	private String cep;
	
	@NotNull(message = "Por favor, preencha o campo UF")
	private String uf;
	
	@NotNull(message = "Por favor, preencha o campo Cidade")
	private String cidade;
	
	@NotNull(message = "Por favor, preencha o campo Bairro")
	private String bairro;
	
	@NotNull(message = "Por favor, preencha o campo Rua/Avenida")
	private String rua;
	
	@NotNull(message = "Por favor, preencha o campo Número")
	private String numero;
	
	private String caminhoLogo;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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
	
	

}
