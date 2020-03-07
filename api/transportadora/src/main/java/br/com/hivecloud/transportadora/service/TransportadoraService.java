package br.com.hivecloud.transportadora.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.repository.TransportadoraRepository;

@Service
public class TransportadoraService {
	
	@Autowired
	private TransportadoraRepository transportadoraRep;
	
	private Response response;
	
	public ResponseEntity<Response> inserir(Transportadora transportadora) {
		response = new Response();
		
		transportadoraRep.save(transportadora);
		
		return ResponseEntity.ok(response);
	}
	
	public ResponseEntity<Response> findAll(){
		response = new Response();
		try {
			List<Transportadora> listaTransportadora = transportadoraRep.findAll();
			
			if (listaTransportadora.size() <= 0) {
				response.setMensagem("Ainda não existem dados de transportadora!");
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
	

}
