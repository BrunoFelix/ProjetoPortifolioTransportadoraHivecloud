package br.com.hivecloud.transportadora.model.entity;

import java.io.Serializable;

public class Uf implements Serializable {

	private String nome;
	private String sigla;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSigla() {
		return sigla;
	}
	public void setSigla(String sigla) {
		this.sigla = sigla;
	}
}
