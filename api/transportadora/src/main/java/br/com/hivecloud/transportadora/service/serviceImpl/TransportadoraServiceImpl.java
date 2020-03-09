package br.com.hivecloud.transportadora.service.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.repository.TransportadoraRepository;
import br.com.hivecloud.transportadora.service.TransportadoraService;

@Service
public class TransportadoraServiceImpl implements TransportadoraService {

	@Autowired
	private TransportadoraRepository transportadoraRep;
	
	private Response response;
	
	public ResponseEntity<Response> save(Transportadora transportadora) {
		try {
			response = new Response();
			
			response.setData(transportadoraRep.saveAndFlush(transportadora));
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	public ResponseEntity<Response> update(Transportadora transportadora) {
		try {
			response = new Response();
			
			ResponseEntity<Response> transportadoraConsulta = findById(transportadora.getId());
			
			if (transportadoraConsulta.getBody().getData() == null) {
				response.getErros().add("Código de transportadora não encontrado!.");
				return ResponseEntity.badRequest().body(response);
			}
			
			response.setData(transportadoraRep.saveAndFlush(transportadora));
			
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	public ResponseEntity<Response> deleteById(Long id) {
		try {
			response = new Response();
			
			ResponseEntity<Response> transportadora = findById(id);
			
			if (transportadora.getBody().getData() == null) {
				response.getErros().add("Código de transportadora não encontrado!.");
				return ResponseEntity.badRequest().body(response);
			}
			
			transportadoraRep.deleteById(id);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	public ResponseEntity<Response> findAll(){
		response = new Response();
		try {
			List<Transportadora> listaTransportadora = transportadoraRep.findAll();
			
			if (listaTransportadora.size() <= 0) {
				List<String> listaErros = new ArrayList<String>();
				listaErros.add("Ainda não existe nenhuma transportadora cadastrada!.");
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}
			
			response.setData(listaTransportadora);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	public ResponseEntity<Response> findById(Long id){
		response = new Response();
		try {
			Optional<Transportadora> transportadora = transportadoraRep.findById(id);
			
			if (transportadora == null || !transportadora.isPresent()) {
				List<String> listaErros = new ArrayList<String>();
				listaErros.add("Código de transportadora não encontrado!.");
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}
			
			response.setData(transportadora);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
}
