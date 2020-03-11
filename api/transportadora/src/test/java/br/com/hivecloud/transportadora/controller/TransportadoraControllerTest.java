package br.com.hivecloud.transportadora.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.hivecloud.transportadora.controller.TransportadoraController;
import br.com.hivecloud.transportadora.model.entity.Modal;
import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TransportadoraControllerTest {

	@Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private TransportadoraController transportadoraController;
	
	@Test 
	public void testeBuscarTodosTransportadora() {
		ResponseEntity<Response> response = transportadoraController.findAll();
			
		//Verificando se a requisição foi bem sucedida
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(true, response.getBody().getData()!=null);
	}
	
	@Test
	public void testeInserirTransportadora() {
		//Inserindo o dado
    	Transportadora transportadora = new Transportadora();
    	transportadora.setEmail("teste@hotmail.com");
    	transportadora.setNome("Transportadora teste");
    	transportadora.setEmpresa("11111111111111");
    	transportadora.setTelefone("(81) 99999-9999");
    	transportadora.setCelular("(81) 99999-9999");
    	transportadora.setWhatsapp("(81) 99999-9999");
    	Modal modal = new Modal();
    	modal.setId(new Long(1));
    	transportadora.setModal(modal);
    	transportadora.setCep("54470040");
    	transportadora.setUf("PE");
    	transportadora.setCidade("Jaboatão dos guararapes");
    	transportadora.setBairro("Barra de Jangada");
    	transportadora.setRua("Rua Alvorada");
    	transportadora.setNumero("00");
    	entityManager.persist(transportadora);
    	entityManager.flush();
    	
    	ResponseEntity<Response> response= transportadoraController.save(transportadora);

    	assertEquals(201, response.getStatusCode());
	}
}
