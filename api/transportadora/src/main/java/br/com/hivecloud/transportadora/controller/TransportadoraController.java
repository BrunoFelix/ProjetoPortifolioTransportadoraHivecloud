package br.com.hivecloud.transportadora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.service.TransportadoraService;

@RestController
@RequestMapping(value="/transportadora")
public class TransportadoraController {
	
	@Autowired
	private TransportadoraService transportadoraService;
	
	@PostMapping("/inserir")
	public ResponseEntity<Response> inserirTransportadora(@RequestBody Transportadora transportadora) throws Exception {
		return transportadoraService.inserir(transportadora);
	}
	
	@GetMapping(value = "/findAll")
	public ResponseEntity<Response> findAll() {
		return transportadoraService.findAll();
	}

}
