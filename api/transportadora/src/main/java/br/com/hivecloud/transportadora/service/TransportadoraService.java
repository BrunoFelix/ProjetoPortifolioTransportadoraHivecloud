package br.com.hivecloud.transportadora.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;

public interface TransportadoraService {
	
	public ResponseEntity<Response> save(Transportadora transportadora);
	
	public ResponseEntity<Response> update(Transportadora transportadora);
	
	public ResponseEntity<Response> deleteById(Long id);
	
	public ResponseEntity<Response> findAll();
	
	public ResponseEntity<Response> findById(Long id);
	
	public ResponseEntity<Response> findByParameters(List<String> nomes, List<String> ufs, List<String> cidades, List<Long> modals);
	
	public ResponseEntity<Response> findByUnidadesFederativas();
	
}
