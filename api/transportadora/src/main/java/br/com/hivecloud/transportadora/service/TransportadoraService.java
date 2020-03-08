package br.com.hivecloud.transportadora.service;

import org.springframework.http.ResponseEntity;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;

public interface TransportadoraService {
	
	public ResponseEntity<Response> inserir(Transportadora transportadora);
	
	public ResponseEntity<Response> findAll();
	
}
