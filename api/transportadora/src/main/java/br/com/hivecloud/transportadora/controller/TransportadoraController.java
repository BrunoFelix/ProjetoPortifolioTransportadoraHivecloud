package br.com.hivecloud.transportadora.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.service.TransportadoraService;

@RestController
@RequestMapping(value="/transportadora")
public class TransportadoraController {
	
	@Autowired
	private TransportadoraService transportadoraService;
	
	@PostMapping("/inserir")
	public ResponseEntity<Response> save(@RequestBody Transportadora transportadora) {
		return transportadoraService.save(transportadora);
	}
	
	@PostMapping("/alterar")
	public ResponseEntity<Response> update(@RequestBody Transportadora transportadora) {
		return transportadoraService.update(transportadora);
	}
	
	@PostMapping("/excluir")
	public ResponseEntity<Response> deleteById(@RequestBody String id) {
		return transportadoraService.deleteById(Long.valueOf(id));
	}
	
	@GetMapping(value = "/buscarTodos")
	public ResponseEntity<Response> findAll() {
		return transportadoraService.findAll();
	}
	
	@GetMapping(value = "/buscarPorId/{id}")
	public ResponseEntity<Response> findById(@PathVariable("id") String id) {
		return transportadoraService.findById(Long.valueOf(id));
	}
	
	@GetMapping(value = "/buscarPorParametros")
	public ResponseEntity<Response> findByParameters(@RequestParam List<String> nomes, @RequestParam List<String> ufs, @RequestParam List<String> cidades, @RequestParam List<Long> modals) {
		return transportadoraService.findByParameters(nomes, ufs, cidades, modals);
	}
	
	@GetMapping(value = "/buscarTodasUnidadesFederativas")
	public ResponseEntity<Response> findByUnidadesFederativas() {
		return transportadoraService.findByUnidadesFederativas();
	}

}
