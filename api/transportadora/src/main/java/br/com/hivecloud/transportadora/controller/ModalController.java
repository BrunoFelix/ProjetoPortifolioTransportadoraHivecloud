package br.com.hivecloud.transportadora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.service.ModalService;

@RestController
@RequestMapping(value="/modal")
public class ModalController {
	
	@Autowired
	private ModalService modalService;
	
	@GetMapping(value = "/findAll")
	public ResponseEntity<Response> findAll() {
		return modalService.findAll();
	}

}
