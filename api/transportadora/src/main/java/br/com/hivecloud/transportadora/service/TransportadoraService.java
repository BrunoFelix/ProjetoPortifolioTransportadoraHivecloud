package br.com.hivecloud.transportadora.service;

import org.springframework.http.ResponseEntity;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;

public interface TransportadoraService {
	
	public ResponseEntity<Response> save(Transportadora transportadora);
	
	public ResponseEntity<Response> update(Transportadora transportadora);
	
	public ResponseEntity<Response> deleteById(Long id);
	
	public ResponseEntity<Response> findAll();
	
	public ResponseEntity<Response> findById(Long id);
	
}
