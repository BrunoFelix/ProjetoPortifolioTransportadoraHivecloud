package br.com.hivecloud.transportadora.service;

import org.springframework.http.ResponseEntity;
import br.com.hivecloud.transportadora.model.response.Response;

public interface ModalService {
	
	public ResponseEntity<Response> findAll();
}
