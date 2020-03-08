package br.com.hivecloud.transportadora.service.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.hivecloud.transportadora.model.entity.Modal;
import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.repository.ModalRepository;
import br.com.hivecloud.transportadora.service.ModalService;

@Service
public class ModalServiceImpl implements ModalService {

	@Autowired
	private ModalRepository modalRep;
	
	private Response response;
	
	public ResponseEntity<Response> findAll(){
		response = new Response();
		try {
			List<Modal> listaModal = modalRep.findAll();
			
			if (listaModal.size() <= 0) {
				response.setMensagem("Ainda não existem dados de Modal!");
			}
			
			response.setData(listaModal);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
}
